import json
import numpy as np
import time
from locust import HttpUser, task, between, events
import gevent
from gevent import sleep
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime

# === Constants ===
HOST = "127.0.0.1"
PORT = 1323
WORKFLOW_NAME = "deepspeech_0"

SCALE = 90

SECONDS     = 2700 # 45 minutes
RPS_POINTS  = int(SECONDS / SCALE)
BASE_RPS    = 0.05 * SCALE
AMPLITUDE   = 0.05 * SCALE
NOISE_STD   = 0.01 * SCALE

# List to store request timestamps
request_timestamps = []

# === Precompute the RPS pattern ===
np.random.seed(42)  # for reproducibility
t = np.linspace(0, 3 * np.pi, RPS_POINTS)
rps_pattern = BASE_RPS + AMPLITUDE * np.sin(t) + np.random.normal(0, NOISE_STD, RPS_POINTS)
rps_pattern[rps_pattern < 0] = 0

# rps_pattern = np.repeat(rps_pattern, SCALE, axis=0)
expanded = np.zeros(len(rps_pattern) * (SCALE))
expanded[::SCALE] = rps_pattern
rps_pattern = expanded


# Save the workload to a CSV file
workload_file = 'workloadProfile.csv'
df = pd.DataFrame({'Time': range(SECONDS), 'RPS': (rps_pattern / SCALE).astype(float)})
df.to_csv(workload_file, index=False, sep=';')

# Plot the RPS over time
plt.figure(figsize=(10, 6))
plt.plot(df['Time'], df['RPS'], label='RPS')
plt.title('RPS Over Time')
plt.xlabel('Time (seconds)')
plt.ylabel('Requests Per Second (RPS)')
plt.legend()
plt.grid(True)
plt.savefig("RPS_Over_Time.png")

# Function to log request with timestamp
def log_request(timestamp, response_time):
    """Log the request timestamp and response time."""
    request_timestamps.append((timestamp, response_time))
    
# Function to save request timestamps to CSV
def save_request_log():
    """Save the request timestamps to a CSV file."""
    timestamps_df = pd.DataFrame(request_timestamps, columns=['Timestamp', 'ResponseTime'])
    timestamps_df.to_csv('request_timestamps.csv', index=False)

# Register event handler to save timestamps when test ends
@events.test_stop.add_listener
def on_test_stop(environment, **kwargs):
    save_request_log()

class SinusoidalUser(HttpUser):
    wait_time = between(0, 0)  # we control timing manually
    host = f"http://{HOST}:{PORT}"

    def on_start(self):
        self.second = 0

    @task
    def post_task(self):
        pass  # We override the run loop

    def run(self):
        self.environment.runner.greenlet.spawn(self.sinusoidal_loop)

    def sinusoidal_loop(self):
        headers = {'Content-Type': 'application/json'}
        body = {
            "params": {"dir": "1234"},
            "CanDoOffloading": False,
            "Async": False
        }

        for second in range(SECONDS):
            current_rps = rps_pattern[second]

            if current_rps == 0:
                sleep(1.0)
                continue

            num_requests = np.random.poisson(current_rps)
            # print(f"Second {second}: Current RPS = {current_rps}, Num Requests = {num_requests}")
            if num_requests == 0:
                sleep(1.0)
                continue

            # Generate exponentially distributed inter-arrival times
            inter_arrival_times = np.random.exponential(1.0 / current_rps, size=num_requests)
            # print(f"Inter-arrival times: {inter_arrival_times}")
            send_times = np.cumsum(inter_arrival_times)
            print(f"Send times: {send_times}")

            # Clip all to 1 second
            send_times = send_times[send_times < 1.0]

            for delay in send_times:
                gevent.spawn_later(
                    delay,
                    self.make_request,
                    headers=headers,
                    body=body
                )

            sleep(1.0)

        # Save the timestamps to CSV at the end
        save_request_log()
        self.environment.runner.quit()
        
    def make_request(self, headers, body):
        # Log the timestamp before making the request
        timestamp = datetime.now().timestamp()
        with self.client.post(
            f"/workflow/invoke/{WORKFLOW_NAME}",
            data=json.dumps(body),
            headers=headers
        ) as response:
            log_request(timestamp, response.elapsed.total_seconds() * 1000)
