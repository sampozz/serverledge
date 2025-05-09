package workflow

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"sync"
	"time"

	"github.com/serverledge-faas/serverledge/utils"
	clientv3 "go.etcd.io/etcd/client/v3"
)

type PartialDataId string

var pdEtcdMutex = &sync.Mutex{}
var pdCacheMutex = &sync.Mutex{}

func newPartialDataId(reqId ReqId) PartialDataId {
	return PartialDataId("partialData_" + reqId)
}

// PartialData is saved separately from progressData to avoid cluttering the Progress struct and each Serverledge node's cache
type PartialData struct {
	ReqId    ReqId  // request referring to this partial data
	ForTask  TaskId // task that should receive this partial data
	FromTask TaskId // useful for fanIn
	Data     map[string]interface{}
}

var pdCache = sync.Map{}

func (pd PartialData) Equals(pd2 *PartialData) bool {

	if len(pd.Data) != len(pd2.Data) {
		return false
	}

	for s := range pd.Data {
		// we convert the type to string to avoid checking all possible types!!!
		value1 := fmt.Sprintf("%v", pd.Data[s])
		value2 := fmt.Sprintf("%v", pd2.Data[s])
		if value1 != value2 {
			return false
		}
	}

	return pd.ReqId == pd2.ReqId && pd.FromTask == pd2.FromTask && pd.ForTask == pd2.ForTask
}

func (pd PartialData) String() string {
	return fmt.Sprintf(`PartialData{
		Id:    %s,
		ForTask:  %s,
		FromTask: %s,
		Data:     %v,
	}`, pd.ReqId, pd.ForTask, pd.FromTask, pd.Data)
}

func NewPartialData(reqId ReqId, forTask TaskId, fromTask TaskId, data map[string]interface{}) *PartialData {
	return &PartialData{
		ReqId:    reqId,
		ForTask:  forTask,
		FromTask: fromTask,
		Data:     data,
	}
}

func getPartialDataEtcdKey(reqId ReqId, nodeId TaskId) string {
	return fmt.Sprintf("/partialData/%s/%s", reqId, nodeId)
}

func SavePartialData(pd *PartialData, saveAlsoOnEtcd bool) error {
	if saveAlsoOnEtcd {
		err := savePartialDataToEtcd(pd)
		if err != nil {
			return err
		}
	}
	//inCache := savePartialDataInCache(pd)
	//if !inCache {
	//	return errors.New("failed to save partialData in cache")
	//}
	return nil
}

func RetrievePartialData(reqId ReqId, nodeId TaskId, alsoFromEtcd bool) ([]*PartialData, error) {
	// Get from cache if exists, otherwise from ETCD
	partialDatas, err := getPartialDataFromCache(newPartialDataId(reqId), nodeId)
	if err != nil && alsoFromEtcd {
		// cache miss - retrieve partialData from ETCD
		partialDatas, err = getPartialDataFromEtcd(reqId, nodeId)
		if err != nil {
			return nil, fmt.Errorf("partial data not found in cache and in etcd: %v\n", err)
		}
		// insert a new element to the cache
		ok := savePartialDataInCache(partialDatas...)
		if !ok {
			return nil, fmt.Errorf("failed to save in cache a found partial data")
		}
		return partialDatas, nil
	}
	if len(partialDatas) == 0 {
		return nil, fmt.Errorf("partial data are empty")
	}

	return partialDatas, err
}

func RetrieveSinglePartialData(reqId ReqId, nodeId TaskId, alsoFromEtcd bool) (*PartialData, error) {
	pds, err := RetrievePartialData(reqId, nodeId, alsoFromEtcd)
	if err != nil {
		return nil, fmt.Errorf("partial data not found: %v", err)
	} else if len(pds) > 1 {
		return nil, fmt.Errorf("more than one partial data for a simple node")
	}
	return pds[0], nil
}

