import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'

export default {
    //get
    requestGet(url,params = {}){
        return new Promise((resolve,reject)=>{
            axios.get(url,params).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    //post
    requestPost(url,params = {}){
        return new Promise((resolve,reject)=>{
            axios.post(url,params).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    //delete
    requestDelete(url,params = {}){
        return new Promise((resolve,reject)=>{
            axios.delete(url,params).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    //Put
    requestPut(url,params = {}){
        return new Promise((resolve,reject)=>{
            axios.put(url,params).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },


}