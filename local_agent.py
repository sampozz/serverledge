import random
import time
from requests import *
import docker

SERVERLEDGE_HOST = 'http://10.0.0.57'
AGENT_HOST = 'http://127.0.0.1'
SERVERLEDGE_PORT = 1323
AGENT_PORT = 5100
PROMETHEUS_PORT = 9090

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
                    return result['value'][1]
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


def rl_agent_action(function, workload, pressure, queue_length, utilization, n_instances):
    # This function should return the number of instances to scale to
    data = {
       "n_instances": n_instances if n_instances is not None else 0,
       "pressure": pressure if pressure is not None else 0,
       "queue_length_dominant": queue_length if queue_length is not None else 0,
       "utilization": utilization if utilization is not None else 0,
       "workload": workload if workload is not None else 0
    }
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
    

if __name__ == "__main__":
    while True:
        functions = get_functions_list()
        print('Available functions:', functions)
        
        for function in functions:
            workload = get_function_metrics(function, 'sedge_workload')
            pressure = get_function_metrics(function, 'sedge_pressure')
            queue_length = get_function_metrics(function, 'sedge_queue_length')
            utilization = get_cpu_utilization(function)
            n_instances = get_number_of_instances(function)

            if n_instances is None or n_instances == 0:
                continue

            action = rl_agent_action(
                function=function,
                workload=workload,
                pressure=pressure,
                queue_length=queue_length,
                utilization=utilization,
                n_instances=n_instances
            )

            prewarm_containers = action - n_instances
            if prewarm_containers > 0:
                print(f"Prewarming {prewarm_containers} containers for function {function}")
                # Call serverledge API to prewarm the containers
                serverledge_prewarm(function, prewarm_containers)

            # TODO: is the CPU utilization correct?
                # we can use utilization = (number of available warm containers / number of running containers)
            # TODO: fix workload metric on serverledge
            # TODO: fix pressure metric on serverledge
            # TODO: call a different RL agent for each function?
            # TODO: implement function downscale in serverledge


        time.sleep(15)