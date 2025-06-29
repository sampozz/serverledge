<!-- GETTING STARTED -->
## Getting Started

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Prerequisites

Required software and tools to run the project.
- Docker
- Docker Compose

### Installation

Follow these steps to set up the project:

1. Clone the repo
   ```sh
   git clone https://github.com/sampozz/serverledge.git
   ```
2. Run the setup script
   ```sh
   chmod +x setup.sh
   ./setup.sh
   ```

## Usage

After installation, you can interact with serverledge via docker compose.

Some convienent scripts are provided in the `examples/videosearcher` directory to create and manage workflows.

### Example Commands

The following script creates the functions required by videosearcher on serverledge, and a workflow containing these functions:

```sh
./examples/videosearcher/create_videosearcher.sh
```

Then create the input files in the `/mnt/ramdisk` directory:

```sh
# Video file to process
cp examples/video_cut.mp4 /mnt/ramdisk/video.mp4 
# Text file with the string to search in the video
echo "depression" > /mnt/ramdisk/params.txt
```

Finally, run the workflow:

```sh
docker compose exec -it serverledge bin/serverledge-cli invoke-workflow -f videosearcher_0 -p "dir:example"
```

The intermediate results will be stored in the `/mnt/ramdisk/example` directory, and the final result will be returned in the terminal.

## Load Testing with Locust

To perform load testing on the serverledge instance, you can use Locust. Follow these steps:

1. Navigate to the `locust` directory:
   ```sh
   cd figaro/workload_generator/locust
   ```

2. Create and activate a Python virtual environment, then install the required dependencies:
   ```sh
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. Modify `locust_test.py` to set the constants for your test, i.e. serverledge host, port, workflow name, and the sinusoidal workload parameters.

4. Run Locust:
   ```sh
   locust -f locust_test.py --headless -u 1 -r 1 --run-time 45m
   ```

5. Once the test is complete, the logs are reported in `logs` folder. The logs can be analyzed with a Python notebook.

   ```sh
   # Create a directory for the test results
   mkdir -p figaro/workload_generator/locust/results/<test_name>

   # Copy the logs to the results directory
   cp logs/avg_log-<function_name>-<timestamp>.csv figaro/workload_generator/locust/results/<test_name>/
   ```

6. Set the test name in the notebook and run it to analyze the results.
