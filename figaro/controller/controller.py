import time
from requests import *
import docker
from concurrent.futures import ThreadPoolExecutor, as_completed

SERVERLEDGE_HOST = 'http://serverledge'
PROMETHEUS_HOST = 'http://prometheus'
AGENT_HOST = 'http://figaro-agent'
SERVERLEDGE_PORT = 1323
AGENT_PORT = 5000
PROMETHEUS_PORT = 9090
PROMETHEUS_METRICS = ['sedge_workload', 'sedge_response_time', 'sedge_service_time']

METRICS_INTERVAL = 5  # Interval in seconds to fetch metrics
AGENT_INTERVAL = 60  # Interval in seconds to send data to the agent


def printf(*args, **kwargs):
    """Print with flush to ensure immediate output from docker container."""
    print(*args, **kwargs, flush=True)


class Serverledge:
    """A class to interact with Serverledge server."""
    
    def __init__(self, docker_client, serverledge_host=SERVERLEDGE_HOST, serverledge_port=SERVERLEDGE_PORT, 
                 prometheus_host=PROMETHEUS_HOST, prometheus_port=PROMETHEUS_PORT):
        self.serverledge_url = f'{serverledge_host}:{serverledge_port}'
        self.prometheus_url = f'{prometheus_host}:{prometheus_port}'
        self.functions = []
        self.last_metrics = {}
        self.docker = docker_client
        
        
    def status(self):
        """Fetches the status of the Serverledge server.
        
        Returns:
            dict or None: A dictionary with the status information or None if an error occurs.
        """
        try:
            response = get(f'{self.serverledge_url}/status')
            if response.status_code == 200:
                return response.json()
            else:
                printf(f"Error while fetching status: Received status code {response.status_code}")
                return None
        except Exception as e:
            printf(f"Exception occurred: {e}")
            return None
        
        
    def prewarm(self, function_name, n_instances=1):
        """Prewarms a specific function by starting the specified number of instances.
        
        Args:
            function_name (str): The name of the function to prewarm.
            n_instances (int): The number of instances to start.
            
        Returns:
            bool: True if prewarming was successful, False otherwise.
        """
        try:
            response = post(
                f'{self.serverledge_url}/prewarm',
                json={"Function": function_name, "Instances": n_instances}
            )
            if response.status_code == 200:
                printf(f"Prewarming {n_instances} containers for function {function_name}")
                return True
            else:
                printf(f"Error: Received status code {response.status_code}")
        except Exception as e:
            printf(f"Exception occurred: {e}")
        return False
    
    
    def scale_down(self, function_name, n_instances=1):
        """Scales down a specific function to the specified number of instances.
        
        Args:
            function_name (str): The name of the function to scale down.
            n_instances (int): The number of instances to scale down to.
            
        Returns:
            bool: True if scaling down was successful, False otherwise.
        """
        try:
            response = post(
                f'{self.serverledge_url}/scaledown',
                json={"Function": function_name, "Instances": n_instances}
            )
            if response.status_code == 200:
                printf(f"Scaling down {function_name} to {n_instances} instances")
                return True
            else:
                printf(f"Error: Received status code {response.status_code}")
        except Exception as e:
            printf(f"Exception occurred: {e}")
        return False
        
        
    def list(self):
        """Fetches the list of functions from the Serverledge server.
        
        Returns:
            list or None: A list of functions or None if an error occurs.
        """
        try:
            response = get(f'{self.serverledge_url}/function')
            if response.status_code == 200:
                self.functions = response.json()
                return self.functions
            else:
                printf(f"Error while fetching function list: Received status code {response.status_code}")
                return None
        except Exception as e:
            printf(f"Exception occurred: {e}")
            return None
        
    
    def query_metric(self, metric_name):
        """Queries a specific metric from Prometheus and updates the last_metrics dictionary.
        
        Args:
            metric_name (str): The name of the metric to query.
        
        Returns:
            dict or None: A dictionary with the metric data or None if an error occurs.
        """
        if metric_name not in PROMETHEUS_METRICS:
            printf(f"Metric '{metric_name}' is not supported.")
            return None
        
        try:
            response = get(f'{self.prometheus_url}/api/v1/query', params={'query': metric_name}) 
            if response.status_code == 200:
                data = response.json()
                if 'data' not in data or 'result' not in data['data']:
                    printf("No data found for the given function.")
                    return None
                
                # Process the results and store them in last_metrics
                for result in data['data']['result']:
                    function = result.get('metric', {}).get('function', 'Unknown')
                    value = result.get('value', [None, None])[1]
                    if function not in self.last_metrics:
                        self.last_metrics[function] = {metric_name: float(value)}
                    else:
                        self.last_metrics[function][metric_name] = float(value)
                return self.last_metrics
            
            else:
                printf(f"Error: Received status code {response.status_code}")
                return None
        except Exception as e:
            printf(f"Exception occurred: {e}")
            return None
        
    
    def get_number_of_instances(self, function_name):
        """Returns the number of running instances of a specific function.
        
        Args:
            function_name (str): The name of the function to check.
            
        Returns:
            int: The number of instances or 0 if no instances are running.
        """
        containers = self.docker.containers.list(filters={"ancestor": function_name})
        return len(containers) if containers else 0
    
    
    def get_docker_stats(self, function_name):
        """Fetches CPU and RAM utilization for a specific function's Docker containers.
        
        Args:
            function_name (str): The name of the function to check.
            
        Returns:
            dict: A dictionary containing CPU and RAM utilization percentages.
        """
        containers = self.docker.containers.list(filters={"ancestor": function_name})
        if not containers:
            return {'cpu': 0, 'ram': 0}
        
        def get_container_stats(container):
            """Helper function to get stats for a single container."""
            try:
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
                
                # Extract memory stats
                memory_usage = stats["memory_stats"]["usage"]
                memory_limit = stats["memory_stats"]["limit"]
                
                if memory_limit > 0:
                    ram_percent = (memory_usage / memory_limit) * 100.0
                else:
                    ram_percent = 0.0
                
                return {'cpu': cpu_percent, 'ram': ram_percent}
                
            except Exception as e:
                printf(f"Error fetching stats for container {container.name}: {e}")
                return {'cpu': 0, 'ram': 0}
        
        cpu_utilization, ram_utilization = 0, 0
        
        # Use ThreadPoolExecutor to fetch stats in parallel
        with ThreadPoolExecutor(max_workers=min(len(containers), 10)) as executor:
            future_to_container = {executor.submit(get_container_stats, container): container 
                                 for container in containers}
            
            for future in as_completed(future_to_container):
                container = future_to_container[future]
                try:
                    result = future.result()
                    cpu_utilization += result['cpu']
                    ram_utilization += result['ram']
                except Exception as e:
                    printf(f"Error processing stats for container {container.name}: {e}")
            
        cpu_res = (cpu_utilization / len(containers)) / 100
        ram_res = (ram_utilization / len(containers)) / 100
        return {'cpu': cpu_res, 'ram': ram_res}


