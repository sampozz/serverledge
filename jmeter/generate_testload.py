import xml.etree.ElementTree as ET
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def indent(elem, level = 0):

    i = "\n" + level * "  "
    
    if len(elem):
        
        if not elem.text or not elem.text.strip():
            elem.text = i + "  "
        
        for child in elem:
            indent(child, level + 1)
        
        if not child.tail or not child.tail.strip():
            child.tail = i
    
    if level and (not elem.tail or not elem.tail.strip()):
        elem.tail = i


def writeWorkload(root, workload):

    '''
    Format for each entry in the dataframe:

    <collectionProp name="84472748">                 # The name is not important, you can reuse it
        <stringProp name="48">0</stringProp>         # This represents the Initial RPS
        <stringProp name="49">1</stringProp>         # This represents the Final RPS
        <stringProp name="49">1</stringProp>         # This represents the Duration (expressed in seconds)
    </collectionProp>
    '''

    df = pd.read_csv(workload, delimiter = ';')

    duration = 1
    previousRPS = 0

    # Find the target <collectionProp name="load_profile"> (i.e. where we want to insert the workload)
    for elem in root.iter('collectionProp'):
        
        if elem.attrib.get('name') == 'load_profile':
            
            loadProfileElem = elem
            
            break

    # Just to be sure, we remove all the children of that node
    loadProfileElem.clear()
    loadProfileElem.set('name', 'load_profile')


    for index, row in df.iterrows():

        #print(f"Row {index}: Time = {row['Time']}, RPS = {row['RPS']}")
        collection = ET.Element('collectionProp', {'name': '84472748'})
        
        ET.SubElement(collection, 'stringProp', {'name': str(previousRPS)}).text = str(previousRPS)
        ET.SubElement(collection, 'stringProp', {'name': str(row['RPS'])}).text = str(row['RPS'])
        ET.SubElement(collection, 'stringProp', {'name': str(duration)}).text = str(duration)

        loadProfileElem.append(collection)
        previousRPS = row['RPS']

    indent(root)
    
    return root


seconds = 1800
baseRPS = 0.1
amplitude = 0.4
noiseSTD = 0.01

# Generate time vector
t = np.linspace(0, 3 * np.pi, seconds)
# Sinusoidal pattern + noise
rps = baseRPS + amplitude * np.sin(t) + np.random.normal(0, noiseSTD, seconds)
# Remove negative values
rps[rps < 0] = 0

# Save the workload to a CSV file
workload_file = 'workloadProfile.csv'
df = pd.DataFrame({'Time': range(seconds), 'RPS': rps.astype(float)})
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


config_file = 'testload.jmx'
basefile = 'testload_structure.jmx'
tree = ET.parse(basefile)
root = tree.getroot()

root = writeWorkload(root, workload_file)
tree.write(config_file, encoding = 'utf-8', xml_declaration = True)
print('File correctly saved!')

