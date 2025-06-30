import copy
from typing import Tuple
import numpy as np
import random

class MasterAgent:
    def __init__(self, config: dict, seed: int, comps_permutation, worker_type: str):
        
        self.seed = seed
        np.random.seed(seed)
        # simulation time management
        self.min_time = config["min_time"]
        self.max_time = config["max_time"]
        self.time_step = config["time_step"]
        # component transition probabilities
        self.transition_probabilities=np.array(config.get("transition_probabilities", [0]))
        # component demands
        self.demand = np.array(config["demand"])
        # number of components
        self.total_n_components = config["n_components"]
        self.total_permutation = len(comps_permutation)#2**len(self.demand) - 1
        self.time_threshold = (self.max_time - self.min_time) / self.total_permutation
        self.time_threshold_step = (self.max_time - self.min_time) / self.total_permutation
        # if not config.get("evaluation", False):
        #     self.time_threshold = np.random.uniform(
        #         (self.max_time - self.min_time) / 4,
        #         (self.max_time - self.min_time) / 4 * 3
        #     )
        
    def reset(self, worker_type: str):
        if (worker_type == "evaluation"):
            self.time_threshold = (self.max_time - self.min_time) / self.total_permutation
            self.time_threshold_step = (self.max_time - self.min_time) / self.total_permutation

    def below_time_threshold(self, t: float) -> bool:
        """
        Return True if the current time value is below a prescribed threshold
        """
        return t < self.time_threshold

    def get_n_components(self) -> int:
        """
        Return the number of components to manage
        """
        return self.total_n_components

    def choose_component_set(self, remained_permutations, permutations):
        """
        Randomely select one set of all possible permutation of components as active components in the layer
        """
        active_comps = []
        if len(remained_permutations) == 0:
            remained_permutations = copy.deepcopy(permutations)
        random_choice = random.choice(remained_permutations)
        idx = remained_permutations.index(random_choice)
        remained_permutations.pop(idx)
        active_comps = random_choice
        choice_index = permutations.index(random_choice)
        return np.array(active_comps), remained_permutations, choice_index

    def get_components(self, t: float, worker_type, remained_permutations, permutations, current_components) -> np.array:
        """
        Return the list of components indices to manage according to the current
        time value
        """
        current_configuration_index = 0
        if worker_type == "training":
            active_comps, remained_permutations, current_configuration_index = self.choose_component_set(remained_permutations, permutations)
            return active_comps, remained_permutations, current_configuration_index
        elif worker_type == "evaluation":
            active_comps = []
            if len(remained_permutations) == 0:
                remained_permutations = copy.deepcopy(permutations)
            active_comps = remained_permutations[0]
            remained_permutations.pop(0)
            current_configuration_index = permutations.index(active_comps)
            return np.array(active_comps), remained_permutations, current_configuration_index
            
        else: #should never come here, leaving just because of legacy
            if t < self.time_threshold:
                current_configuration_index = permutations.index(current_components)
                return current_components, remained_permutations, current_configuration_index
            else:
                active_comps, remained_permutations = self.choose_component_set(remained_permutations, permutations)
                self.time_threshold += self.time_threshold_step
                if self.time_threshold > self.max_time:
                    self.time_threshold = self.time_threshold_step
                current_configuration_index = permutations.index(active_comps)
                return np.array(active_comps), remained_permutations, current_configuration_index

    def get_components_demand(self, components: np.array) -> np.array:
        """
        Return the demand of the given components
        """
        return np.array([self.demand[i] for i in components])

    def get_transition_probabilities(self, components: np.array) -> np.array:
        """
        Get the transition probabilities among the given components
        """
        matrix = []
        for i in components:
          row = []
          for j in components:
            row.append(self.transition_probabilities[i,j])
          matrix.append(row)
        return np.array(matrix)

    def get_components_data(
        self, t: float
      ) -> Tuple[np.array, np.array, np.array]:
        """
        Get the components to manage and the associated data
        """
        # get list of components to manage
        components = self.get_components(t)
        # get data associated to the components to manage
        demands = self.get_components_demand(components)
        probabilities = self.get_transition_probabilities(components)
        return components, demands, probabilities
