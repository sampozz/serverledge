import os
import torch
import random
import cloudpickle
import numpy as np
# from ray.tune.registry import register_env
# from src.production_agents.DQN.scaling_env import ScalingEnv 
# register_env("scaling_env", lambda config: ScalingEnv(config))

from ray.rllib.policy.sample_batch import SampleBatch, MultiAgentBatch, concat_samples

class LinearEpsilonScheduler:
    def __init__(self, start: float = 0, end: float = 0, duration: int = 0):
        self.start = start
        self.end = end
        self.duration = duration

    def get(self, timestep: int) -> float:
        if self.duration <= 0:
            return self.start
        if timestep >= self.duration:
            return self.end
        epsilon = self.start + (self.end - self.start) * (timestep / self.duration)
        return epsilon

class ProductionAgentDQN:
    def __init__(self):
        self.current_timestep = 0
        self.epsilon_scheduler = LinearEpsilonScheduler()
        self.online_replay_buffer = []
        
    def reload_from_checkpoint(self, checkpoint_path: str):
        """
        Load the algorithm state and model weights from a checkpoint.
        Args:
            checkpoint_path (str): Path to the directory containing the checkpoint files.
        """
        checkpoint_file = os.path.join(checkpoint_path, "algo_state.pkl")
        model_path = os.path.join(checkpoint_path, "policy_model_weights.pt")

        with open(checkpoint_file, "rb") as f:
            print("Loading algorithm state from:", checkpoint_file)
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
        self.algo.get_policy().update_target()
        
        policy = self.algo.get_policy()
        weights = policy.model.state_dict()
        print("sample weight from policy.model:")
        for k, v in weights.items():
            print(f"{k}: mean={v.float().mean().item():.6f}, std={v.float().std().item():.6f}")
            break
        
        policy = self.algo.get_policy()
        policy.model.load_state_dict(torch.load(model_path))
        print("manually restored model weights from", model_path)
        
        weights = policy.model.state_dict()
        print("sample weight from policy.model after loading:")
        for k, v in weights.items():
            print(f"{k}: mean={v.float().mean().item():.6f}, std={v.float().std().item():.6f}")
            break
        
        print("Algorithm state loaded successfully.", flush=True)
        
        batch_size = self.algo.config["train_batch_size"]
        self.max_online_buffer_size = batch_size * 4  # 4x the train batch size
        self.min_online_samples = batch_size // 2  # at least half the train batch size should come from online samples

        if "replay_buffer_state" in algo_state:
            try:
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

    def set_epsilon(self, start: float = 0, end: float = 0, schedule_timesteps: int = 0):
        """
        Fully reset epsilon and its schedule parameters in the policy.

        Args:
            epsilon (float): The epsilon value to use (both initial and current).
            schedule_timesteps (int): Number of timesteps over which epsilon decays.
        """        
        print(f"Setting epsilon: start={start}, end={end}, schedule_timesteps={schedule_timesteps}")
        self.epsilon_scheduler = LinearEpsilonScheduler(start=start, end=end, duration=schedule_timesteps)
        self.current_timestep = 0
        print(f"Epsilon set to {start}, decaying to {end} over {schedule_timesteps} timesteps.")

            
    @property
    def policy(self):
        return self.algo.get_policy()
    
    @property
    def epsilon(self):
        return self.epsilon_scheduler.get(self.current_timestep)

    def take_action(self, obs: dict):
        """Manual epsilon-greedy: with probability epsilon, act randomly."""
        policy = self.algo.get_policy()
        action_space = policy.action_space

        if np.random.rand() < self.epsilon and self.epsilon > 0:
            # explore
            action = action_space.sample()
        else:
            # exploit
            action = self.algo.compute_single_action(obs, explore=False)
        
        self.current_timestep += 1
        return action

    def training_step(self, new_sample_batch: MultiAgentBatch):
        try:
            print("Received new sample batch for training:", new_sample_batch.count, "samples.")
            batch_size = 32
            self.online_replay_buffer.append(new_sample_batch.policy_batches["default_policy"])
            train_stats = []
            for _ in range(20):
                # randomly sample a batch from the online replay buffer
                batch_to_train = random.choices(self.online_replay_buffer, k=batch_size)
                train_batch = concat_samples(batch_to_train)
                print("Training on batch of size:", train_batch.count)
                train_results = self.policy.learn_on_batch(train_batch)
                train_stats.append(train_results.get("learner_stats", {}))
            
            self.policy.update_target()
            print("Training steps completed successfully.")
            return {"trained": True, "stats": train_stats}
        except Exception as e:
            print(f"Error during training step: {e}")
            return {"trained": False, "error": str(e)}
            
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
            
        model_path = os.path.join(path, "policy_model_weights.pt")
        policy = self.algo.get_policy()
        torch.save(policy.model.state_dict(), model_path)
            
        return checkpoint_path