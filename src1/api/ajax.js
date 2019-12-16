import axios from 'axios'
import qs from 'qs'
import {Indicator} from 'mint-ui'
const instance=axios.create({
  timeout:5000,
  baseURL: '/api',//代理转发
})
instance.interceptors.request.use((config)=>{
  if(config.data instanceof Object){
    Indicator.open()
    config.data=qs.stringify(config.data)
  }
  return config
});

instance.interceptors.response.use((response)=>{
  Indicator.close()
  return response.data
}, (error)=>{
  alert('error',error)
  Indicator.close()
  return new Promise(()=>{
  });
});

export default instance 