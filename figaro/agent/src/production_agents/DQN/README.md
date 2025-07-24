# DQN Production Agent
This directory contains the implementation of a system to reload a pretrained DQN agent in a production environment.
## Overview
In order to reload it, you should have a pretrained checkpoint, consisting of the following files:
- `algo_state.pkl`: The pickle with the state of the algorithm.
- `policy_model_weights.pt`: The weights of the model.

## API
Running the system (you can run it with) the docker-compose after putting the checkpoint in `src/production_agents/DQN/configuration_files/checkpoints`:
- make sure that `agent.reload_from_checkpoint(checkpoint_path)` is called with the correct path to the checkpoint.
- `/set_epsilon`: By default, epsilon is set to 0 (for exploitation). This endpoint allows to switch between exploration and exploitation, and it accepts a POST request with:
    - `start`: The starting value of epsilon.
    - `end`: The ending value of epsilon.
    - `schedule_timesteps`: The number of timesteps over which to decay epsilon.
- `/action`: This endpoint accepts a POST request with the current state of the environment and returns the action to be taken by the agent.
- `/learn`: This endpoint accepts a POST request with the a set of tuples containing:
    - `observation`: The state of the environment with keys ["n_instances", "pressure", "queue_length_dominant", "utilization", "workload"].
    - `action`: The action taken by the agent;
    - `reward`: The reward received from the environment;
    - `next_observation`: The next state of the environment.