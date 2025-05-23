import json
import numpy as np
from locust import HttpUser, task, between, events
import gevent
from gevent import sleep
import pandas as pd
import matplotlib.pyplot as plt

# === Constants ===
HOST = "10.0.0.57"
PORT = 1323
WORKFLOW_NAME = "ffmpeg"

SECONDS = 1800
BASE_RPS = 0.1
AMPLITUDE = 0.4
NOISE_STD = 0.01

# === Precompute the RPS pattern ===
np.random.seed(42)  # for reproducibility
t = np.linspace(0, 3 * np.pi, SECONDS)
rps_pattern = BASE_RPS + AMPLITUDE * np.sin(t) + np.random.normal(0, NOISE_STD, SECONDS)
rps_pattern[rps_pattern < 0] = 0

# Save the workload to a CSV file
workload_file = 'workloadProfile.csv'
df = pd.DataFrame({'Time': range(SECONDS), 'RPS': rps_pattern.astype(float)})
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
            interval = 1.0 / current_rps if current_rps > 0 else 1.0

            reqs_this_second = int(current_rps)
            fractional = current_rps - reqs_this_second

            # Do integer part
            for _ in range(reqs_this_second):
                gevent.spawn(self.client.post,
                             f"/workflow/invoke/{WORKFLOW_NAME}",
                             data=json.dumps(body),
                             headers=headers)
                sleep(1.0 / current_rps)

            # Maybe one more based on fractional part
            if np.random.rand() < fractional:
                gevent.spawn(self.client.post,
                             f"/workflow/invoke/{WORKFLOW_NAME}",
                             data=json.dumps(body),
                             headers=headers)

            sleep(1)  # wait until next second

        self.environment.runner.quit()
