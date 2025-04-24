package metrics

import (
	"log"
	"net/http"
	"runtime"

	"github.com/serverledge-faas/serverledge/internal/config"
	"github.com/serverledge-faas/serverledge/internal/node"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

var Enabled bool
var registry = prometheus.NewRegistry()
var nodeIdentifier string

// Global metrics
var (
	// Existing metrics
	CompletedInvocations = promauto.NewCounterVec(prometheus.CounterOpts{
		Name: "sedge_completed_total",
		Help: "The total number of completed function invocations",
	}, []string{"node", "function"})
	ExecutionTimes = promauto.NewHistogramVec(prometheus.HistogramOpts{
		Name:    "sedge_exectime",
		Help:    "Function duration",
		Buckets: durationBuckets,
	},
		[]string{"node", "function"})

	// New metrics
	Pressure = promauto.NewGaugeVec(prometheus.GaugeOpts{
		Name: "sedge_pressure",
		Help: "Response time divided by threshold (pressure metric)",
	}, []string{"node", "function"})

	Workload = promauto.NewGaugeVec(prometheus.GaugeOpts{
		Name: "sedge_workload",
		Help: "Number of requests per second",
	}, []string{"node", "function"})

	QueueLength = promauto.NewGaugeVec(prometheus.GaugeOpts{
		Name: "sedge_queue_length",
		Help: "Current queue length",
	}, []string{"node", "function"})

	CPUUtilization = promauto.NewGauge(prometheus.GaugeOpts{
		Name: "sedge_cpu_utilization",
		Help: "CPU utilization percentage",
	})
)

var durationBuckets = []float64{0.002, 0.005, 0.010, 0.02, 0.03, 0.05, 0.1, 0.15, 0.3, 0.6, 1.0}

func Init() {
	if config.GetBool(config.METRICS_ENABLED, false) {
		log.Println("Metrics enabled.")
		Enabled = true
	} else {
		Enabled = false
		return
	}

	nodeIdentifier = node.NodeIdentifier
	registerGlobalMetrics()

	handler := promhttp.HandlerFor(registry, promhttp.HandlerOpts{
		EnableOpenMetrics: true})
	http.Handle("/metrics", handler)
	err := http.ListenAndServe(":2112", nil)
	if err != nil {
		log.Printf("Listen and serve terminated with error: %s\n", err)
		return
	}
}

// Existing functions
func AddCompletedInvocation(funcName string) {
	if !Enabled {
		return
	}
	CompletedInvocations.With(prometheus.Labels{"function": funcName, "node": nodeIdentifier}).Inc()
}

func AddFunctionDurationValue(funcName string, duration float64) {
	if !Enabled {
		return
	}
	ExecutionTimes.With(prometheus.Labels{"function": funcName, "node": nodeIdentifier}).Observe(duration)
}

// New functions for the requested metrics
func SetPressure(funcName string, responseTime, threshold float64) {
	if !Enabled || threshold == 0 {
		return
	}
	pressure := responseTime / threshold
	Pressure.With(prometheus.Labels{"function": funcName, "node": nodeIdentifier}).Set(pressure)
}

func SetWorkload(funcName string, requestsPerSecond float64) {
	if !Enabled {
		return
	}
	Workload.With(prometheus.Labels{"function": funcName, "node": nodeIdentifier}).Set(requestsPerSecond)
}

func SetQueueLength(funcName string, length float64) {
	if !Enabled {
		return
	}
	QueueLength.With(prometheus.Labels{"function": funcName, "node": nodeIdentifier}).Set(length)
}

func UpdateCPUUtilization() {
	if !Enabled {
		return
	}
	var m runtime.MemStats
	runtime.ReadMemStats(&m)
	CPUUtilization.Set(float64(runtime.NumGoroutine())) // This is a simple proxy for CPU usage, consider using a proper CPU metrics library
}

func registerGlobalMetrics() {
	registry.MustRegister(CompletedInvocations)
	registry.MustRegister(ExecutionTimes)
	registry.MustRegister(Pressure)
	registry.MustRegister(Workload)
	registry.MustRegister(QueueLength)
	registry.MustRegister(CPUUtilization)
}
