import axios from 'axios'
import qs from 'qs'
import store from '../store/store'
import router  from '../router/router'
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
  const needCeck= config.headers.needCheck
  
  if(token){
    config.headers['Authorization']=token
  }else{
    if(needCeck){
      if(!token){
        throw new Error('没有token') 
      }
    }
  }
  return config
});

instance.interceptors.response.use((response)=>{

  return response.data
}, (error)=>{
    const response=error.resonpse
   if(!response){
    router.replace('/login')
   }else{
     if(error.response.status===401){
       router.replace('/login')
     }
   }
  alert('error',error)
  return new Promise(()=>{
  });
});

export default instance 