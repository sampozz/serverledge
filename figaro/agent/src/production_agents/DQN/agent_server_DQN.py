import os
import ray
from production_agent_DQN import ProductionAgentDQN
from ray.rllib.models import ModelCatalog
from ray.rllib.policy.sample_batch import SampleBatch, MultiAgentBatch
from RL4CC.models.custom_torch_model import CustomTorchModel

import flask
import numpy as np
from flask import request
import json

# Here we connect to the Ray Cluster on the Host
# to start the ray cluster, run the following command:
# ray start --head --dashboard-host 0.0.0.0 --port=6379 --ray-client-server-port=10001
ray_address = os.getenv("RAY_ADDRESS", "ray://localhost:10001")
# ray.init(address=ray_address, ignore_reinit_error=True)
ray.init(local_mode = True)
ModelCatalog.register_custom_model("custom_torch_model", CustomTorchModel)

app = flask.Flask(__name__)

checkpoint_path = "/app/trained_checkpoint"
parameters_path = "/app/agents_parameters.json"


# Load the parameters: 
# 1) Whether to reset the agent state (Learning rate schedule, exploration schedule) or not
# 2) Explore when computing the actions or purely exploit
with open(parameters_path, 'r') as file:
    parameters = json.load(file)

if "rllib_checkpoint.json" in os.listdir(checkpoint_path):
    with open(os.path.join(checkpoint_path, "rllib_checkpoint.json"), 'r') as file:
        content = json.load(file)
        
reset_state = False #TODO: check if we actually ever need this or we just use the endpoint
agent = ProductionAgentDQN(checkpoint_path=checkpoint_path, reset_state=reset_state)

@app.route('/action', methods=['POST'])
def action():
    # Get the json containing the observation
    print("Received a request for action.")
    data = json.loads(request.get_data().decode("utf-8"))
    obs = data['observation']
    exploration = data.get('explore', False)

    # Prepare the observation in a format suited for the Agent
    obs_for_agent = {
        "n_instances": np.array([obs['n_instances']]),
        "pressure": np.array([obs['pressure']]),
        "queue_length_dominant": np.array([obs['queue_length_dominant']]),
        "utilization": np.array([obs['utilization']]),
        "workload": np.array([obs['workload']])
    }

    # We use the Policy to compute the action given the current state
    action = agent.compute_single_action(obs_for_agent, explore=exploration)

    return json.dumps({"action": int(action) + 1})


def stack_features(data, keys):
    """Returns np.array of shape (batch_size, num_features)"""
    return np.stack([
        np.array([obs[k] for obs in data]) for k in keys
    ], axis=1)

@app.route('/learn', methods=['POST'])
def learn():
    print("Received a request for learning.")
    data = json.loads(request.get_data().decode("utf-8"))

    obs_keys = ["n_instances", "pressure", "queue_length_dominant", "utilization", "workload"]
    batch_size = len(data["observations"])

    # Stack each observation set into (batch_size, num_features)
    observations = stack_features(data["observations"], obs_keys)
    next_observations = stack_features(data["next_observations"], obs_keys)

    sample_batch = SampleBatch({
        SampleBatch.OBS: observations,
        SampleBatch.NEXT_OBS: next_observations,
        SampleBatch.ACTIONS: np.array(data["actions"]),
        SampleBatch.REWARDS: np.array(data["rewards"]),
        SampleBatch.TERMINATEDS: np.array([False for _ in range(len(observations))]),
        SampleBatch.TRUNCATEDS: np.array([False for _ in range(len(observations))]),
        SampleBatch.INFOS: np.array([{} for _ in range(len(observations))]),
        SampleBatch.EPS_ID: np.array([1234 for _ in range(len(observations))]),
        SampleBatch.UNROLL_ID: np.array([_+1 for _ in data["timesteps"]]),
        SampleBatch.AGENT_INDEX: np.array([0 for _ in range(len(observations))]),
        SampleBatch.T: np.array(data["timesteps"]).reshape(-1),
        'weights': np.array([1.0 for _ in range(len(observations))])
    })

    wrapped_batch = MultiAgentBatch(
        policy_batches={"default_policy": sample_batch},
        env_steps=sample_batch.count,
    )

    update_info = agent.training_step(wrapped_batch)

    return json.dumps({"message": "Policy updated with new experiences."})

@app.route("/set_epsilon", methods=["POST"])
def set_epsilon():
    try:
        data = json.loads(request.get_data().decode("utf-8"))
        print('Received a request to set epsilon.')
        epsilon = float(data.get("epsilon", 0.5))
        schedule_timesteps = int(data.get("schedule_timesteps", 1000))
        agent.set_epsilon(epsilon, schedule_timesteps)
        return json.dumps({"message": f"Epsilon set to {epsilon} with schedule_timesteps {schedule_timesteps}"}), 200
    except Exception as e:
        return json.dumps({"error": str(e)}), 400
    
@app.route('/save_checkpoint', methods=['POST'])
def save_checkpoint():
    try:
        print("Received a request to save the checkpoint.")
        data = json.loads(request.get_data().decode("utf-8"))
        timestep = data.get("timestep", "/app/no_timestep")
        checkpoint_path = agent.save_checkpoint(f"/app/trained_checkpoint/temp_checkpoint_{timestep}")
        return json.dumps({"message": f"Checkpoint saved to {checkpoint_path}"}), 200
    except Exception as e:
        return json.dumps({"error": str(e)}), 500


@app.route('/shutdown', methods=['POST'])
def shutdown():
    ray.shutdown()
    return json.dumps({"message": "Executed 'ray.shutdown()'."})

if __name__ == '__main__':
    app.run(host='localhost', port=5959, debug=True)