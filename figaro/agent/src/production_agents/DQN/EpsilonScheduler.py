class LinearEpsilonScheduler:
    def __init__(self, start: float = 0, end: float = 0.01, duration: int = 0):
        """
        Args:
            start (float): Initial epsilon value (e.g., 1.0)
            end (float): Final epsilon value (e.g., 0.01)
            duration (int): Number of timesteps to decay over (e.g., 10000)
        """
        self.start = start
        self.end = end
        self.duration = duration

    def get(self, timestep: int) -> float:
        """
        Returns epsilon at a given timestep.
        If timestep >= duration, returns end value.
        """
        if timestep >= self.duration:
            return self.end
        # Linear interpolation
        epsilon = self.start + (self.end - self.start) * (timestep / self.duration)
        return epsilon