class RLAgent:
    """A class to interact with the FIGARO RL agent."""
    
    def __init__(self, function, agent_host=AGENT_HOST, agent_port=AGENT_PORT):
        self.function = function
        self.agent_url = f'{agent_host}:{agent_port}'
        self.cumulative_data = {}
        self.iteration = 0
        self.avg_response_time = 0.0
        self.n_instances = 1
        
        timestamp = time.strftime("%Y%m%d-%H%M%S")
        # self.log = open(f'logs/log-{function}-{timestamp}.csv', 'w')
        # self.log.write('timestamp,function,workload,pressure,queue_length_dominant,utilization,ram_utilization,response_time,service_time,theoretical_utilization,n_instances\n')
        
        self.avg_log = open(f'logs/avg_log-{function}-{timestamp}.csv', 'w')
        self.avg_log.write('timestamp,function,workload,pressure,queue_length_dominant,utilization,theoretical_utilization,response_time,service_time,n_instances\n')
        
        
    def update_data(self, metrics, docker_stats, n_instances):
        """Updates the agent's cumulative data with the latest metrics and utilization.
        
        Args:
            metrics (dict): A dictionary containing the latest metrics.
            utilization (float): The current CPU utilization.
            n_instances (int): The number of instances currently running.
        """
        self.n_instances = n_instances
        
        response_time = metrics.get('sedge_response_time', 0.0)
        service_time = metrics.get('sedge_service_time', 0.0)
        workload = metrics.get('sedge_workload', 0.0)
        utilization = docker_stats.get('cpu', 0.0)
        ram_utilization = docker_stats.get('ram', 0.0)
        
        self.update_avg_response_time(response_time)
        theoretical_utilization = self.compute_utilization(workload, service_time)
        queue_length = self.compute_queue_length(response_time, service_time)
        pressure = self.compute_pressure(response_time)
        
        # self.log.write(f"{time.time()},{self.function},{workload},{pressure},{queue_length},{utilization},{ram_utilization},{response_time},{service_time},{theoretical_utilization},{self.n_instances}\n")
        # self.log.flush()
        
        self.cumulative_data = {
            'workload': workload + self.cumulative_data.get('workload', 0),
            'pressure': pressure + self.cumulative_data.get('pressure', 0),
            'queue_length_dominant': queue_length + self.cumulative_data.get('queue_length_dominant', 0),
            'utilization': utilization + self.cumulative_data.get('utilization', 0),
            'theoretical_utilization': theoretical_utilization + self.cumulative_data.get('theoretical_utilization', 0),
            'response_time': response_time + self.cumulative_data.get('response_time', 0),
            'service_time': service_time + self.cumulative_data.get('service_time', 0),
        }
        
        self.iteration += 1
        

    def update_avg_response_time(self, response_time):        
        """Computes the average response time based on the current and previous response times.
        
        Args:
            response_time (float): The current response time to include in the average.
        Returns:
            float: The updated average response time.
        """
        self.avg_response_time = (self.avg_response_time * self.iteration + response_time) / (self.iteration + 1) 
        return self.avg_response_time
    
    
    def compute_utilization(self, workload, service_time):
        """Computes the utilization based on workload and service time.
        
        Args:
            workload (float): The workload to compute utilization from.
            service_time (float): The service time to compute utilization from.
            
        Returns:
            float: The computed utilization.
        """
        return workload * service_time / self.n_instances if self.n_instances > 0 else 0
    
    
    def compute_queue_length(self, response_time, service_time):
        """Computes the queue length based on response time and service time.
        
        Args:
            response_time (float): The total response time.
            service_time (float): The service time for the function.
        
        Returns:
            float: The computed queue length.
        """
        return (response_time - service_time) / service_time if service_time > 0 else 0
        
    
    def compute_pressure(self, response_time):
        """Computes the pressure based on the average response time.
        
        Args:
            response_time (float): The current response time to compute pressure from.
        
        Returns:
            float: The computed pressure.
        """
        return response_time / self.avg_response_time if self.avg_response_time > 0 else 0
        
    
    def action(self):
        """Sends an observation to the RL agent and retrieves the action.
        The observation is the average of the cumulative data collected so far.
        The cumulative data is reset after sending the action.
        
        Args:
            data (dict): The observation data to send to the agent.
            
        Returns:
            int: The action to take, which is the number of instances to run.
        """
        if not self.cumulative_data:
            printf("No data available to send to the RL agent.")
            return self.n_instances
        
        if self.iteration == 0:
            printf("No iterations completed yet. Cannot compute average data.")
            return self.n_instances
        
        avg_data = {
            'workload': self.cumulative_data['workload'] / self.iteration,
            'pressure': self.cumulative_data['pressure'] / self.iteration,
            'queue_length_dominant': self.cumulative_data['queue_length_dominant'] / self.iteration,
            'utilization': self.cumulative_data['utilization'] / self.iteration,
            'theoretical_utilization': self.cumulative_data['theoretical_utilization'] / self.iteration,
            'response_time': self.cumulative_data['response_time'] / self.iteration,
            'service_time': self.cumulative_data['service_time'] / self.iteration,
            'n_instances': self.n_instances
        }
        
        self.avg_log.write(f"{time.time()},{self.function},{avg_data['workload']},{avg_data['pressure']},{avg_data['queue_length_dominant']},{avg_data['utilization']},{avg_data['theoretical_utilization']},{avg_data['response_time']},{avg_data['service_time']},{avg_data['n_instances']}\n")
        self.avg_log.flush()
        
        self.cumulative_data = {}
        self.iteration = 0
                
        try:
            response = post(f'{self.agent_url}/action', json={'observation': avg_data})
            if response.status_code == 200:
                action = response.json().get('action')
                if action is not None:
                    self.n_instances = action
                    return action
                else:
                    printf("No action received from the RL agent.")
                    return self.n_instances
            else:
                printf(f"Error from RL agent: Received status code {response.status_code}")
                return self.n_instances
        except Exception as e:
            printf(f"Exception occurred: {e}")
            return self.n_instances

        
