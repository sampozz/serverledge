# === Constants ===
HOST = "10.0.0.57"
PORT = 1323
WORKFLOW_NAME = "deepspeech_0"

SCALE = 90

SECONDS     = 2700 # 45 minutes
RPS_POINTS  = int(SECONDS / SCALE)
BASE_RPS    = 0.05 * SCALE
AMPLITUDE   = 0.05 * SCALE
NOISE_STD   = 0.01 * SCALE