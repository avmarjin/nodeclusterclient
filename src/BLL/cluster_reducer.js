import { deleteMaster, deleteWorker, getCluster } from "../DAL/clusterAPI";

const SET_WORKERS = 'SET_WORKERS'
const SET_MASTER = 'SET_MASTER'
const SET_IS_MASTER_CHANGE = 'SET_IS_MASTER_CHANGE'
const SET_ACTIVE_COUNT = 'SET_ACTIVE_COUNT'
const SET_GLOBAL_COUNT = 'SET_GLOBAL_COUNT'

export const setWorkersAC = (workers) => ({
    type: SET_WORKERS,
    workers: workers
})

export const setActiveCountAC = (num) => ({
    type: SET_ACTIVE_COUNT,
    activeCount: num
})

export const setGlobalCountAC = (num) => ({
    type: SET_GLOBAL_COUNT,
    globalCount: num
})

export const setMasterAC = (master) => ({
    type: SET_MASTER,
    master: master
})

export const setIsMasterChangeAC = (status) => ({
    type: SET_IS_MASTER_CHANGE,
    isMasterChange: status
})

// Запрос и сохранение в state объектов кластера
export const getClusterTC = () => (dispatch) => {
    
    getCluster().then(data => {
        if(data.resultCode === 1) {
           dispatch(setWorkersAC(data.nodes)); 
           dispatch(setMasterAC(data.master));
           dispatch(setActiveCountAC(data.activeCount))
           dispatch(setGlobalCountAC(data.globalCount))
        } else {
            console.log("Нет активных объектов кластера")
        }
    })
}

// Удаление процесса нода
export const deleteWorkerTC = (pid) => (dispatch) => {
    
    deleteWorker(pid).then(data => {
        if(data.resultCode === 1) {
           
           dispatch(setWorkersAC(data.nodes)); 
           dispatch(setMasterAC(data.master))
        } else {
            console.log("Нет активных объектов кластера")
        }
    })
}

// Удаление процесса мастера
export const deleteMasterTC = () => (dispatch) => {
    
    deleteMaster().then(data => {
        if(data.resultCode === 1) {
           
            dispatch(setWorkersAC(data.nodes)); 
            dispatch(setMasterAC(0))
            dispatch(setIsMasterChangeAC(true));
            console.log("Wiat 4 sec")
            setTimeout(()=> {
                
                
                dispatch(getClusterTC());
                dispatch(setIsMasterChangeAC(false));
                console.log("Time out")
            }, 5000)

        } else {
            console.log("Нет активных объектов кластера")
        }
    })
}





let initialState = {
    workers: [],
    nodes: [],
    master: 0,
    isMasterChange: false
}

const clusterReducer = (state = initialState, action) => {
    
    switch (action.type) {

        case SET_ACTIVE_COUNT: {
            return {
                ...state,
                activeCount: action.activeCount
            }
        }  

        case SET_GLOBAL_COUNT: {
            return {
                ...state,
                globalCount: action.globalCount
            }
        }
        
        case SET_WORKERS: {
            return {
                ...state,
                workers: action.workers
            }
        }         

        case SET_MASTER: {
            
            return {
                ...state,
                master: action.master
            }
        }   

        case SET_IS_MASTER_CHANGE: {
            
            return {
                ...state,
                isMasterChange: action.isMasterChange
            }
        }  

        default:
            return state
        }
}

export default clusterReducer
