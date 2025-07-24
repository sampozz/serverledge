import numpy as np
import gymnasium as gym
from gymnasium.spaces import Box, Discrete
from ray.rllib.env.env_context import EnvContext

class ScalingEnv(gym.Env):
    def __init__(self, config: EnvContext = {}):
        self.max_instances = config.get("max_instances", 10)
        self.observation_space = Box(low=0.0, high=1.0, shape=(5,), dtype=np.float32)
        self.action_space = Discrete(self.max_instances + 1)
        self.step_count = 0
        self.max_steps = config.get("max_steps", 50)
        self.curr_obs = self._random_obs()

    def _random_obs(self):
        n_instances = np.random.randint(1, self.max_instances + 1)
        return {
            "n_instances": n_instances / self.max_instances,  # normalized
            "pressure": np.random.uniform(0, 1),
            "queue_length_dominant": np.random.uniform(0, 1),
            "utilization": np.random.uniform(0, 1),
            "workload": np.random.uniform(0, 1),
        }


    def reset(self, *, seed=None, options=None):
        super().reset(seed=seed)
        self.step_count = 0
        self.curr_obs = self._random_obs()
        return self._dict_to_obs(self.curr_obs), {}

    def _dict_to_obs(self, d):
        return np.array([d[k] for k in ["n_instances", "pressure", "queue_length_dominant", "utilization", "workload"]], dtype=np.float32)

    def step(self, action):
        self.step_count += 1

        n_instances = float(action)
        eps = 1e-3
        workload = np.clip(self.curr_obs["workload"], 0.0, 1.0)
        denom = max(n_instances / self.max_instances, eps)
        utilization = np.clip(workload / denom, 0.0, 1.0)
        pressure = np.clip(utilization + np.random.normal(0, 0.05), 0.0, 1.0)
        queue = np.clip(workload - utilization + np.random.normal(0, 0.05), 0.0, 1.0)

        reward = -abs(workload - n_instances / self.max_instances)
        workload = np.clip(workload + np.random.uniform(-0.05, 0.05), 0.0, 1.0)

        self.curr_obs = {
            "n_instances": n_instances / self.max_instances,
            "pressure": pressure,
            "queue_length_dominant": queue,
            "utilization": utilization,
            "workload": workload
        }

        if np.any(np.isnan(list(self.curr_obs.values()))):
            reward = -10.0
            self.curr_obs["workload"] = 0.5

        terminated = False
        truncated = self.step_count >= self.max_steps
        return self._dict_to_obs(self.curr_obs), reward, terminated, truncated, {}