import pandas as pd
import matplotlib.pyplot as plt

def parse_log(log):
    # Read the log file into a DataFrame
    df = pd.read_csv(log)

    # Convert the timestamp to datetime
    df['timestamp'] = pd.to_datetime(df['timestamp'])

    # Set the timestamp as the index
    df.set_index('timestamp', inplace=True)

    # Create a plot for each metric and save it
    metrics = ['workload', 'pressure', 'queue_length', 'utilization', 'action']
    for metric in metrics:
        plt.figure()
        df[metric].plot(title=f'{metric.capitalize()} Over Time')
        plt.xlabel('Timestamp')
        plt.ylabel(metric.capitalize())
        plt.grid()
        plt.savefig(f'plots/{metric}_plot.png')
        plt.close()

    # Resample the data to 1-minute intervals and fill missing values with forward fill
    df_resampled = df.resample('1T').ffill()

    # Calculate the average workload, pressure, queue length, utilization, and number of instances
    avg_workload = df_resampled['workload'].mean()
    avg_pressure = df_resampled['pressure'].mean()
    avg_queue_length = df_resampled['queue_length'].mean()
    avg_utilization = df_resampled['utilization'].mean()
    avg_action = df_resampled['action'].mean()

    return {
        'avg_workload': avg_workload,
        'avg_pressure': avg_pressure,
        'avg_queue_length': avg_queue_length,
        'avg_utilization': avg_utilization,
        'avg_action': avg_action
    }

# Example usage 
log = open('logs/log-20250512-144417.csv', 'r')
metrics = parse_log(log)
print(metrics)
log.close()