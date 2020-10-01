import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddlware from "redux-thunk";
import clusterReducer from "./cluster_reducer";


let reducers = combineReducers({
    cluster: clusterReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddlware) );
//let store = createStore(reducers,  applyMiddleware(thunkMiddlware));
window.store = store;

export default store;