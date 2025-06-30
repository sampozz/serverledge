"""
Copyright 2024 Federica Filippini

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""
import copy
import os
import json
import random
import numpy as np

from ray.rllib.env.env_context import EnvContext
from gymnasium.spaces import Discrete, Box, Dict

from src.managers import ResponseTimeManager
from src.managers import SimpleWorkloadManager
from src.agents import MasterAgent

from RL4CC.environment.base_environment import BaseEnvironment

from src.space4air import Space4Air

OUTPUT_FOLDER = "/home/cavadini/figaro-on-rl4cc/output_nas/figaro-on-rl4cc/outputs/"
# OUTPUT_FOLDER = "/home/cavadini/figaro-on-rl4cc/output_nas/figaro-on-rl4cc/experiments/output/"
# FOLDER_NAME = {"0": "A", "1": "B", "2": "C", "3": "D"}

class CustomEnvironment(BaseEnvironment):

    # def generateAllBinaryLists(self, n):
    #     N=2**n
    #     total_list = []
    #     for j in range(1, N):
    #         res = [int(i) for i in list('{0:0b}'.format(j))]
    #         while len(res) < n:
    #             res.insert(0, 0)
    #         total_list.append(res)
    #     #total_list = [[0,1],[1,1]]
    #     return total_list


    def load_configuration(self, config: EnvContext):
        """
        Initialize environment loading info from the provided configuration dict
        """
        self.demand = config["demand"]
        self.worker_type = "training"
        # self.comps_permutation = self.generateAllBinaryLists(len(self.demand))
        # if config.get("threshold_ratio", None) is not None:
        #     self.threshold_ratio = config["threshold_ratio"]
        # else:
        #     self.min_threshold_ratio = config["min_threshold_ratio"]
        #     self.max_threshold_ratio = config["max_threshold_ratio"]
        # simulation time management
        self.min_time = config["min_time"]
        self.max_time = config["max_time"]
        self.time_step = config["time_step"]
        self.current_time = 0
        # number of resource instances
        self.min_n_instances = config["min_n_instances"]
        self.max_n_instances = config["max_n_instances"]
        self.n_instances = self.max_n_instances
        #needed for space4air
        self.min_workload = config["min_workload"]
        self.max_workload = config["max_workload"]
        # resource cost
        self.machine_cost = config["machine_cost"]
        # objective function weights
        self.execution_weight = config["execution_weight"]
        self.violation_weight = config["violation_weight"]
        self.normalize_costs = config.get("normalize_costs", False)
        self.use_violation_cost = config.get("use_violation_cost", False)

        self.reward_multiplier = config.get("reward_multiplier", 1)

        self.space4air_agent = config.get("space4air_agent", False)

        self.compare_to_space4air = config.get("compare_to_space4air", False)
        if self.compare_to_space4air:
            self.behavioral_cloning = config.get("behavioral_cloning", False)
            self.behavioral_cloning_multiplier = config.get("behavioral_cloning_multiplier", 1)
            self.bc_iterations = config.get("bc_iterations", 0)
            self.space4air_choices = config.get("space4air_choices", {})
            self.space4air = Space4Air()

        self.state_has_to_be_normalized = config.get("state_has_to_be_normalized", False)

        self.pressure_clip_value = config.get("pressure_clip_value", 1)
        self.queue_length_dominant_clip_value = config.get("queue_length_dominant_clip_value", 1)

        self.computational_layer_id = config.get("computational_layer_id", 1)
        self.compatible_configurations = config.get("compatible_configurations", [[0]])
        self.remained_permutations = copy.deepcopy(self.compatible_configurations)
        self.real_component_names = config.get("real_component_names", [])
    
        if 'worker_index' not in config or config.worker_index is None:
            self.configuration_seed = config.get("seed", random.randint(0, 100000))
        else:
            self.configuration_seed = config.worker_index * config.get("seed", config.num_workers)

        self.n_components = config.get("n_components", 1)
        self.components = None
        
        # always coming from the outside
        self.input_workload = None
        
        # array of workload component per component, calculated from input_workload and transition_probabilities
        self.workload = None
        self.training_iteration_index = 0
        
        # this can have two values: "split" or "input"
        # "split": the workload is split by component in the state --> the default setting
        # "input": the workload is the input_workload to the computational layer
        self.state_workload = config.get("state_workload", "split")

        self.number_of_actions = self.max_n_instances - self.min_n_instances + 1
        self.action_space = Discrete(self.number_of_actions, start=self.min_n_instances)
        self.actions_list = [i for i in range(self.min_n_instances, self.max_n_instances+1)]
        self.utilization = None
        self.pressure = None
        self.queue_length_dominant = None

        self.fill_replay_buffer = config["fill_replay_buffer"]
        if config["fill_replay_buffer"]:
            self.replay_buffer_capacity = config["replay_buffer_capacity"]
            self.number_of_space4air_batches_for_rb = config["number_of_space4air_batches_for_rb"]
            self.config = config
        else:
            self.replay_buffer_capacity = None
            self.number_of_space4air_batches_for_rb = None
            self.config = None
            
        self.current_configuration_index = 0
  
    def __init__(self=None, config=None):
        """
        State:
        - workload
        - n_instances
        - utilization
        - pressure (dominant response time / dominant threshold)
        # - n_dominant_users (dominant response time / dominant demand)
        - queue length dominant component ((dominant response time - dominant demand) / dominant demand)
        """
        self.load_configuration(config)

        self.current_folder = config["logdir"]
        self.master_agent = MasterAgent(config, self.configuration_seed, self.compatible_configurations, self.worker_type)
        self.workload_manager = SimpleWorkloadManager(config, self.configuration_seed)
        self.response_time_manager = ResponseTimeManager(config, self.configuration_seed)
        self.component_id = 0
        self.max_pressure = self.response_time_manager.get_max_pressure()
        self.min_pressure = self.response_time_manager.get_min_pressure()
        self.max_queue_length = self.response_time_manager.get_max_queue_length()
        self.min_queue_length = self.response_time_manager.get_min_queue_length()

        if self.state_has_to_be_normalized:
            self.observation_space = Dict({
                "n_instances": Box(
                    low=0,
                    high=1,
                    shape=(1,),
                    dtype=np.float64
                ),
                "utilization": Box(
                    low=0,
                    high=1,
                    shape=(1,),
                    dtype=np.float64
                ),
                "pressure": Box(
                    low=0,
                    high=1,
                    shape=(1,),
                    dtype=np.float64
                ),
                "queue_length_dominant": Box(
                    low=0,
                    high=1,
                    shape=(1,),
                    dtype=np.float64
                ),
                "workload": Box(
                    low=0,
                    high=1,
                    shape=(1,),
                    dtype=np.float64
                ),
                # "previous_workload": Box(
                #     low=0,
                #     high=1,
                #     shape=(1,),
                #     dtype=np.float64
                # )
            })
        else:
            self.observation_space = Dict({
                "n_instances": Box(
                    low=self.min_n_instances,
                    high=self.max_n_instances,
                    shape=(1,),
                    dtype=np.float64
                ),
                "utilization": Box(
                    low=0,
                    high=1,
                    shape=(1,),
                    dtype=np.float64
                ),
                "pressure": Box(
                    low=0,
                    high=self.max_pressure,
                    shape=(1,),
                    dtype=np.float64
                ),
                "queue_length_dominant": Box(
                    low=0,
                    high=self.max_queue_length,
                    shape=(1,),
                    dtype=np.float64
                ),
                "workload": Box(
                    low=self.min_workload,
                    high=self.max_workload,
                    shape=(1,),
                    dtype=np.float64
                ),
                # "previous_workload": Box(
                #     low=self.min_workload,
                #     high=self.max_workload,
                #     shape=(1,),
                #     dtype=np.float64
                # )
            })
            
        self.previous_workload = self.min_workload

        self.get_space4air_choice()
        self.reset(self.configuration_seed)
        if self.fill_replay_buffer:
            self.create_s4air_replay_buffer()
        
    def reset(self=None, seed=None, options=None):
        """
        Reset the environment to the initial state
        """
        super().reset(seed=seed)
        self.master_agent.reset(self.worker_type)
        
        new_components, self.remained_permutations, self.current_configuration_index = self.master_agent.get_components(  self.current_time,
                                                                                    self.worker_type,
                                                                                    self.remained_permutations,
                                                                                    self.compatible_configurations,
                                                                                    self.components)
        
        if not np.array_equal(new_components, self.components):
            self.components = new_components
            self.response_time_manager.update_thresholds(self.components)

        self.current_time = 0
        self.n_instances = self.max_n_instances

        self.workload_manager.generate_workload_profile()
        self.input_workload = self.workload_manager.get_initial_workload()

        self.total_violations = 0

        state = self.update_components_and_state()

        (obs, obs_info) = self.observation(state)
        info = {
            **obs_info,
            "current_time": self.current_time
        }
            
        return obs, info
  
    def update_components_and_state(self):
        """
        Update the list of components to manage and the environment state
        """
        self.input_workload = self.workload_manager.get_workload(self.current_time)    

        workload = self.workload_manager.get_components_workload(
            self.input_workload, self.master_agent.transition_probabilities
        )
        self.workload = np.zeros(self.n_components)
        for i in self.components:
            self.workload[i] = workload[i]

        if len(self.demand) == 1:
            self.utilization = self.response_time_manager.compute_utilization_single_component(
                self.workload[self.component_id], self.n_instances, self.component_id
            )
        else:
            self.utilization = self.response_time_manager.compute_utilization(
                self.workload, self.n_instances, self.components
            )

        self.n_dominant_users = self.response_time_manager.compute_n_dominant_users(
            self.workload, self.n_instances, self.components
        )

        if len(self.demand) == 1:
            self.pressure = self.response_time_manager.compute_pressure_single_component(
                self.workload[self.component_id], self.n_instances, self.component_id
            )
        else:
            self.pressure = self.response_time_manager.compute_dominant_pressure(
            self.workload, self.n_instances, self.components
            )
        if len(self.demand) == 1:
            self.queue_length_dominant = self.response_time_manager.compute_queue_length_single_component(
                self.workload[self.component_id], self.n_instances, self.component_id
            )
        else:
            self.queue_length_dominant = self.response_time_manager.compute_queue_length_dominant(
                self.workload, self.n_instances, self.components
            )

        state = {
            "n_instances": self.n_instances,
            "utilization": self.utilization,
            "pressure": self.pressure,
            "queue_length_dominant": self.queue_length_dominant,
            "workload": self.workload if self.state_workload == "split" else self.input_workload,
            # "previous_workload": self.previous_workload
        }

        if self.state_has_to_be_normalized:
            return self.normalize_state(state)
        else:
            return state

    def observation(self, state=None):
        """
        Define observation
        """
        
        if state:
            if 'workload' in state:
                _workload = state["workload"] if isinstance(state["workload"], (list, tuple, set, np.ndarray)) and len(state["workload"]) > 0 else (state["workload"] if state["workload"] else 0)
                workload = np.array([_workload], dtype=np.float64) if not isinstance(_workload, (list, np.ndarray)) else np.array(_workload, dtype=np.float64)
                
            if "previous_workload" in state:
                _previous_workload = state["previous_workload"] if isinstance(state["previous_workload"], (list, tuple, set, np.ndarray)) and len(state["previous_workload"]) > 0 else (state["previous_workload"] if state["previous_workload"] else 0)
                previous_workload = np.array([_previous_workload], dtype=np.float64) if not isinstance(_previous_workload, (list, np.ndarray)) else np.array(_previous_workload, dtype=np.float64)

            if "utilization" in state:
                _utilization = state["utilization"] if isinstance(state["utilization"], (list, tuple, set, np.ndarray)) and len(state["utilization"]) > 0 else (state["utilization"] if state["utilization"] else 0)
                utilization = np.array([_utilization], dtype=np.float64) if not isinstance(_utilization, (
                list, np.ndarray)) else np.array(_utilization, dtype=np.float64)

            if "pressure" in state:
                _pressure = state["pressure"] if isinstance(state["pressure"], (list, tuple, set, np.ndarray)) and len(state["pressure"]) > 0 else (state["pressure"] if state["pressure"] else 0)
                pressure = np.array([_pressure], dtype=np.float64) if not isinstance(_pressure,
                                                                                        (list, np.ndarray)) else np.array(
                    _pressure, dtype=np.float64)
                
            if "queue_length_dominant" in state:
                _queue_length_dominant = state["queue_length_dominant"] if isinstance(state["queue_length_dominant"], (list, tuple, set, np.ndarray)) and len(state["queue_length_dominant"]) > 0 else (state["queue_length_dominant"] if state["queue_length_dominant"] else 0)
                queue_length_dominant = np.array([_queue_length_dominant], dtype=np.float64) if not isinstance(
                    _queue_length_dominant, (list, np.ndarray)) else np.array(_queue_length_dominant, dtype=np.float64)

            if "n_instances" in state:
                _n_instances = state["n_instances"] if isinstance(state["n_instances"], (list, tuple, set, np.ndarray)) and len(state["n_instances"]) > 0 else (state["n_instances"] if state["n_instances"] else self.min_n_instances)
                n_instances = np.array([_n_instances], dtype=np.float64) if not isinstance(_n_instances, (list, np.ndarray)) else np.array(_n_instances, dtype=np.float64)

            obs = {
                "n_instances": n_instances,
                "utilization": utilization,
                "pressure": pressure,
                "queue_length_dominant": queue_length_dominant,
                "workload": workload,
                # "previous_workload": previous_workload
            }
            obs_info = {
                "n_instances": n_instances,
                "utilization": utilization,
                "pressure": pressure,
                "queue_length_dominant": queue_length_dominant,
                "workload": workload,
                # "previous_workload": previous_workload
            }

        else:
            obs = {}
            obs_info = {}

        return obs, obs_info
  
    def step(self, action):
        """
        Apply action, define next state and compute reward
        """

        if action < 0:
            self.n_instances = self.min_n_instances
        elif action >= len(self.actions_list):
            self.n_instances = self.max_n_instances
        else:
            self.n_instances = self.actions_list[action]

        if len(self.demand) == 1: #change to generalize
            utilization = self.response_time_manager.compute_utilization_single_component(
                self.workload[self.component_id], self.n_instances, self.component_id
            )
            self.response_time, self.violation = self.response_time_manager.compute_response_time_single_component(
                self.workload[self.component_id], self.n_instances, self.component_id
            )
        else:
            utilization = self.response_time_manager.compute_utilization(self.workload, self.n_instances, self.components)
            self.response_time, self.violation = self.response_time_manager.compute_response_times(
                utilization, self.components
            )

        space4air_vm_choice = np.inf
        n_instances_difference = 0
        if self.compare_to_space4air:
            space4air_vm_choice = self.get_space4air_choice()
            if space4air_vm_choice != np.inf:
                n_instances_difference = self.n_instances - space4air_vm_choice
            else:
                if self.n_instances == self.max_n_instances:
                    n_instances_difference = 0
                else:
                    n_instances_difference = self.n_instances - self.max_n_instances

        if self.violation:
            self.total_violations += 1

        reward = self.compute_reward()

        self.current_time += self.time_step
        
        if self.worker_type == "training":
            new_components, self.remained_permutations, self.current_configuration_index = self.master_agent.get_components(self.current_time,
                                                                                          self.worker_type,
                                                                                          self.remained_permutations,
                                                                                          self.compatible_configurations,
                                                                                          self.components)
                
            if not np.array_equal(new_components, self.components):
                self.components = new_components
                self.response_time_manager.update_thresholds(self.components)


        state = self.update_components_and_state()

        done = self.current_time >= self.max_time

        truncated = done
        
        threshold = np.zeros(self.n_components)
        for i in self.components:
            threshold[i] = self.response_time_manager.get_response_time_threshold(i)
            
        demand = np.zeros(self.n_components)
        for i in self.components:
            demand[i] = self.response_time_manager.get_demand(i)
            
        self.previous_workload = self.input_workload

        (obs, obs_info) = self.observation(state)
        info = {
            **obs_info,
            "current_time": self.current_time,
            "response_time": self.response_time,
            "threshold": threshold,
            "delay": self.response_time_manager.compute_delay(self.response_time),
            "reward": reward,
            "demand": demand,
            "violation": self.violation,
            "total_violations": self.total_violations,
            "action": action,
            "n_instances_difference": n_instances_difference,
            "space4air_vm_choice": space4air_vm_choice,
            "current_configuration_index": self.current_configuration_index
        }

        return obs, reward, done, truncated, info

  
    def compute_reward(self) -> float:
        bc_reward = 0
        _behavioral_cloning_multiplier = 0
        if self.behavioral_cloning and self.worker_type != "evaluation" and self.behavioral_cloning_multiplier > 0:
            space4air_choice = self.get_space4air_choice()
            _behavioral_cloning_multiplier = max(0, self.behavioral_cloning_multiplier - ((self.training_iteration_index*self.behavioral_cloning_multiplier)/self.bc_iterations))
            if space4air_choice != np.inf and self.n_instances == space4air_choice:
                bc_reward = _behavioral_cloning_multiplier
            elif space4air_choice == np.inf and self.n_instances == self.max_n_instances:
                bc_reward = _behavioral_cloning_multiplier
        cost = self.machine_cost * self.n_instances
        max_cost = self.machine_cost * self.max_n_instances

        new_cost_calc = 0
        
        if self.violation and self.n_instances != self.max_n_instances:
            new_cost_calc = 1
        else:
            new_cost_calc = (cost/max_cost) * self.reward_multiplier
            
        final_reward = 1 - new_cost_calc + bc_reward

        return final_reward


    def get_space4air_choice(self):

        if (self.input_workload is not None) and (self.components is not None) and (self.space4air_choices != {}):
            rounded_Lambda = round(self.input_workload, self.space4air.get_precision())
            current_workload = self.workload_manager.get_components_workload(
                rounded_Lambda, self.master_agent.transition_probabilities
            )
            workload = np.zeros(self.n_components)
            for component_index in self.components:
                workload[component_index] = current_workload[component_index]

            active_components_to_string = "-".join([self.real_component_names[c] for c in self.components])
            # rounded_workload = [float(np.round(w, self.space4air.get_precision())) for w in workload]
            space4air_vm_choice = self.space4air_choices[active_components_to_string][rounded_Lambda]
        else:
            space4air_vm_choice = self.min_n_instances

        return space4air_vm_choice
    

    def set_training_iteration_index(self, iteration):
        self.training_iteration_index = iteration

    def create_s4air_replay_buffer(self):
        print('CREATING REPLAY BUFFER')
        space4air_precision = self.space4air.get_precision()
        # capacity_per_scenario = int(self.replay_buffer_capacity/len(self.compatible_configurations))
        capacity_per_scenario = int(self.number_of_space4air_batches_for_rb/len(self.compatible_configurations))
        #generate workloads with finer granularity near saturation
        input_workloads = list(np.linspace(self.min_workload, (self.max_workload/10)*8, int(capacity_per_scenario/3)))
        input_workloads.extend(list(np.linspace((self.max_workload/10)*8, self.max_workload, int((capacity_per_scenario/3)*2))))
        experiences = []
        obs_list = []
        next_obs_list = []
        action_list = []
        reward_list = []
        experience_number = 0
        obs = {}

        for configuration_index, active_components in enumerate(self.compatible_configurations):
            active_components_to_string = "-".join([self.real_component_names[c] for c in active_components])
            for input_workload in input_workloads:
                rounded_input_workload = round(input_workload, space4air_precision)
                all_components_workload = self.workload_manager.get_components_workload(
                    input_workload, self.master_agent.transition_probabilities
                )
                rounded_all_components_workload = self.workload_manager.get_components_workload(
                    rounded_input_workload, self.master_agent.transition_probabilities
                )
                workload = np.zeros(len(active_components))
                rounded_workload = np.zeros(len(active_components))
                for component_index in active_components:
                    workload[component_index] = all_components_workload[component_index]
                    rounded_workload[component_index] = rounded_all_components_workload[component_index]
                if self.space4air_choices:
                    space4air_vm_choice = self.space4air_choices[active_components_to_string][rounded_input_workload]
                else:
                    print('NO SPACE4AIR CHOICES')
                    space4air_vm_choice = self.min_n_instances

                if space4air_vm_choice == np.inf:
                    space4air_vm_choice = self.max_n_instances
                
                if len(active_components) == 1:
                    utilization = self.response_time_manager.compute_utilization_single_component(
                        workload, space4air_vm_choice, self.component_id
                    )
                else:
                    utilization = self.response_time_manager.compute_utilization(
                        workload, space4air_vm_choice, active_components
                    )

                if len(active_components) == 1:
                    pressure = self.response_time_manager.compute_pressure_single_component(
                        workload, space4air_vm_choice, self.component_id
                    )
                else:
                    pressure = self.response_time_manager.compute_dominant_pressure(
                        workload, space4air_vm_choice, active_components
                    )
                if len(active_components) == 1:
                    queue_length_dominant = self.response_time_manager.compute_queue_length_single_component(
                        workload, space4air_vm_choice, self.component_id
                    )
                else:
                    queue_length_dominant = self.response_time_manager.compute_queue_length_dominant(
                        workload, space4air_vm_choice, active_components
                    )

                state = {
                    "n_instances": space4air_vm_choice,
                    "utilization": utilization,
                    "pressure": pressure,
                    "queue_length_dominant": queue_length_dominant,
                    "workload": workload
                }
                if self.state_has_to_be_normalized:
                    new_state = self.normalize_state(state)
                else:
                    new_state = state

                _workload = new_state["workload"] if isinstance(new_state["workload"], (list, tuple, set, np.ndarray)) and len(
                    new_state["workload"]) > 0 else (new_state["workload"] if new_state["workload"] else 0)
                
                if "pressure" in new_state:
                    _pressure = new_state["pressure"] if isinstance(new_state["pressure"], (list, tuple, set, np.ndarray)) and len(
                        new_state["pressure"]) > 0 else (new_state["pressure"] if new_state["pressure"] else 0)
                if "queue_length_dominant" in new_state:
                    _queue_length_dominant = new_state["queue_length_dominant"] if isinstance(new_state["queue_length_dominant"],
                                                                                        (list, tuple, set, np.ndarray)) and len(
                        new_state["queue_length_dominant"]) > 0 else (new_state["queue_length_dominant"] if new_state["queue_length_dominant"] else 0)

                if "utilization" in new_state:
                    _utilization = new_state["utilization"] if isinstance(new_state["utilization"], (list, tuple, set, np.ndarray)) and len(
                        new_state["utilization"]) > 0 else (new_state["utilization"] if new_state["utilization"] else 0)
                if "n_instances" in new_state:
                    _n_instances = new_state["n_instances"] if isinstance(new_state["n_instances"],
                                                                  (list, tuple, set, np.ndarray)) and len(
                        new_state["n_instances"]) > 0 else (new_state["n_instances"] if new_state["n_instances"] else self.min_n_instances)
                    _n_instances = np.array([_n_instances], dtype=np.float64) if not isinstance(_n_instances, (
                    list, np.ndarray)) else np.array(_n_instances, dtype=np.float64)

                space4air_action = space4air_vm_choice
                max_cost = self.machine_cost * self.max_n_instances
                cost = self.machine_cost * space4air_action
                reward = 1.5 - cost / max_cost

                l = [_n_instances, _pressure, _utilization, _queue_length_dominant, _workload]
                l_fixed = []
                for index, i in enumerate(l):
                    if not isinstance(i, (list, tuple, set, np.ndarray)):
                        l_fixed.append([i])
                    else:
                        l_fixed.append([i[0]])
                        
                next_obs = np.array(l_fixed)

                experience_number += 1

                if experience_number-1 == 0:
                    obs = next_obs
                    continue
                else:
                    obs_list.append(obs)
                    next_obs_list.append(next_obs)
                    obs = next_obs
                action_list.append(space4air_action-1)
                reward_list.append(reward)

        experiences = [np.array(obs_list), np.array(action_list), np.array(reward_list), np.array(next_obs_list)]
        import pickle
        with open(OUTPUT_FOLDER+'file.pkl', 'wb') as f:
            pickle.dump(experiences, f)

        print('REPLAY BUFFER CREATED')
        
        return experiences


    def convert_to_original_state(self, state):
        """convert the normalized state to the original state considering three source of variability

        Args:
            state (dict): the state

        Returns:
            dict: the original state
        """

        workload = state["workload"]*(self.workload_manager.max_workload - self.workload_manager.min_workload) + self.workload_manager.min_workload
        # previous_workload = state["previous_workload"]*(self.workload_manager.max_workload - self.workload_manager.min_workload) + self.workload_manager.min_workload
        if "n_instances" in state:
            n_instances = state["n_instances"] * (self.max_n_instances)
        if "pressure" in state:
                pressure = state["pressure"] * (self.max_pressure - self.min_pressure) + self.min_pressure
        if "queue_length_dominant" in state:
                queue_length_dominant = state["queue_length_dominant"] * (self.max_queue_length - self.min_queue_length) + self.min_queue_length

        original_state = {
            "n_instances": n_instances,
            "utilization": state["utilization"],
            "pressure": pressure,
            "queue_length_dominant": queue_length_dominant,
            "workload": workload,
            # "previous_workload": previous_workload
        }

        return original_state

    def normalize_state(self, state):
        """normalize the state

        Args:
            state (dict): the state

        Returns:
            dict: the normalized state
        """

        # for each state element compute value_norm = (original_value - min )/ (max - min)
        # if min = 0; value_norm = original_value / max
        # then it value is rounded to x decimals to have  discrete values value per state feature, x is determined form the define_decimals function
        workload = (state["workload"] - self.workload_manager.min_workload) / (self.workload_manager.max_workload - self.workload_manager.min_workload)
        
        # previous_workload = (state["previous_workload"] - self.workload_manager.min_workload) / (self.workload_manager.max_workload - self.workload_manager.min_workload)
        
        if "n_instances" in state:
            n_instances = (state["n_instances"])/(self.max_n_instances) # TO CHECK: was state["n_instances"]-1 - why?
        
        if "pressure" in state:
                clipped_pressure = np.clip(state["pressure"], self.min_pressure, self.pressure_clip_value)
                pressure = (clipped_pressure - self.min_pressure) / (self.pressure_clip_value - self.min_pressure)
                
        if "queue_length_dominant" in state:
                clipped_queue_length_dominant = np.clip(state["queue_length_dominant"], self.min_queue_length, self.queue_length_dominant_clip_value)
                queue_length_dominant = (clipped_queue_length_dominant - self.min_queue_length) / (self.queue_length_dominant_clip_value - self.min_queue_length)

        normalized_state = {
            "n_instances": n_instances,
            "utilization": state["utilization"],
            "pressure": pressure,
            "queue_length_dominant": queue_length_dominant,
            "workload": workload,
            # "previous_workload": previous_workload
        }

        return normalized_state