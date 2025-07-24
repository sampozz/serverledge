# === Constants ===
HOST            = "127.0.0.1"       # Serverledge host
PORT            = 1323              # Serverledge port
WORKFLOW_NAME   = "deepspeech_workflow"    # Name of the workflow to invoke

# === Configuration for the sinusoidal workload ===
SECONDS     = 60 * 60  # Total duration of the test in seconds
SCALE       = 60    # This is the interval in seconds between one burst of requests and the next
                    # Each burst corresponds to an exponential distribution of requests

BASE_RPS    = 0.0 * SCALE  # Base requests per second in the sinusoidal pattern
AMPLITUDE   = 1.0 * SCALE  # Amplitude of the sinusoidal pattern
NOISE_STD   = 0.1 * SCALE  # Standard deviation of the noise added to the sinusoidal pattern

RPS_POINTS  = int(SECONDS / SCALE)

# List to store request timestamps
request_timestamps = []

# === Precompute the RPS pattern ===
np.random.seed(42)  # for reproducibility
t = np.linspace(0, 3 * np.pi, RPS_POINTS)
rps_pattern = BASE_RPS + AMPLITUDE * np.sin(t) * (np.linspace(1,0.65,RPS_POINTS)) + np.random.normal(0, NOISE_STD, RPS_POINTS)
rps_pattern[rps_pattern < 0] = 0

# rps_pattern = np.repeat(rps_pattern, SCALE, axis=0)
expanded = np.zeros(len(rps_pattern) * (SCALE))
expanded[::SCALE] = rps_pattern
rps_pattern = expanded