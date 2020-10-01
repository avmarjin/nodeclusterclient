import {createSelector} from 'reselect';


export const getWorkers = (state) => state.cluster.workers;

export const getTotalNodesCount = createSelector(
    [getWorkers],
    (workers) => {
        return workers.reduce((acc, worker) => {
            return acc + worker.value;
        }, 0) 
        }
);