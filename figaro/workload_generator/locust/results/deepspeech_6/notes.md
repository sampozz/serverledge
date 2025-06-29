2 instances of deepspeech function were used

# === Constants ===
HOST            = "127.0.0.1"       # Serverledge host
PORT            = 1323              # Serverledge port
WORKFLOW_NAME   = "deepspeech_0"    # Name of the workflow to invoke

# === Configuration for the sinusoidal workload ===
SECONDS     = 2700  # Total duration of the test in seconds
SCALE       = 90    # This is the interval in seconds between one burst of requests and the next
                    # Each burst corresponds to an exponential distribution of requests

BASE_RPS    = 0.05 * SCALE  # Base requests per second in the sinusoidal pattern
AMPLITUDE   = 0.05 * SCALE  # Amplitude of the sinusoidal pattern
NOISE_STD   = 0.01 * SCALE  # Standard deviation of the noise added to the sinusoidal pattern