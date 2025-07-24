import time
from requests import post
from config import *


def printf(*args, **kwargs):
    """Print with flush to ensure immediate output from docker container."""
    print(*args, **kwargs, flush=True)
    

class RLAgent:
    """A class to interact with the FIGARO RL agent."""
    
    def __init__(self, function, agent_host, agent_port):
        self.function = function
        self.agent_url = f'{agent_host}:{agent_port}'
        self.cumulative_data = {}
        self.cumulative_count = 0
        self.violations = 0
        self.violation_checks = 0
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
        utilization = min(docker_stats.get('cpu', 0.0), 1.0)
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
        
        self.violations += 1 if self.check_violation(response_time) else 0
        self.cumulative_count += 1
        

    def update_avg_response_time(self, response_time):        
        """Computes the average response time based on the current and previous response times.
        
        Args:
            response_time (float): The current response time to include in the average.
        Returns:
            float: The updated average response time.
        """
        self.avg_response_time = (self.avg_response_time * self.cumulative_count + response_time) / (self.cumulative_count + 1) 
        return self.avg_response_time
    
    
    def compute_utilization(self, workload, service_time):
        """Computes the utilization based on workload and service time.
        
        Args:
            workload (float): The workload to compute utilization from.
            service_time (float): The service time to compute utilization from.
            
        Returns:
            float: The computed utilization.
        """
        return min(workload * service_time / self.n_instances if self.n_instances > 0 else 0.0, 1.0)
    
    
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
        return response_time / RESPONSE_TIME_THRESHOLD if RESPONSE_TIME_THRESHOLD > 0 else 0
        
    
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
            printf("Error: No data available to send to the RL agent.")
            return self.n_instances
        
        if self.cumulative_count == 0:
            printf("Error: No iterations completed yet. Cannot compute average data.")
            return self.n_instances
        
        avg_data = {
            'workload': self.cumulative_data['workload'] / self.cumulative_count,
            'pressure': self.cumulative_data['pressure'] / self.cumulative_count,
            'queue_length_dominant': self.cumulative_data['queue_length_dominant'] / self.cumulative_count,
            'utilization': self.cumulative_data['utilization'] / self.cumulative_count,
            'theoretical_utilization': self.cumulative_data['theoretical_utilization'] / self.cumulative_count,
            'response_time': self.cumulative_data['response_time'] / self.cumulative_count,
            'service_time': self.cumulative_data['service_time'] / self.cumulative_count,
            'n_instances': self.n_instances
        }
        
        self.avg_log.write(f"{time.time()},{self.function},{avg_data['workload']},{avg_data['pressure']},{avg_data['queue_length_dominant']},{avg_data['utilization']},{avg_data['theoretical_utilization']},{avg_data['response_time']},{avg_data['service_time']},{avg_data['n_instances']}\n")
        self.avg_log.flush()
        
        self.cumulative_data = {}
        self.cumulative_count = 0
        
        # Normalize the state before sending it to the RL agent
        obs = self.normalize_state(avg_data)
        
        violation_rate = self.violations / self.violation_checks if self.violation_checks > 0 else 0
        if self.violation_checks > VIOLATION_CHECKS_COUNT and \
            violation_rate > VIOLATIONS_THRESHOLD:
            printf(f"High violation rate detected: {self.violations / self.violation_checks:.2%}. Calling learn method.")
            self.violations = 0
            self.violation_checks = 0
            return self.send_learn_request(obs)
        else:
            return self.send_action_request(obs)
                
                
    def send_action_request(self, obs):
        try:
            response = post(f'{self.agent_url}/action', json={'observation': obs})
            if response.status_code == 200:
                action = response.json().get('action')
                if action is not None:
                    self.n_instances = action
                    return action
                else:
                    printf("Error: No action received from the RL agent.")
                    return self.n_instances
            else:
                printf(f"Error from RL agent: Received status code {response.status_code}")
                return self.n_instances
        except Exception as e:
            printf(f"Exception occurred: {e}")
            return self.n_instances


    def normalize_state(self, state):
        """normalize the state

        Args:
            state (dict): the state

        Returns:
            dict: the normalized state
        """

        # for each state element compute value_norm = (original_value - min )/ (max - min)
        # if min = 0; value_norm = original_value / max
        # then it value is rounded to x decimals to have  discrete values value per state feature, x is determined form the define_decimals function
        workload = (state["workload"] - min_workload) / (max_workload - min_workload)
        
        if "n_instances" in state:
            n_instances = (state["n_instances"])/(max_n_instances) # TO CHECK: was state["n_instances"]-1 - why?
        
        if "pressure" in state:
                clipped_pressure = max(min_pressure, min(state["pressure"], pressure_clip_value))
                pressure = (clipped_pressure - min_pressure) / (pressure_clip_value - min_pressure)
                
        if "queue_length_dominant" in state:
                clipped_queue_length_dominant = max(min_queue_length, min(state["queue_length_dominant"], queue_length_dominant_clip_value))
                queue_length_dominant = (clipped_queue_length_dominant - min_queue_length) / (queue_length_dominant_clip_value - min_queue_length)

        normalized_state = {
            "n_instances": n_instances,
            "utilization": state["utilization"],
            "pressure": pressure,
            "queue_length_dominant": queue_length_dominant,
            "workload": workload
        }

        return normalized_state
    
    
    def check_violation(self, response_time):
        """Check if the response time exceeds the threshold.
        
        Args:
            response_time (float): The response time to check.
            
        Returns:
            bool: True if the response time exceeds the threshold, False otherwise.
        """
        threshold = RESPONSE_TIME_THRESHOLD
        self.violation_checks += 1
        return response_time > threshold + 0.1 * threshold
    
    
    def send_learn_request(self, obs):
        pass