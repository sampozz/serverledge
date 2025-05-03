## Basics
In our application the idea is to send two matrices (taken from the csv file) to the application.

1. **Configure the JMeter Test Plan**: open the notebook `WorkloadAndConfigGenerator.ipynb`. This will allow you to generate the desired workload (currently, only a sinusoidal pattern is supported) and, once the workload is generated, configure the following parameters:

   ```python
   # Workload
   It defines the path to the generated workload file

   # Concurrency Values
   TargetLevel = Number of concurrent users. Set this high enough to support the throughput defined in the Throughput Shaping Timer (there is a mathematical formula to compute it but in general we can use this naive approach)
   RampUp = Time (in minutes) to gradually add users until the TargetLevel is reached
   Steps = Number of incremental steps to reach the TargetLevel
   Hold = Duration (in minutes) to maintain the peak user load. This should match the observation time

   # HTTP Request
   HTTPSampler.domain = Domain to send the requests to
   HTTPSampler.port = Port to use (must remain set to 80 for tests to work)
   HTTPSampler.path = Endpoint path
   HTTPSampler.method = HTTP method (e.g., POST, GET, etc...)
   jsonBody = Payload for the POST request

   # CSV File Upload (about the Matrices to send in the requests)
   delimiter = Delimiter used used in the Matrices.csv file
   fileEncoding = Encoding of the CSV file
   filename = Path to the Matrices.csv file
   variableNames = Column headers in the CSV file
   shareMode = Scope of file sharing among threads
   ignoreFirstLine = it specify whether we have to consider the first row of the Matrices.csv file or not (spoiler: we have to do it)
   recycle = Set to true to reuse rows when requests exceed the file length
   stopThread = Set to false to prevent threads from stopping if the file ends
   ```

    **Important Plugins Required**:

     - JMeter Plugin Manager
     - Custom Thread Group Plugin
     - Throughput Shaping Timer Plugin
                  

    Manual Edits: If you modify the configuration manually, preserve proper indentation to avoid test failures.

2. **Launch JMeter and Load the Test Plan**: you can do it using the docker file, but for a better understanding at the beginning it may be useful to visualize it with the GUI

   ```shell
   sh JMeterAppFolder/bin/jmeter.sh
   ```


## Docker Explaination

In order to use the configuration file, put in the directory `scripts` the generated test plan before building the image.

1. Build the docker image (go in the directory `JM` before executing the command):

   ```shell
   docker build -t jmeter:latest .
   ```

2. Apply the manifest files (the docker local image must be accessible by the cluster, with minikube we use the load image command to do so):

   ```shell
   kubectl apply -f jmeter-pvc.yaml
   kubectl apply -f jmeter-configmap.yaml
   kubectl apply -f jmeter-job.yaml
   ```

