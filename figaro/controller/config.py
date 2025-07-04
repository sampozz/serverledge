# Configuration for Figaro Controller

SERVERLEDGE_HOST = 'http://serverledge' # Host for Serverledge service,
                                        # Use the service name in Docker Compose
                                        # or the actual IP address if not using Docker                                                            
SERVERLEDGE_PORT = 1323                 # Port for Serverledge service, default is 1323

PROMETHEUS_HOST = 'http://prometheus'   # Host for Prometheus service, ie. where the metrics are exposed,
                                        # Use the service name in Docker Compose
                                        # or the actual IP address if not using Docker
PROMETHEUS_PORT = 9090                  # Port for Prometheus service, default is 9090    
                                        
AGENT_HOST = 'http://figaro-agent'  # Host for Figaro Agent service,
                                    # Use the service name in Docker Compose
                                    # or the actual IP address if not using Docker
AGENT_PORT = 5000                   # Port for Figaro Agent service, default is 5000

# Metrics to query from Prometheus
# These metrics are exposed by the Serverledge service in metrics.go file
PROMETHEUS_METRICS = ['sedge_workload', 'sedge_response_time', 'sedge_service_time']

METRICS_INTERVAL = 5    # Interval in seconds to fetch metrics
AGENT_INTERVAL = 60     # Interval in seconds to send data to the RL agent


# Configuration for RL Agent

RESPONSE_TIME_THRESHOLD = 45.0  # Threshold for response time in seconds
                                # Used to compute the pressure metric
                                # and to determine if a violation occurs    

# Number of times a violation is checked before considering the violation rate                                
VIOLATION_CHECKS_COUNT = 5 * AGENT_INTERVAL // METRICS_INTERVAL  # Set to 5 minutes if AGENT_INTERVAL is 60 seconds and METRICS_INTERVAL is 5 seconds

VIOLATIONS_THRESHOLD = 0.2  # Threshold for violation rate, 
                            # if the violation rate exceeds this value, call the /learn method instead of /action 
                            
# Normalization and clipping values for state variables (deepspeech function)
min_workload = 0
max_workload = 0.3
max_n_instances = 10
min_pressure = 0
pressure_clip_value = 3
min_queue_length = 0
queue_length_dominant_clip_value = 10
