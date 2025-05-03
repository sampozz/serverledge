import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import xml.etree.ElementTree as ET
from jmeterConfig import *
import json
import time

seconds = 180
baseRPS = 50
amplitude = 35
noiseSTD = 7

# Generate time vector
t = np.linspace(0, 2 * np.pi, seconds)

# Sinusoidal pattern + noise
rps = baseRPS + amplitude * np.sin(t - 15) + np.random.normal(0, noiseSTD, seconds)

# Clean it up (no negative RPS)
rps = np.clip(rps, 1, None)

df = pd.DataFrame({'Time': range(seconds), 'RPS': rps.astype(int)})
df.to_csv("workloadProfile.csv", index = False, sep = ';')

# File where we have defined the specific workload behaviour
workload = 'workloadProfile.csv'

# Data of the Concurrency Thread Group
concurrencyValues = {

    "TargetLevel": "500",    
    "RampUp": "0",                          
    "Steps": "1",
    "Hold": "3"

}

# Data of the HTTP Request
httpValues = {

    "HTTPSampler.domain": "127.0.0.1",
    "HTTPSampler.port": "1323",
    "HTTPSampler.path": "/workflow/invoke/videosearcher_0",
    "HTTPSampler.method": "POST"

}


jsonBody = json.dumps({
    "params": {"dir": str(time.time())},
    "CanDoOffloading": False
})

# Data of the CSV file about the matrices
# csvValues = {

#     "delimiter": ";",
#     "fileEncoding": "US-ASCII",
#     "filename": "/Users/fabioschiliro/Desktop/Multidisciplinary Project/MultidisciplinaryProject/JMeter/Matrices.csv",
#     "variableNames": "matrix_a,matrix_b",
#     "shareMode": "shareMode.all"

# }

# csvBools = {
#     "ignoreFirstLine": "true",
#     "quotedData": "false",
#     "recycle": "true",
#     "stopThread": "false"
# }


# Let's create the configuration file now!
configFile = 'jmeterConfigurationFile.jmx'
baseFile = '[Structure] Matrix Multiplication Requests.jmx'

tree = ET.parse(baseFile)
root = tree.getroot()

root = writeConcurrencyThread(root, concurrencyValues)
root = writeHTTPRequest(root, httpValues, jsonBody)
# root = writeCSVFile(root, csvValues, csvBools)
root = writeWorkload(root, workload, configFile)

tree.write(configFile, encoding = 'utf-8', xml_declaration = True)
print('File correctly saved!')