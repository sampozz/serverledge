from concurrent.futures import ThreadPoolExecutor, as_completed
from requests import get, post


def printf(*args, **kwargs):
    """Print with flush to ensure immediate output from docker container."""
    print(*args, **kwargs, flush=True)
    

class Serverledge:
    """A class to interact with Serverledge server."""
    
    def __init__(self, docker_client, serverledge_host, serverledge_port, 
                 prometheus_host, prometheus_port):
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
        try:
            response = get(f'{self.prometheus_url}/api/v1/query', params={'query': metric_name}) 
            if response.status_code == 200:
                data = response.json()
                if 'data' not in data or 'result' not in data['data']:
                    printf("Error: No data found for the given function.")
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
