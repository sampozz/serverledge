import random
import time
from requests import *
import docker

SERVERLEDGE_HOST = 'http://10.0.0.57'
AGENT_HOST = 'http://127.0.0.1'
SERVERLEDGE_PORT = 1323
AGENT_PORT = 5100
PROMETHEUS_PORT = 9090

METRICS_INTERVAL = 5
AGENT_INTERVAL = 60

cum_metrics = {}
avg_metrics = {}
avg_response_times = {}
iterations = {}

def get_serverledge_status():
    try:
        response = get(f'{SERVERLEDGE_HOST}:{SERVERLEDGE_PORT}/status')
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error while fetching status: Received status code {response.status_code}")
            return None
    except Exception as e:
        print(f"Exception occurred: {e}")
        return None
    

def get_functions_list():
    try:
        response = get(f'{SERVERLEDGE_HOST}:{SERVERLEDGE_PORT}/function')
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error while fetching function list: Received status code {response.status_code}")
            return None
    except Exception as e:
        print(f"Exception occurred: {e}")
        return None


def get_function_metrics(function_name, metric_name):
    response = get(f'{SERVERLEDGE_HOST}:{PROMETHEUS_PORT}/api/v1/query', params={'query': metric_name}) 
    if response.status_code == 200:
        data = response.json()
        if 'data' in data and 'result' in data['data']:
            for result in data['data']['result']:
                if function_name in result['metric'].get('function', ''):
                    return float(result['value'][1])
        else:
            print("No data found for the given function.")
            return None
    else:
        print(f"Error: Received status code {response.status_code}")
        return None
    

def get_number_of_instances(function_name):
    client = docker.from_env()
    image_name = f'serverledge-{function_name}'
    containers = client.containers.list(filters={"ancestor": image_name})
    return len(containers) if containers else 0
    

def get_cpu_utilization(function_name):
    client = docker.from_env()
    image_name = f'serverledge-{function_name}'
    containers = client.containers.list(filters={"ancestor": image_name})
    cpu_utilization = 0

    for container in containers:
        stats = container.stats(stream=False)
        
        # Extract CPU stats
        cpu_delta = float(stats["cpu_stats"]["cpu_usage"]["total_usage"]) - \
                    float(stats["precpu_stats"]["cpu_usage"]["total_usage"])
        system_delta = float(stats["cpu_stats"]["system_cpu_usage"]) - \
                       float(stats["precpu_stats"]["system_cpu_usage"])
        
        # Get number of CPU cores
        online_cpus = stats["cpu_stats"].get("online_cpus", len(stats["cpu_stats"]["cpu_usage"].get("percpu_usage", [1])))
        
        # Calculate percentage (0-100)
        if system_delta > 0:
            cpu_percent = (cpu_delta / system_delta) * online_cpus * 100.0
        else:
            cpu_percent = 0.0
            
        cpu_utilization += cpu_percent    
    
    return (cpu_utilization / len(containers) if containers else 0) / 100


def rl_agent_action(function, n_instances):
    # This function should return the number of instances to scale to
    if (iterations.get(function, 1) * METRICS_INTERVAL) % AGENT_INTERVAL != 0:
        # return n_instances  # Skip action if not time for agent to act
        return 1
    
    fract = AGENT_INTERVAL / METRICS_INTERVAL
    data = {
       "n_instances": int(n_instances) if n_instances is not None else 0,
       "pressure": cum_metrics.get(function, {}).get('pressure', 0) / fract,
       "queue_length_dominant": cum_metrics.get(function, {}).get('queue_length', 0) / fract,
       "utilization": cum_metrics.get(function, {}).get('utilization', 0) / fract,
       "workload": cum_metrics.get(function, {}).get('workload', 0) / fract,
    }
    
    if not function in avg_metrics:
        avg_metrics[function] = [data]
    else:
        avg_metrics[function].append(data)
    
    del cum_metrics[function]  # Reset cumulative metrics for the next interval
    return 2
    try:
        response = post(f'{AGENT_HOST}:{AGENT_PORT}/action', json={'observation': data})
        if response.status_code == 200:
            action = response.json().get('action')
            if action is not None:
                return action
            else:
                print("No action received from the RL agent.")
                return n_instances
        else:
            print(f"Error from RL agent: Received status code {response.status_code}")
            return n_instances
    except Exception as e:
        print(f"Exception occurred: {e}")
        return n_instances


def serverledge_prewarm(function_name, n_containers):
    try:
        response = post(
            f'{SERVERLEDGE_HOST}:{SERVERLEDGE_PORT}/prewarm',
            json={"Function": function_name, "Instances": n_containers}
        )
        if response.status_code == 200:
            print(f"Prewarming {n_containers} containers for function {function_name}")
            return True
        else:
            print(f"Error: Received status code {response.status_code}")
    except Exception as e:
        print(f"Exception occurred: {e}")
    return False


