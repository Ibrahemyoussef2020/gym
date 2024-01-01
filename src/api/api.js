import axios   from "axios";


const api = axios.create({
    baseURL : 'http://localhost:4000/'

})


export const getData = async (seletedData)=> await api.get(seletedData)
.then(res => res.data)

export const getSelectedData = async (seletedData,id)=> await api.get(`${seletedData}/${id}`)
.then(res => res.data)

export const addData = async ({seletedData,...added})=> await api.post(`${seletedData}`,added)
.then(res => res.data)

export const modifyData = async ({seletedData,id,...modified})=> await api.put(`${seletedData}/${id}`,modified)
.then(res => res.data)

export const removeData = async (seletedData,id)=> await api.delete(`${seletedData}/${id}`)
.then(res => true) 