// RetrieveAllPartialData returns all partial data associated with a request
func RetrieveAllPartialData(reqId ReqId, alsoFromEtcd bool) (*sync.Map, error) {
	partialDataMap := &sync.Map{}
	partialDataFromCache := getAllPartialDataFromCache(newPartialDataId(reqId))
	// pdCacheMutex.Lock()
	partialDataFromCache.Range(func(taskId, slice any) bool {
		partialDataMap.Store(taskId, slice)
		return true
	})
	// pdCacheMutex.Unlock()
	if alsoFromEtcd {
		partialDataFromEtcd, err := getAllPartialDataFromEtcd(reqId)
		if err == nil {
			for taskId, slice := range partialDataFromEtcd {
				partialDataMap.Store(taskId, slice)
			}
		} else {
			return nil, err
		}
	}

	return partialDataMap, nil
}

func NumberOfPartialDataFor(reqId ReqId, alsoFromEtcd bool) int {
	partialDataMap := &sync.Map{}
	partialDataFromCache := getAllPartialDataFromCache(newPartialDataId(reqId))
	partialDataFromCache.Range(func(taskId, slice any) bool {
		partialDataMap.Store(taskId, slice)
		return true
	})
	if alsoFromEtcd {
		partialDataFromEtcd, err := getAllPartialDataFromEtcd(reqId)
		if err == nil {
			for taskId, data := range partialDataFromEtcd {
				partialDataMap.Store(taskId, data)
			}
		}
	}

	count := 0
	partialDataMap.Range(func(key, value any) bool {
		count++
		return true
	})
	return count
}

func DeleteAllPartialData(reqId ReqId, alsoFromEtcd bool) (int64, error) {
	// Remove the partial data from the local cache
	pdCache.Delete(newPartialDataId(reqId))

	// remove the partial data from ETCD
	if alsoFromEtcd {
		cli, err := utils.GetEtcdClient()
		if err != nil {
			return 0, fmt.Errorf("failed to connect to etcd: %v", err)
		}
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		pdEtcdMutex.Lock()
		removed, err := cli.Delete(ctx, getPartialDataEtcdKey(reqId, ""), clientv3.WithPrefix())
		if err != nil {
			pdEtcdMutex.Unlock()
			cancel()
			return 0, fmt.Errorf("failed partialData delete: %v", err)
		}
		cancel()
		pdEtcdMutex.Unlock()
		return removed.Deleted, nil
	}
	return 1, nil
}

// savePartialDataInCache appends in cache a partial data related to a specific request and task in a Workflow
func savePartialDataInCache(pds ...*PartialData) bool {
	var partialDataIdType PartialDataId
	pdCacheMutex.Lock()
	defer pdCacheMutex.Unlock()
	for _, pd := range pds {
		partialDataIdType = newPartialDataId(pd.ReqId)

		partialDataMap, _ := pdCache.LoadOrStore(partialDataIdType, &sync.Map{})
		partialDataMapTyped, ok := partialDataMap.(*sync.Map)
		if !ok {
			fmt.Printf("sync map conversion error\n")
			return false
		}

		slice, _ := partialDataMapTyped.LoadOrStore(pd.ForTask, make([]*PartialData, 0))
		sliceTyped := slice.([]*PartialData)

		sliceTyped = append(sliceTyped, pd)
		partialDataMapTyped.Store(pd.ForTask, sliceTyped)
		pdCache.Store(partialDataIdType, partialDataMapTyped)
	}
	return true
}

func savePartialDataToEtcd(pd *PartialData) error {
	cli, err := utils.GetEtcdClient()
	if err != nil {
		return err
	}
	ctx := context.TODO()
	// marshal the progress object into json
	payload, err := json.Marshal(pd)
	if err != nil {
		return fmt.Errorf("could not marshal progress: %v", err)
	}
	pdEtcdMutex.Lock()
	defer pdEtcdMutex.Unlock()
	// saves the json object into etcd
	_, err = cli.Put(ctx, getPartialDataEtcdKey(pd.ReqId, pd.ForTask), string(payload))
	if err != nil {
		return fmt.Errorf("failed etcd Put partial data: %v", err)
	}
	return nil
}

