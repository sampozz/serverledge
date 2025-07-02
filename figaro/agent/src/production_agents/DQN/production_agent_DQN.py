import os
import numpy as np
import cloudpickle
from ray.rllib.policy.sample_batch import SampleBatch, MultiAgentBatch, concat_samples
from ray.rllib.algorithms.algorithm import Algorithm

class ProductionAgentDQN:

    def __init__(self, checkpoint_path: str, reset_state: bool = False):
        checkpoint_file = os.path.join(checkpoint_path, "algo_state.pkl")

        with open(checkpoint_file, "rb") as f:
            algo_state = cloudpickle.load(f)

        algo_cls = algo_state["algorithm_class"]
        config = algo_state["config"]
        state = algo_state["state"]
        
        config["create_env_on_driver"] = False
        config["disable_env_checking"] = True
        config["callbacks"] = None
        
        self.algo = algo_cls(config=config)
        # setup all algorithm components (including replay buffer)
        self.algo.setup(config=config)
        self.algo.__setstate__(state)
        
        self.online_batch_buffer = []
        batch_size = self.algo.config["train_batch_size"]
        self.max_online_buffer_size = batch_size * 4  # 4x the train batch size
        self.min_online_samples = batch_size // 2  # at least half the train batch size should come from online samples

        if "replay_buffer_state" in algo_state:
            try:
                print("Restoring replay buffer state...")
                replay_buffer = self.algo.local_replay_buffer
                old_state = algo_state["replay_buffer_state"]
                if replay_buffer is not None:
                    # wrap SampleBatches as MultiAgentBatches
                    if isinstance(old_state["_storage"], list):
                        wrapped = []
                        for sample in old_state["_storage"]:
                            if isinstance(sample, SampleBatch):
                                wrapped.append(MultiAgentBatch({"default_policy": sample}, sample.count))
                            elif isinstance(sample, MultiAgentBatch):
                                wrapped.append(sample)
                            else:
                                raise ValueError(f"Unexpected batch type: {type(sample)}")
                        old_state["_storage"] = wrapped
                    replay_buffer.set_state(old_state)
            except Exception as e:
                print(f"Warning: Replay buffer could not be restored: {e}")

        if reset_state:
            policy = self.algo.get_policy()
            state = policy.get_state()
            state.setdefault("_exploration_state", {})["last_timestep"] = 0
            state["global_timestep"] = 0
            for var in state.get("_optimizer_variables", []):
                var["state"] = {}
            policy.set_state(state)
            
    def set_epsilon(self, epsilon: float, schedule_timesteps: int = 10000):
        """
        Fully reset epsilon and its schedule parameters in the policy.

        Args:
            epsilon (float): The epsilon value to use (both initial and current).
            schedule_timesteps (int): Number of timesteps over which epsilon decays.
        """
        
        policy = self.algo.get_policy()
        
        print(f"Current exploration state: {policy.get_state().get('_exploration_state', {})}")

        # Update the epsilon schedule (if it exists)
        if hasattr(policy.exploration, "epsilon_schedule"):
            schedule = policy.exploration.epsilon_schedule
            schedule.schedule_timesteps = schedule_timesteps
            schedule.initial_p = epsilon

        # Safely modify the internal exploration state
        state = policy.get_state()
        exploration_state = state.get("_exploration_state", {})
        exploration_state["cur_epsilon"] = epsilon
        exploration_state["last_timestep"] = 0
        state["_exploration_state"] = exploration_state

        # Set updated state back to the policy
        policy.set_state(state)
            
    @property
    def policy(self):
        return self.algo.get_policy()

    def compute_single_action(self, obs: dict, explore: bool = False):
        """Returns an action using the algorithm (which wraps the policy and exploration logic)."""
        return self.algo.compute_single_action(obs, explore=explore)

    def training_step(self, new_sample_batch: MultiAgentBatch):
        # Validate replay buffer exists
        replay_buffer = self.algo.local_replay_buffer
        if replay_buffer is None:
            raise RuntimeError("No local replay buffer found in algorithm.")

        # Add new batch to replay buffer
        replay_buffer.add(new_sample_batch)
        
        default_policy_batch = new_sample_batch.policy_batches.get("default_policy")
        # if default_policy_batch:
        #     print("Sample batch sample:")
        #     for key, value in default_policy_batch.items():
        #         print(f"{key}: shape={value.shape if hasattr(value, 'shape') else len(value)}, dtype={value.dtype if hasattr(value, 'dtype') else type(value)}")

        # Process online samples
        default_policy_batch = new_sample_batch.policy_batches.get("default_policy")
        if not default_policy_batch:
            return {"trained": False}

        self.online_batch_buffer.append(default_policy_batch)
        if len(self.online_batch_buffer) > self.max_online_buffer_size:
            self.online_batch_buffer.pop(0)

        # Combine online batches
        combined_online_batch = concat_samples(self.online_batch_buffer)
        online_count = combined_online_batch.count

        # Handle minimum online samples requirement
        if online_count < self.min_online_samples:
            # More efficient replication using np.tile for array data
            replication_factor = int(np.ceil(self.min_online_samples / online_count))
            replicated_batch = SampleBatch({
                k: np.tile(v, (replication_factor, *((1,) * (v.ndim - 1))))[:self.min_online_samples]
                for k, v in combined_online_batch.items()
            })
            combined_online_batch = replicated_batch

        # Prepare final training batch
        train_batch_size = self.algo.config["train_batch_size"]
        offline_needed = max(0, train_batch_size - combined_online_batch.count)

        try:
            if offline_needed > 0:
                offline_batch = replay_buffer.sample(offline_needed).policy_batches.get("default_policy")
                if not offline_batch:
                    return {"trained": False}
                final_batch = concat_samples([combined_online_batch, offline_batch])
            else:
                final_batch = combined_online_batch.slice(0, train_batch_size)

            # Validate final batch
            if final_batch.count != train_batch_size:
                return {"trained": False}

            # Train and update
            policy = self.algo.get_policy("default_policy")
            train_results = policy.learn_on_batch(final_batch)
            policy.update_target()

            return {"trained": True, **train_results.get("learner_stats", {})}

        except Exception as e:
            return {"trained": False}


    def save_checkpoint(self, path: str):
        """Save the full algorithm state, including config and replay buffer."""
        os.makedirs(path, exist_ok=True)
        algo_state = {
            "algorithm_class": self.algo.__class__,
            "config": self.algo.config.to_dict(),
            "state": self.algo.get_state()
        }

        replay_buffer = getattr(self.algo, "local_replay_buffer", None)
        if replay_buffer:
            algo_state["replay_buffer_state"] = replay_buffer.get_state()

        checkpoint_path = os.path.join(path, "algo_state.pkl")
        with open(checkpoint_path, "wb") as f:
            cloudpickle.dump(algo_state, f)
            
        return checkpoint_path