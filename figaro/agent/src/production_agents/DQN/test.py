import requests
import numpy as np
import json

def random_obs():
    return {
       "n_instances": int(np.random.randint(1, 20)),
       "pressure": float(np.random.uniform(0.1, 1.0)),
       "queue_length_dominant": float(np.random.uniform(0.0, 1.0)),
       "utilization": float(np.random.uniform(0.0, 1.0)),
       "workload": float(np.random.randint(5, 20))
    }

def flatten_obs(obs_dict):
    return np.concatenate([v for v in obs_dict.values()])

learn_dict = {
    "observations": [],
    "actions": [],
    "rewards": [],
    "next_observations": [],
    "timesteps": []
}

def random_obs():
    return {
       "n_instances": int(np.random.randint(1, 7)),
       "pressure": float(np.random.uniform(0.1, 2.5)),
       "queue_length_dominant": float(np.random.uniform(0.1, 1.0)),
       "utilization": float(np.random.uniform(0.0, 1.0)),
       "workload": float(np.random.uniform(0, 1))}

# Notice that random_obs produces values without any logic (i.e. in theory if we have high utilization, that we would expect high values for pressure/queue_length_dominant/workload as well) but at least we are able to visualize that the agent works!

for i in range(100):

    print(f"\n{'=' * 15} Observation #{i+1} {'=' * 15}")
    
    observation = random_obs()
    
    # Pretty-print the observation dictionary
    print("Observation:")
    print(json.dumps(observation, indent = 4))
    
    try:
        
        response = requests.post('http://localhost:5100/action', json={'observation': observation})
        print("Response:")
        print(json.dumps(response.json(), indent = 4))

    except Exception as e:
        print("Request failed:", str(e))

observation = random_obs()
response = requests.post('http://127.0.0.1:5100/action', json={'observation': observation})
response.json()

response = requests.post('http://localhost:5000/shutdown')
print(response.json())

for i in range(10):
    observation = random_obs()
    response = requests.post('http://localhost:5000/action', json={'observation': observation})
    action = response.json()['action']
    reward = np.random.uniform(0, 1)
    next_observation = random_obs()
    obs = [v for v in observation.values()]
    next_obs = [v for v in next_observation.values()]
    learn_dict['observations'].append(obs)
    learn_dict['actions'].append(action)
    learn_dict['rewards'].append(reward)
    learn_dict['next_observations'].append(next_obs)
    learn_dict['timesteps'].append(i)

print('learn dict dimensions:', len(learn_dict['observations']), len(learn_dict['actions']), len(learn_dict['rewards']), len(learn_dict['next_observations']), len(learn_dict['timesteps']))
print('obs dimensions:', len(learn_dict['observations'][0]), len(learn_dict['next_observations'][0]))

response = requests.post('http://localhost:5000/learn', json=learn_dict)
print(response.json())

len(learn_dict["observations"])