if __name__ == "__main__":
    docker_client = docker.DockerClient(base_url='unix://var/run/docker.sock')
    serverledge = Serverledge(docker_client)    
    functions = []
    agents = {}
    
    try:
        iterations = 0
        while True:
            loop_start_time = time.time()
            
            # Discover new functions and update agents
            new_functions = serverledge.list()
            if new_functions:
                for fun in new_functions:
                    if fun not in agents:
                        agents[fun] = RLAgent(fun)
                        printf(f"New function discovered: {fun}") 
                functions = new_functions
            else:
                time.sleep(METRICS_INTERVAL)
                continue
            
            # Query metrics from Prometheus and update agents
            for metric in PROMETHEUS_METRICS:
                serverledge.query_metric(metric)
                
            # Update agents with the latest metrics and Docker stats
            for fun in functions:
                prometheus_metrics = serverledge.last_metrics.get(fun, {})
                docker_stats = serverledge.get_docker_stats(fun)
                n_instances = serverledge.get_number_of_instances(fun)
                
                agents[fun].update_data(prometheus_metrics, docker_stats, n_instances)
                
                if iterations % (AGENT_INTERVAL / METRICS_INTERVAL) == 0:
                    action = agents[fun].action()
                    printf(f"Action for {fun}: {action}")
                
                prewarm_containers = action - n_instances
                if prewarm_containers > 0:
                    serverledge.prewarm(fun, prewarm_containers)
                    printf(f"Updated number of instances for {fun}: {action}")
                elif prewarm_containers < 0:
                    serverledge.scale_down(fun, action)
                    printf(f"Scaled down {fun} to {action} instances")
            
            iterations += 1
            sleep_time = max(0, METRICS_INTERVAL - (time.time() - loop_start_time))
            time.sleep(sleep_time)
            
    except KeyboardInterrupt:
        printf("Stopping the agent...")
    finally:
        for agent in agents.values():
            # agent.log.close()
            agent.avg_log.close()
        printf("Logs saved and agent stopped.")
