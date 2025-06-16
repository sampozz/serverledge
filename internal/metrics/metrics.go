package metrics

import (
	"log"
	"net/http"
	"sync"
	"time"

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
	}, []string{"node", "function"})

	// New metrics
	Pressure = promauto.NewGaugeVec(prometheus.GaugeOpts{
		Name: "sedge_pressure",
		Help: "Response time divided by threshold (pressure metric)",
	}, []string{"node", "function"})

	ResponseTime = promauto.NewGaugeVec(prometheus.GaugeOpts{
		Name: "sedge_response_time",
		Help: "Function response time in seconds",
	}, []string{"node", "function"})

	ServiceTime = promauto.NewGaugeVec(prometheus.GaugeOpts{
		Name: "sedge_service_time",
		Help: "Function service time in seconds",
	}, []string{"node", "function"})

	QueueLength = promauto.NewGaugeVec(prometheus.GaugeOpts{
		Name: "sedge_queue_length",
		Help: "Current queue length",
	}, []string{"node", "function"})

	Workload = promauto.NewGaugeVec(prometheus.GaugeOpts{
		Name: "sedge_workload",
		Help: "Requests per second over the last 60 seconds",
	}, []string{"node", "function"})
)

const (
	windowSize  = 6                       // 6 buckets
	bucketSize  = 10                      // 10 seconds per bucket
	windowTotal = windowSize * bucketSize // 60 seconds
)

type workloadData struct {
	counts      [windowSize]int
	currentSlot int
	lastBucket  int
	lastUpdated time.Time
}

var (
	workloadMu sync.Mutex
	workloads  = make(map[string]*workloadData)
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

	StartPeriodicWorkloadUpdates()

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
func SetPressure(funcName string, responseTime float64, threshold float64) {
	if !Enabled || threshold == 0 {
		return
	}
	pressure := responseTime / threshold
	Pressure.With(prometheus.Labels{"function": funcName, "node": nodeIdentifier}).Set(pressure)
}

func SetResponseTime(funcName string, responseTime float64) {
	if !Enabled {
		return
	}
	ResponseTime.With(prometheus.Labels{"function": funcName, "node": nodeIdentifier}).Set(responseTime)
}

func SetServiceTime(funcName string, serviceTime float64) {
	if !Enabled {
		return
	}
	ServiceTime.With(prometheus.Labels{"function": funcName, "node": nodeIdentifier}).Set(serviceTime)
}

func SetQueueLength(funcName string, responseTime float64, demand float64) {
	if !Enabled {
		return
	}
	QueueLength.With(prometheus.Labels{"function": funcName, "node": nodeIdentifier}).Set((responseTime - demand) / demand)
}

func UpdateWorkload(funcName string) {
	if !Enabled {
		return
	}

	now := time.Now()
	bucket := int(now.Unix()) / bucketSize

	workloadMu.Lock()
	defer workloadMu.Unlock()

	data, exists := workloads[funcName]
	if !exists {
		data = &workloadData{
			currentSlot: bucket % windowSize,
			lastBucket:  bucket,
			lastUpdated: now,
		}
		workloads[funcName] = data
	}

	// Advance window if we've moved ahead
	steps := bucket - data.lastBucket
	if steps > 0 {
		for i := 1; i <= steps && i <= windowSize; i++ {
			clearIndex := (data.currentSlot + i) % windowSize
			data.counts[clearIndex] = 0
		}
		data.currentSlot = (data.currentSlot + steps) % windowSize
		data.lastBucket = bucket
	}

	// Record request in current bucket
	data.counts[data.currentSlot]++
	data.lastUpdated = now

	// Compute RPS
	var total int
	for _, c := range data.counts {
		total += c
	}
	rps := float64(total) / float64(windowTotal)

	Workload.With(prometheus.Labels{
		"node":     nodeIdentifier,
		"function": funcName,
	}).Set(rps)
}

// UpdateAllWorkloads updates the workload metrics for all tracked functions
func UpdateAllWorkloads() {
	if !Enabled {
		return
	}

	workloadMu.Lock()
	defer workloadMu.Unlock()

	now := time.Now()
	bucket := int(now.Unix()) / bucketSize

	for funcName, data := range workloads {
		// Advance window if needed
		steps := bucket - data.lastBucket
		if steps > 0 {
			for i := 1; i <= steps && i <= windowSize; i++ {
				clearIndex := (data.currentSlot + i) % windowSize
				data.counts[clearIndex] = 0
			}
			data.currentSlot = (data.currentSlot + steps) % windowSize
			data.lastBucket = bucket
			data.lastUpdated = now
		}

		// Compute and update RPS
		var total int
		for _, c := range data.counts {
			total += c
		}
		rps := float64(total) / float64(windowTotal)

		Workload.With(prometheus.Labels{
			"node":     nodeIdentifier,
			"function": funcName,
		}).Set(rps)
	}
}

// StartPeriodicWorkloadUpdates starts a background routine to periodically update workload metrics
func StartPeriodicWorkloadUpdates() {
	if !Enabled {
		return
	}

	ticker := time.NewTicker(time.Duration(bucketSize) * time.Second)
	go func() {
		for range ticker.C {
			UpdateAllWorkloads()
		}
	}()
}

func registerGlobalMetrics() {
	registry.MustRegister(CompletedInvocations)
	registry.MustRegister(ExecutionTimes)
	registry.MustRegister(Pressure)
	registry.MustRegister(ResponseTime)
	registry.MustRegister(ServiceTime)
	registry.MustRegister(QueueLength)
	registry.MustRegister(Workload)
}
