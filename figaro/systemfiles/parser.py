from json import load, dump
import argparse
import subprocess


def execute_serverledge_cli(command):
    command = "docker compose exec -it serverledge bin/serverledge-cli " + command  
    print(f"Executing command: {command}")
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    # if result.returncode != 0:
    #     raise RuntimeError(f"Command failed: {result.stderr.strip()}")
    return result.stdout.strip()


parser = argparse.ArgumentParser(description='Parse a JSON SystemFile and create an ASL file.')
parser.add_argument('input_file', type=str, help='Path to the input system file')

args = parser.parse_args()

# Load the JSON file
with open(args.input_file, 'r') as f:
    data = load(f)
    
workflow_name = f"{args.input_file.split('.')[0]}_workflow"

components = data['Components']

if len(components) == 0:
    raise ValueError("No components found in the system file.")

computational_layers = dict(data.get('EdgeResources', {}), **data.get('CloudResources', {}))

if len(computational_layers) == 0:
    raise ValueError("No resources found in the system file.")

resources = {
    list(v.keys())[0]: v[list(v.keys())[0]] for v in computational_layers.values()
}

if len(resources) == 0:
    raise ValueError("No resources found in the computational layers.")

compatibility_matrix = data['CompatibilityMatrix']

if len(compatibility_matrix) == 0:
    raise ValueError("No compatibility matrix found in the system file.")

# Create ASL components
component_names = list(components.keys())

# Create a dictionary to hold the ASL data
asl_data = {
    "Comment": f"Auto-generated System File: {args.input_file}",
    "StartAt": component_names[0],
    "States": {},
}

# Iterate through the components and create states
for comp in component_names:
    state = {
        "Type": "Task",
        "Resource": comp,
    }

    next = components[comp]['s1']['h1']['next']
    if len(next) > 0:
        state['Next'] = next[0]
    else:
        state['End'] = True
    
    # Add the state to the ASL data
    asl_data['States'][comp] = state

# Write the ASL data to a file
output_file = f"{workflow_name}_asl.json"
with open(output_file, 'w') as f:
    dump(asl_data, f, indent=4)

print(f"ASL file created")

# Execute the serverledge-cli command to create the functions and the workflow in serverledge
for fun in component_names:
    command = f"delete -f {fun}"
    execute_serverledge_cli(command)
    
for fun in component_names:
    res = compatibility_matrix[fun]["h1"][0]["resource"]
    cpus = resources[res]["n_cores"]
    memory = compatibility_matrix[fun]["h1"][0]["memory"]
    command = f'create -f {fun} --cpu {cpus} --memory {memory} --runtime custom --handler "function.handler" --custom_image {fun} --input "dir:Text" --output "dir:Text"'
    execute_serverledge_cli(command)
    
# Copy the ASL file to the serverledge container
command = f"docker compose cp {output_file} serverledge:/app/{output_file}"
subprocess.run(command, shell=True, capture_output=True, text=True)

# Delete the existing workflow if it exists
command = f"delete-workflow -f {workflow_name}"
execute_serverledge_cli(command)

# Create the workflow in serverledge
command = f"create-workflow -f {workflow_name} -s /app/{output_file}"
execute_serverledge_cli(command)