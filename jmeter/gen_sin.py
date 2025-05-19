''' 
Reference:
    <collectionProp name="2101628691">
        <stringProp name="1">1</stringProp>
        <stringProp name="52469">500</stringProp>
        <stringProp name="60">60</stringProp>
    </collectionProp>
'''

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

seconds = 1800
baseRPS = 0.6
amplitude = 0.2
noiseSTD = 0.05

# Generate time vector
t = np.linspace(0, 6 * np.pi, seconds)

# Sinusoidal pattern + noise
rps = baseRPS + amplitude * np.sin(t) + np.random.normal(0, noiseSTD, seconds)
print(rps)

# Remove negative values
rps[rps < 0] = 0

df = pd.DataFrame({'Time': range(seconds), 'RPS': rps.astype(float)})
df.to_csv("sin_file.csv", index=False)

# Plot the RPS over time
plt.figure(figsize=(10, 6))
plt.plot(df['Time'], df['RPS'], label='RPS')
plt.title('RPS Over Time')
plt.xlabel('Time (seconds)')
plt.ylabel('Requests Per Second (RPS)')
plt.legend()
plt.grid(True)
plt.savefig("RPS_Over_Time.png")

sin_file = open('sin_file.jmx', 'w')
sin_file.write('<collectionProp name="load_profile">\n')
for i in range(len(rps)-1):
    sin_file.write('    <collectionProp name="2101628691">\n')
    sin_file.write(f'       <stringProp name="{i}">{rps[i]}</stringProp>\n')
    sin_file.write(f'       <stringProp name="{i+1}">{rps[i+1]}</stringProp>\n')
    sin_file.write(f'       <stringProp name="1">1</stringProp>\n')
    sin_file.write('    </collectionProp>\n')
sin_file.write('</collectionProp>\n')
sin_file.close()