func getPartialDataFromCache(pdId PartialDataId, nodeId TaskId) ([]*PartialData, error) {
	pdCacheMutex.Lock()
	defer pdCacheMutex.Unlock()
	subMap, ok := pdCache.Load(pdId)
	if !ok {
		return nil, fmt.Errorf("cannot find partial data submap for request id %s\n", pdId)
	}
	subMapTyped := subMap.(*sync.Map)
	// getting the slice
	slice, sliceFound := subMapTyped.Load(nodeId)
	if !sliceFound {
		return nil, fmt.Errorf("cannot find slice of partial data for request id %s and workflow node %s\n", pdId, nodeId)
	}
	sliceTyped := slice.([]*PartialData)
	// end debug
	return sliceTyped, nil
}

func getPartialDataFromEtcd(requestId ReqId, nodeId TaskId) ([]*PartialData, error) {
	cli, err := utils.GetEtcdClient()
	if err != nil {
		return nil, errors.New("failed to connect to ETCD")
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	key := getPartialDataEtcdKey(requestId, nodeId)
	pdEtcdMutex.Lock()
	getResponse, err := cli.Get(ctx, key)
	if err != nil || len(getResponse.Kvs) < 1 {
		pdEtcdMutex.Unlock()
		return nil, fmt.Errorf("failed to retrieve partialDatas for requestId: %s", key)
	}
	pdEtcdMutex.Unlock()
	partialDatas := make([]*PartialData, 0, len(getResponse.Kvs))
	for _, v := range getResponse.Kvs {
		var partialData *PartialData
		err = json.Unmarshal(v.Value, &partialData)
		if err != nil {
			return nil, fmt.Errorf("failed to unmarshal partialDatas json: %v", err)
		}
		partialDatas = append(partialDatas, partialData)
	}

	return partialDatas, nil
}

func getAllPartialDataFromEtcd(requestId ReqId) (map[TaskId][]*PartialData, error) {
	cli, err := utils.GetEtcdClient()
	if err != nil {
		return nil, errors.New("failed to connect to ETCD")
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	key := getPartialDataEtcdKey(requestId, "") // we get only the request prefix, so we retrieve all data
	pdEtcdMutex.Lock()
	partialDataResponse, err := cli.Get(ctx, key, clientv3.WithPrefix())
	if err != nil || len(partialDataResponse.Kvs) < 1 {
		pdEtcdMutex.Unlock()
		return nil, fmt.Errorf("failed to retrieve partialDataMap for requestId: %s", key)
	}
	pdEtcdMutex.Unlock()

	partialDataMap := make(map[TaskId][]*PartialData)
	for _, kv := range partialDataResponse.Kvs {
		var partialData *PartialData
		err = json.Unmarshal(kv.Value, &partialData)
		if err != nil {
			return nil, fmt.Errorf("failed to unmarshal partialDataMap json: %v", err)
		}
		_, found := partialDataMap[partialData.ForTask]
		if !found {
			partialDataMap[partialData.ForTask] = make([]*PartialData, 0)
		}
		partialDataMap[partialData.ForTask] = append(partialDataMap[partialData.ForTask], partialData)
	}

	return partialDataMap, nil
}

// getAllPartialDataFromCache returns a *sync.Map[TaskId, []*PartialData]
func getAllPartialDataFromCache(requestId PartialDataId) *sync.Map {
	pdCacheMutex.Lock()
	defer pdCacheMutex.Unlock()
	partialDataMap, _ := pdCache.LoadOrStore(requestId, &sync.Map{})
	partialDataMapTyped := partialDataMap.(*sync.Map)
	return partialDataMapTyped
}

func GetCacheContents() map[PartialDataId]map[TaskId][]*PartialData {
	res := make(map[PartialDataId]map[TaskId][]*PartialData)
	pdCache.Range(func(key, value any) bool {
		typedKey := key.(PartialDataId)
		res[typedKey] = make(map[TaskId][]*PartialData)
		subMap := value.(*sync.Map)
		subMap.Range(func(key, value any) bool {
			res[typedKey][key.(TaskId)] = value.([]*PartialData)
			return true
		})
		return true
	})
	return res
}
