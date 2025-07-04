import time
from requests import *
from serverledge import Serverledge
from rlagent import RLAgent
import docker
from datetime import datetime
from config import *


def printf(*args, **kwargs):
    """Print with flush and timestamp to ensure immediate output from docker container."""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(f"[{timestamp}]", *args, **kwargs, flush=True)


if __name__ == "__main__":
    # Initialize Docker client and Serverledge instance
    # Use the Docker socket to connect to the Docker daemon
    # This is necessary to manage containers on the host machine from a Docker container
    docker_client = docker.DockerClient(base_url='unix://var/run/docker.sock')
    serverledge = Serverledge(docker_client, SERVERLEDGE_HOST, SERVERLEDGE_PORT,
                               PROMETHEUS_HOST, PROMETHEUS_PORT)    
    
    # List of serverledge functions
    functions = []
    
    # Dictionary to hold RL agents for each function
    # Key: function name, Value: RLAgent instance
    agents = {}
    
    try:
        iterations = 0
        while True:
            loop_start_time = time.time()
            
            # Discover new functions and update agents
            # TODO: each agent should be deployed in a separate container
            #       so the agent host and port should be different for each agent
            new_functions = serverledge.list()
            if new_functions:
                for fun in new_functions:
                    if fun not in agents:
                        agents[fun] = RLAgent(fun, AGENT_HOST, AGENT_PORT)
                        printf(f"New function discovered: {fun}") 
                functions = new_functions
            else:
                # Controller might not be able to connect to Serverledge, wait before retrying
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
                
                # Update agent with the latest metrics and Docker stats
                agents[fun].update_data(prometheus_metrics, docker_stats, n_instances)
                
                # Call action method of the agent once every AGENT_INTERVAL
                if iterations % (AGENT_INTERVAL // METRICS_INTERVAL) == 0:
                    action = agents[fun].action()
                    printf(f"Action for {fun}: {action}")
                
                # Prewarm or scale down containers based on agent's action
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
