from ray.rllib.evaluation import Episode, RolloutWorker
from ray.rllib.utils import merge_dicts
from ray.rllib.policy import Policy
from ray.rllib.env import BaseEnv
from typing import Dict
import json

from RL4CC.callbacks.base_callbacks_for_plots import BaseCallbacksForPlots
from ray.rllib.evaluation import Episode, RolloutWorker
from ray.rllib.policy.sample_batch import SampleBatch
from ray.rllib.policy import Policy
from typing import Dict, Tuple
from ray.rllib.algorithms.algorithm import Algorithm
import numpy as np
import pickle
import os
from ray.rllib.env import BaseEnv

class CustomCallbacks(BaseCallbacksForPlots):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.RELEVANT_KEYS = [
            "current_time",
            "n_instances",
			"workload",
			"previous_workload",
			"utilization",
			"pressure",
			"queue_length_dominant",
			"response_time",
			"threshold",
			"delay",
			"reward",
            "demand",
            "violation",
            "total_violations",
            "action",
            "n_instances_difference",
            "space4air_vm_choice",
            "current_configuration_index"
        ]

        self.current_iteration = 0

        self.rewards = []

    def on_evaluate_start(
            self,
            *,
            algorithm: Algorithm,
            **kwargs):
        def make_update_env_fn():
            def update_env_conf(env):
                env.worker_type = "evaluation"
                #env.training_iteration_index = env.bc_iterations

            def update_env_fn(worker):
                worker.foreach_env(update_env_conf)
            return update_env_fn

        algorithm.evaluation_workers.foreach_worker(
            make_update_env_fn()
        )

    def on_evaluate_end(self, *, algorithm: Algorithm, evaluation_metrics: Dict, **kwargs) -> None:
        #set average difference to true only if the amount of elements with a difference greater than 1 is less than 10% of the total amount of elements
        average_difference_valid = 0
        validity_threshold = 0.95
        overall_difference_threshold = 1.0
        len_all_differences = 0
        len_valid_differences = 0
        overall_n_instances_difference = []
        for configuration in range(len(evaluation_metrics["evaluation"]["custom_metrics"]["n_instances_difference"])):
            if (evaluation_metrics["evaluation"]["custom_metrics"]["n_instances_difference"][configuration] != []):
                len_all_differences += len(evaluation_metrics["evaluation"]["custom_metrics"]["n_instances_difference"][configuration])
                len_valid_differences += len([x for x in evaluation_metrics["evaluation"]["custom_metrics"]["n_instances_difference"][configuration] if abs(x) <= 1])
                overall_n_instances_difference.extend(evaluation_metrics["evaluation"]["custom_metrics"]["n_instances_difference"][configuration])

        overall_difference_mean = round(np.mean(np.abs(overall_n_instances_difference)), 1)
        if len_valid_differences / len_all_differences > validity_threshold and overall_difference_mean < overall_difference_threshold:
            average_difference_valid = 1
        else:
            average_difference_valid = 0
            
        with open(f"{algorithm.logdir}/exp_progress.json", "r") as f:
            exp_progress = json.load(f)
        if not "custom_metrics" in exp_progress.keys():
            exp_progress["custom_metrics"] = {}
            exp_progress["custom_metrics"]["average_vm_difference"] = []
        else:
            if not "average_vm_difference" in exp_progress["custom_metrics"].keys():
                exp_progress["custom_metrics"]["average_vm_difference"] = []
        exp_progress["custom_metrics"]["average_vm_difference"].append(average_difference_valid)
        if len(exp_progress["custom_metrics"]["average_vm_difference"]) > 5:
            exp_progress["custom_metrics"]["average_vm_difference"].pop(0)
        os.makedirs(f"{algorithm.logdir}/custom_metrics", exist_ok=True)
        with open(f"{algorithm.logdir}/exp_progress.json", "w") as f:
            json.dump(exp_progress, f, indent=4)

    def on_episode_created(self, *, worker, **kwargs):

        if not worker.env.worker_type == "evaluation":
            #if "training" in worker.env.file_name:
            #    worker.env.file_name = worker.env.file_name.replace("training", "validation")
            worker.env.worker_type = "training"

    def on_postprocess_trajectory(
        self,
        *,
        worker: RolloutWorker,
        episode: Episode,
        agent_id: str,
        policy_id: str,
        policies: Dict[str, Policy],
        postprocessed_batch: SampleBatch,
        original_batches: Dict[str, Tuple[Policy, SampleBatch]],
        **kwargs,
    ):
        super().on_postprocess_trajectory(
            worker=worker,
            episode=episode,
            agent_id=agent_id,
            policy_id=policy_id,
            policies=policies,
            postprocessed_batch=postprocessed_batch,
            original_batches=original_batches,
            **kwargs,
        )
        env_config = worker.env.__dict__

        if type(env_config) == dict and 'space4air_agent' in env_config and env_config['space4air_agent']:
            batches_path = 'space4air_sample_batches/' + 'demand' + '|'.join(str(s) for s in env_config['demand']) + '_threshold' + str(env_config['min_threshold_ratio']) + '|' + str(env_config['max_threshold_ratio'])
            filenames = []
            id_last = -1
            if os.path.exists(batches_path):
                filenames = [filename for filename in os.listdir(batches_path)]
                if len(filenames) > 0:
                    filenames = [int(filename.split('_')[-1].split('.')[0]) for filename in filenames]
                    sorted_filenames = sorted(filenames)
                    id_last = sorted_filenames[-1]
            else :
                os.makedirs(batches_path)
            if id_last < 1000:
                save_object(postprocessed_batch, f'{batches_path}/sample_batch_{id_last + 1}.pkl')



    def on_episode_step(
            self,
            *,
            worker: RolloutWorker,
            base_env: BaseEnv,
            policies: Dict[str, Policy],
            episode: Episode,
            env_index: int,
            **kwargs,
    ):
        super().on_episode_step(base_env=base_env,worker=worker, policies=policies, episode=episode, env_index=env_index)
        min_duration = 360
        if worker.env.worker_type != "evaluation":
            last_violation = episode.last_info_for()["violation"]
            current_folder = worker.env.current_folder
            with open(f"{current_folder}/exp_progress.json", "r") as f:
                exp_progress = json.load(f)
            if not "custom_metrics" in exp_progress.keys():
                exp_progress["custom_metrics"] = {}
                exp_progress["custom_metrics"]["last_violations"] = []
            exp_progress["custom_metrics"]["last_violations"].append(last_violation)
            if len(exp_progress["custom_metrics"]["last_violations"]) > min_duration:
                exp_progress["custom_metrics"]["last_violations"].pop(0)
                percentage_of_violations = len([x for x in exp_progress["custom_metrics"]["last_violations"] if x == True]) / min_duration
            else:
                percentage_of_violations = 100
            if percentage_of_violations <= 0.1:
                exp_progress["custom_metrics"]["valid_violations"] = True
            else:
                exp_progress["custom_metrics"]["valid_violations"] = False
            os.makedirs(f"{current_folder}/custom_metrics", exist_ok=True)
            with open(f"{current_folder}/exp_progress.json", "w") as f:
                json.dump(exp_progress, f, indent=4)
                
        worker.env.set_training_iteration_index(self.current_iteration)
        self.current_iteration += 1
        
        ### ONLY FOR TUNING ###
        
        # if "reward" in episode.last_info_for():
        #     self.rewards.append(episode.last_info_for()["reward"])
        #     with open(f"/home/cavadini/figaro-on-rl4cc/tuning-rewards.json", "w") as f:
        #         json.dump(self.rewards, f)

    def on_train_result(self, *, algorithm, result: Dict, **kwargs):
        super().on_train_result(algorithm=algorithm, result=result, **kwargs)
        ### ONLY FOR TUNING ###
        # if os.path.exists(f"/home/cavadini/figaro-on-rl4cc/tuning-rewards.json"):
        #     with open(f"/home/cavadini/figaro-on-rl4cc/tuning-rewards.json", "r") as f:
        #         rewards = json.load(f)
        #         result["reward"] = rewards[-1]
        # else:
        #     print("rewards file not found")


        custom_metrics_found = False
        if (
        "env_runners" in result.keys() and 
            "custom_metrics" in result["env_runners"].keys()
        ):
            custom_metrics = result["env_runners"]["custom_metrics"]
            custom_metrics_found = True
        elif (
            "custom_metrics" in result.keys() and 
            len(result["custom_metrics"].keys()) > 0
        ):
            custom_metrics = result["custom_metrics"]
            custom_metrics_found = True
        else:
            result["callback_ok"] = False


        return

def save_object(obj, filename):
    with open(filename, 'wb') as outp:  # Overwrites any existing file.
        pickle.dump(obj, outp, pickle.HIGHEST_PROTOCOL)
