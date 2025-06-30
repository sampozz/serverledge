import os
import json

import matplotlib.pyplot as plt
from RL4CC.experiments.train_with_plots import TrainingExperimentWithPlots
from src.space4air import Space4Air

class CustomTrainingExperiment(TrainingExperimentWithPlots):
    def __init__(self, config):
        super().__init__(config)
        if self.logdir:
            self.env_config['logdir'] = self.logdir
            
        if self.exp_config.get('experiment_general_output_folder', False):
            self.env_config['experiment_general_output_folder'] = self.exp_config['experiment_general_output_folder']
            
        if self.env_config is not None:
            self.space4air_agent = self.env_config.get("space4air_agent", False)
            self.compare_to_space4air = self.env_config.get("compare_to_space4air", False)
            self.state_has_to_be_normalized = self.env_config.get("state_has_to_be_normalized", False)
        else:
            self.space4air_agent = False
            self.compare_to_space4air = False
            self.state_has_to_be_normalized = False

        if self.env_config.get('compare_to_space4air', False):
            self.space4air = Space4Air()
            self.space4air_choices = {}
            self.run_space4air()
            self.space4air_choices = self.space4air.get_space4air_choices()
            self.env_config['space4air_choices'] = self.space4air_choices
            compatible_configurations = self.env_config.get("compatible_configurations", [[0]])
            self.ray_config['evaluation']['evaluation_duration_per_worker'] = len(compatible_configurations)
        

    def run(self):
        algorithm = super().run()
        return algorithm
    
    def on_iteration_start(self, algo, iteration):
        pass
    
    def execute_before_training(self, algo):
        super().execute_before_training(algo)
    
    def manage_custom_metrics_keys(self):
        if 'current_time' in self.custom_metrics_keys:
            self.custom_metrics_keys.remove('current_time')
        if 'worker_index' in self.custom_metrics_keys:
            self.custom_metrics_keys.remove('worker_index')


    def plot_results(self, result):
        super().plot_results(result)
        space4air_vm_choices = result.get('evaluation', {}).get('custom_metrics', {}).get('space4air_vm_choice', None)
        if not self.space4air_agent and self.compare_to_space4air and space4air_vm_choices and (len(space4air_vm_choices) > 0) is not None:
            self.compare_to_space4air_plot(result, space4air_vm_choices)

        return

    def run_space4air(self):
        self.logdir = os.path.normpath(self.logdir)
        folder_path, experiment_name = self.logdir.rsplit("/", 1)
        if not os.path.exists(f"{folder_path}/space4air"):
            self.space4air.execute_space4air(folder_path=folder_path, experiment_name=experiment_name, config=self.env_config)

    def compare_to_space4air_plot(self, result, space4air_vm_choices):
        workload = result.get('evaluation', {}).get('custom_metrics', {}).get('workload', None)
        episodes_this_iter = result.get('evaluation', {}).get('episodes_this_iter', None)
        agent_choices = result.get('evaluation', {}).get('custom_metrics', {}).get('n_instances', None)
        if agent_choices is None or len(agent_choices) == 0 or workload is None or len(workload) == 0:
            print('CUSTOM TRAIN: No agent choices found or workload in evaluation custom_metrics')
            return
        elif episodes_this_iter is None or episodes_this_iter == 0:
            print('CUSTOM TRAIN: No episodes_this_iter found in evaluation')
            return
        else:
            for configuration_id in range(episodes_this_iter):
                current_space4air_vm_choices = space4air_vm_choices[configuration_id] #while choosing the evaluations in agents.py, I always go in order
                if isinstance(workload[configuration_id], (list, tuple)):
                    if isinstance(workload[configuration_id][0], (list, tuple)):
                        if self.state_has_to_be_normalized:
                            _workload = [
                                [float(x*self.env_config.get('max_workload', 10)) for x in sublist]
                                for sublist in workload[configuration_id]
                            ]
                        else:
                            _workload = [
                                [float(x) for x in sublist]
                                for sublist in workload[configuration_id]
                            ]
                    else:
                        if self.state_has_to_be_normalized:
                            _workload = [[float(x*self.env_config.get('max_workload', 10)) for x in sublist] for sublist in workload]
                        else:
                            _workload = [
                                [float(x) for x in sublist]
                                for sublist in workload
                            ]
                else:
                    if self.state_has_to_be_normalized:
                        _workload = [float(x*self.env_config.get('max_workload', 10)) for x in workload]
                    else:
                        _workload = [float(x) for x in workload]
                if self.state_has_to_be_normalized:
                    _agent_choices = [int(x[0]*self.env_config.get('max_n_instances', 100)) if isinstance(x, (list, tuple)) else int(x*self.env_config.get('max_n_instances', 100)) for x in agent_choices[configuration_id]]
                else:
                    _agent_choices = [int(x[0]) if isinstance(x, (list, tuple)) else int(x) for x in agent_choices[configuration_id]]

                current_folder = os.path.join(self.plots_folder, "evaluation"+str(result["training_iteration"]), str(configuration_id))

                self.space4air.plot_space4air_comparison(n_instances_agent=_agent_choices, n_instances_s4air=current_space4air_vm_choices, workload=_workload, folder_path=current_folder, max_n_instances=self.env_config.get('max_n_instances', 100))

    def define_stopping_criteria(self):
        """
        Define a `stop()` function to check whether the training loop should be
        terminated, according to the stopping criteria specified in the experiment
        configuration file
        """
        # list possible stopping criteria
        stop_on_max_iter = None
        episode_reward_mean = None
        s4air_difference_threshold = None
        valid_violations = False
        for key, value in self.exp_config["stopping_criteria"].items():
            if key == "max_iterations":
                max_iterations = value
            elif  key == "episode_reward_mean":
                episode_reward_mean = value
            elif key == "s4air_difference":
                s4air_difference_threshold = value
            else:
                raise NotImplementedError(
                f"Stopping criterion `{key}` is not supported"
                )
        stop_criterion = lambda it, reward, s4air_differences, valid_violations: it > max_iterations or reward > episode_reward_mean or (s4air_differences is not None and valid_violations and len(s4air_differences) >= 5 and all(s4air_differences))
        # stop_criterion = lambda it, reward, s4air_differences: it > max_iterations
        self.stop = stop_criterion