1. Go to the directory Figaro

2. Execute:
   
                     docker build -f src/production_agents/DQN/Dockerfile -t production_agent:latest .   

3. Execute:

                    docker run -p 5100:5000 production_agent


4. Try the notebook `Figaro/src/production_agents/DQN/ray_policy_test.ipynb` (Spoiler: now it works!).

## 📊 Metrics Explanation

| Metric                        | Formula                                                                                     | Description                                                                                                     | Interpretation                                                                                                                                   |
|------------------------------|---------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `n_instances`                | —                                                                                           | Number of active instances of a specific computational resource                                                           | /                                                                                                             |
| `pressure` (p)               | $\Large\frac{R}{\bar{R}}$                                                                      | Indicates how close the system is to violating its response time constraints <br> $R$ = observed response time, $\bar{R}$ = response time threshold.             | - $p < 1$: Within accettable ranges  <br> - $p \geq 1$: Risk of violation                                                                                       |
| `queue_length_dominant` (qld) | $\Large \frac{R_d - D_d}{D_d}$                                                                | Measures queue buildup on the dominant component (the one with the highest pressure) <br> $R_d$ = response time, $D_d$ = demand (service time).            | Higher `qld` implies longer waiting times and potential bottlenecks.                                                                            |
| `utilization` (u)            | $\Large \frac{\sum_{i \in \mathcal{I}} \lambda_i \cdot D_i}{n}$ <br><br> s.c.: $\Large \frac{\lambda \cdot D}{n}$ | Represents the fraction of time each instance is busy processing requests <br> $\lambda_i$ = arrival rate, $D_i$ = demand, $n$ = instances.         | - $u < 1$: Instances are not fully utilized <br> - $u = 1$: Fully utilized <br> - $u > 1$: Overload Condition                                                              |
| `workload`                   | —                                                                                           | Number of requests received per unit of time (e.g. requests per second).                                        | As workload increases, more resources are required to maintain acceptable performance.                                           |
