import axios from 'axios'
import qs from 'qs'
import store from '../store/store'
//import {Indicator} from 'mint-ui'
const instance=axios.create({
  timeout:5000,
  baseURL: '/api',//代理转发
})
instance.interceptors.request.use((config)=>{
  if(config.data instanceof Object){
    config.data=qs.stringify(config.data)
  }
  const token=store.state.token
  if(token){
    config.headers['Authorization']=token
  }
  return config
});

instance.interceptors.response.use((response)=>{

  return response.data
}, (error)=>{

  alert('error',error)
  return new Promise(()=>{
  });
});

export default instance 