def compute_queue_length(response_time, service_time):
    if response_time is None or service_time is None:
        return 0
    return (response_time - service_time) / service_time 


def compute_utilization(workload, service_time, n_instances):
    if workload is None or service_time is None or n_instances is None:
        return 0
    return workload * service_time / n_instances if n_instances > 0 else 0


def save_metrics(log, function, workload, pressure, queue_length, utilization, response_time, service_time, theoretical_utilization, n_instances, action):
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    log.write(f"{timestamp},{function},{workload},{pressure},{queue_length},{utilization},{response_time},{service_time},{theoretical_utilization},{n_instances},{action}\n")
    log.flush()
    

def compute_avg_response_time(function, response_time):
    if response_time is None:
        return None
    
    global avg_response_times
    global iterations

    if function not in avg_response_times:
        avg_response_times[function] = response_time
    else:
        avg_response_times[function] = (avg_response_times[function] * iterations[function] + response_time) / (iterations[function] + 1)
    
    return avg_response_times[function]


def compute_pressure(response_time, avg_response_time):
    if response_time is None or avg_response_time is None:
        return 0
    return response_time / avg_response_time if avg_response_time > 0 else 0


def set_avg_metrics(function, workload, pressure, queue_length, utilization, response_time, service_time, theoretical_utilization):
    global cum_metrics
    if (iterations.get(function, 1) * METRICS_INTERVAL) % AGENT_INTERVAL != 0:
        cum_metrics[function] = {
            'workload': workload if workload else 0 + cum_metrics.get(function, {}).get('workload', 0),
            'pressure': pressure + cum_metrics.get(function, {}).get('pressure', 0),
            'queue_length_dominant': queue_length + cum_metrics.get(function, {}).get('queue_length', 0),
            'utilization': utilization + cum_metrics.get(function, {}).get('utilization', 0),
            'theoretical_utilization': theoretical_utilization + cum_metrics.get(function, {}).get('theoretical_utilization', 0),
        }


def save_avg_metrics(timestamp):
    avg_log = open(f'locust_test/logs/avg-log-{timestamp}.csv', 'w')
    avg_log.write('timestamp,function,workload,pressure,queue_length_dominant,utilization\n')
    for function, metrics in avg_metrics.items():
        for metric in metrics:
            avg_log.write(f"{timestamp},{function},{metric['workload']},{metric['pressure']},{metric['queue_length_dominant']},{metric['utilization']}\n")
    avg_log.close()
    

if __name__ == "__main__":
    timestamp = time.strftime("%Y%m%d-%H%M%S")
    log = open(f'locust_test/logs/log-{timestamp}.csv', 'w')
    log.write('timestamp,function,workload,pressure,queue_length,utilization,response_time,service_time,theoretical_utilization,n_instances,action\n')

    try:
        while True:
            functions = get_functions_list()
            # print('Available functions:', functions)
            
            for function in functions:
                iterations[function] = iterations.get(function, 0) + 1
                
                workload = get_function_metrics(function, 'sedge_workload')
                utilization = get_cpu_utilization(function)
                response_time = get_function_metrics(function, 'sedge_response_time')
                service_time = get_function_metrics(function, 'sedge_service_time')
                n_instances = get_number_of_instances(function)
                
                avg_response_time = compute_avg_response_time(function, response_time)
                queue_length = compute_queue_length(response_time, service_time)
                pressure = compute_pressure(response_time, avg_response_time)
                theoretical_utilization = compute_utilization(workload, service_time, n_instances)
                
                set_avg_metrics(function, workload, pressure, queue_length, utilization, response_time, service_time, theoretical_utilization)

                action = rl_agent_action(function=function, n_instances=n_instances)

                save_metrics(log, function, workload, pressure, queue_length, utilization, response_time, service_time, theoretical_utilization, n_instances, action)

                # print(f"[{function}] Action from RL agent: {action}")

                prewarm_containers = action - n_instances
                if prewarm_containers > 0:
                    print(f"[{function}] Prewarming {prewarm_containers} containers for function {function}")
                    # Call serverledge API to prewarm the containers
                    serverledge_prewarm(function, prewarm_containers)

                # TODO: implement function downscale in serverledge

            time.sleep(METRICS_INTERVAL)
        
    except KeyboardInterrupt:
        print("Exiting...")
    finally:
        save_avg_metrics(timestamp)
        log.close()
        print("Metrics file closed.")