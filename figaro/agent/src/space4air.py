import os
import json
import subprocess
from time import sleep
import matplotlib.pyplot as plt
import numpy as np
import random

class Space4Air:

    def __init__(self):
        self.space4air_choices = {}
        self.PRECISION = 3
        self.SPACE4AIR_SPLIT_SYSTEMFILES_FOLDER = "/home/cavadini/figaro-on-rl4cc/split_systemfile/systemfiles"
        self.SPACE4AIR_TEMPLATES_FOLDER = "/home/cavadini/figaro-on-rl4cc/space4air"
        self.SPACE4AIR_OUTPUT_FOLDER = "/home/cavadini/figaro-on-rl4cc/output_nas/space4air/"
        # FOLDER_NAME = {"0": "A", "1": "B", "2": "C", "3":"D"}


    def get_precision(self):
        return self.PRECISION

    def execute_space4air(self, folder_path = "", experiment_name = "", config = {}):

        min_workload=config.get("min_workload", 0)
        max_workload=config.get("max_workload", 100)
        computational_layer = config.get("computational_layer", "computationalLayer1")
        computational_layer_id = config.get("computational_layer_id", 1)
        compatible_configurations = config.get("compatible_configurations", [[0]])

        os.makedirs(f"{folder_path}/{experiment_name}/space4air/input", exist_ok=True)
        os.makedirs(f"{folder_path}/{experiment_name}/space4air/output", exist_ok=True)

        demands = config.get("demand")
        if config.get("threshold_ratio", None) is not None:
            threshold_ratio = config.get("threshold_ratio")
            thresholds = [round((demands[i] * threshold_ratio[i]), self.PRECISION) for i in range(len(threshold_ratio))]
        else:
            threshold_ratio = config.get("min_threshold_ratio")
            thresholds = [round((d * threshold_ratio), self.PRECISION) for d in demands]

        print('space4air: compatible_configurations:', compatible_configurations, flush=True)
        for configuration in compatible_configurations:

            print(f"running space4air for configuration {configuration}", flush=True)

            template_input_s4air = f"{self.SPACE4AIR_TEMPLATES_FOLDER}/input_s4air.json"
            with open(template_input_s4air, "r") as f:
                input_s4air = json.load(f)

            configuration_to_string = ""
            folder_name = ""
            s4air_output_folder = ""
            real_component_names = config.get("real_component_names", [])
            if not config.get('start_from_systemfile', False):
                # configuration_to_string = "_".join([str(c) for c in configuration])
                configuration_to_string = "-".join([real_component_names[c] for c in configuration])
                folder_name = f"{computational_layer_id}_{configuration_to_string}"
                s4air_output_folder = f"{folder_path}/{experiment_name}/space4air/output/{folder_name}"
                os.makedirs(s4air_output_folder, exist_ok=True)
                
                template_systemfile = f"{self.SPACE4AIR_TEMPLATES_FOLDER}/system_files/{folder_name}.json"
                with open(template_systemfile, "r") as f:
                    systemfile = json.load(f)
        
                if "CloudResources" in systemfile and systemfile["CloudResources"]:
                    resources = systemfile["CloudResources"]
                if "EdgeResources" in systemfile and systemfile["EdgeResources"]:
                    resources = systemfile["EdgeResources"]
                
                computational_layer = config.get("computational_layer", "computationalLayer1")
                computational_layer_resources = resources[computational_layer]
                resource_name = list(computational_layer_resources.keys())[0]
                computational_layer_resources[resource_name]["number"] = config["max_n_instances"]
                computational_layer_resources[resource_name]["cost"] = config["machine_cost"]
                for component_index in configuration:
                    try:
                        real_component_name = real_component_names[component_index]
                    except IndexError:
                        real_component_name = "c" + str(component_index)
                    systemfile['Performance'][real_component_name]['h1'][resource_name]['demand'] = demands[component_index]
                    systemfile['LocalConstraints'][real_component_name]['local_res_time'] = thresholds[component_index]
            else:
                #TODO: fix this mismatch in naming convention
                configuration_to_string = "-".join([real_component_names[c] for c in configuration])
                folder_name = f"{computational_layer}_{configuration_to_string}"
                s4air_output_folder = f"{folder_path}/{experiment_name}/space4air/output/{folder_name}"
                os.makedirs(s4air_output_folder, exist_ok=True)
                
                experiment_general_output_folder = config.get("experiment_general_output_folder", None)
                if not experiment_general_output_folder:
                    raise ValueError("Missing experiment_general_output_folder in env_config")
                space4air_split_systemfiles_folder = experiment_general_output_folder + '/systemfiles'
                print('opening systemfile:', f"{space4air_split_systemfiles_folder}/systemfile_{folder_name}.json", flush=True)
                with open(f"{space4air_split_systemfiles_folder}/systemfile_{folder_name}.json", "r") as f:
                    systemfile = json.load(f)
                    
            input_s4air['LambdaBound'] = {
                    'start': config["min_workload"],
                    'end': config["max_workload"]+2*(10**(-self.PRECISION)),
                    'step': 10**(-self.PRECISION)
                }
            input_s4air['ConfigFiles'] = [f"/mnt/{experiment_name}/space4air/input/SystemFile_{folder_name}.json"]

            #saving files
            with open(f"{folder_path}/{experiment_name}/space4air/input/SystemFile_{folder_name}.json", "w+") as f:
                f.write(json.dumps(systemfile, indent=4))
            with open(f"{folder_path}/{experiment_name}/space4air/input/input_s4air.json", "w+") as f:
                f.write(json.dumps(input_s4air, indent=4))

            random_container_name = "space4airfigarorl4cc" + str(random.randint(0, 100000))
            cmd = ['bash', 'start_space4air.sh', experiment_name, random_container_name, folder_path, f"{folder_name}"]
            subprocess.run(cmd)
            remove_container_cmd = ['docker', 'rm', '-f', random_container_name]
            subprocess.run(remove_container_cmd)

            self.space4air_choices[configuration_to_string] = {}
            space4air_choice = {}
            for workload in np.arange(min_workload, max_workload+(2*(10**-self.PRECISION)), (10**-self.PRECISION)):
                workload = round(workload, self.PRECISION)
                with open(f"{s4air_output_folder}/Lambda_{workload}.json", "r") as f:
                    s4air_result = json.load(f)
                    if s4air_result["feasible"]:
                        if not config.get('start_from_systemfile', False):
                            space4air_choice[workload] = s4air_result["components"]["c0"]["s1"]["h1"]["computationalLayer1"]["VM1"]["number"]
                        else:
                            #TODO: fix with the right names
                            first_component_name = list(s4air_result["components"].keys())[0]
                            computational_layer_name = list(s4air_result["components"][first_component_name]["s1"]["h1"].keys())[0]
                            resource_name = list(s4air_result["components"][first_component_name]["s1"]["h1"][computational_layer_name].keys())[0]
                            space4air_choice[workload] = s4air_result["components"][first_component_name]["s1"]["h1"][computational_layer_name][resource_name]["number"]
                    else:
                        space4air_choice[workload] = np.inf
                        
            self.space4air_choices[configuration_to_string] = space4air_choice

    def get_space4air_choices(self):
        return self.space4air_choices

    def plot_space4air_comparison(self, n_instances_agent = [], n_instances_s4air = [], workload = [], folder_path = "", max_n_instances = 100):
        difference = []
        for i in range(len(n_instances_agent)):
            if isinstance(n_instances_s4air, (list, np.ndarray)):
                if not isinstance(n_instances_s4air, np.ndarray):
                    n_instances_s4air = np.array(n_instances_s4air)

                finite_values = n_instances_s4air[n_instances_s4air != np.inf]
                
                if finite_values.size > 0:
                    max_value = max(finite_values)
                    if n_instances_s4air[i] == np.inf and n_instances_agent[i] == max_value:
                        difference.append(0)
                    else:
                        difference.append(n_instances_s4air[i] - n_instances_agent[i])
                else:
                    print("SPACE4AIR: All values in n_instances_s4air are infinite.")
                    difference.append(np.nan)
            else:
                print('SPACE4AIR: n_instances_s4air is not a list or array. It is:', n_instances_s4air)
                difference.append(np.nan)

        fig, ax1 = plt.subplots(figsize=(10, 10), num="Agent vs Space4Air")

        line_agent, = ax1.plot(n_instances_agent, label="Agent", color="blue")
        line_s4air, = ax1.plot(n_instances_s4air, label="Space4Air", color="orange")
        ax1.set_xlabel("Time (ms)")
        ax1.set_ylabel("Number of VMs")
        ax1.set_ylim(0, max_n_instances+1)

        ax2 = ax1.twinx()
        line_workload, = ax2.plot(workload, label="Workload", color="red", linestyle="--")
        ax2.set_ylabel("Workload (units)")  # Adjust units as needed

        lines = [line_agent, line_s4air, line_workload]
        labels = [line.get_label() for line in lines]
        ax1.legend(lines, labels, loc="upper left")

        plt.title("Agent vs Space4Air")
        plt.savefig(
            f"{folder_path}/space4air_comparison_last.png",
            format="png",
            bbox_inches="tight"
        )
        plt.close()
                
        plt.figure('Difference between the number of instances', figsize=(10,10))
        plt.plot(difference)
        plt.ylabel('Space4Air - Agent (#VMs)')
        plt.xlabel('Time (ms)')
        plt.title(f'Agent vs Space4Air')
        plt.savefig(
            f"{folder_path}/space4air_comparison_difference_last.png",
            format = "png",
            bbox_inches = "tight"
        )
        plt.close()