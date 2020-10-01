import * as axios from 'axios'
const BASE_URL = 'http://localhost:8000/'

let instance = axios.create({ 
    baseURL: BASE_URL,
    withCredentials: false, })

// Запрос данных по кластеру
export const getCluster = () => {
    return instance.get("api/1.0/getcluster", {withCredentials: false}).then(response => {
        
        console.log(response)
        return response.data;
    }).catch(err => {
        console.log(err)
        return err;
    })
}

// Удаление worker
export const deleteWorker = (pid) => {
    return instance.delete("api/1.0/deleteworker/"+pid, {withCredentials: false}).then(response => {
        
        console.log(response)
        return response.data;
    }).catch(err => {
        console.log(err)
        return err;
    })
}

// Удаление master
export const deleteMaster = () => {
    return instance.delete("api/1.0/deletemaster", {withCredentials: false}).then(response => {
        
        console.log(response)
        return response.data;
    }).catch(err => {
        console.log(err)
        return err;
    })
}