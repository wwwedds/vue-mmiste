import {addAdress,foodCategoryList,shopCategoryList, reqInfo,reqGoods,reqRatings, reqAutoLogin} from '../api/index'
export default {
  //发送异步ajax请求
  async getAdress({commit,state}){
    const {latitude,longitude}=state
    const result = await addAdress(latitude,longitude)
    if(result.code===0){
     commit('getAddress',result.data)
    }
},
//食品分类列表

async getFoodList({commit},callback){
  const result = await foodCategoryList()
  if(result.code ===0){
   commit("getFoodList",result.data)
    typeof callback === 'function' && callback()
  }
},
//商店
async getShopsList({commit,state}){
   const {latitude,longitude}=state
  const result = await shopCategoryList(latitude,longitude)
  if(result.code===0){
     commit('getShopsList',result.data)
  }
},
saveUser({commit},user){
  const token=user.token
  localStorage.setItem('token_key',token)
  //保存token
  commit('save_token',token)
  //保存user
  commit('save_user',user)
},
async getGoods({commit}){
const result = await reqGoods()
if(result.code===0){
  const goods=result.data
  commit('getGoods',{goods})
}
},
async getInfo({commit}){
  const result = await reqInfo()
  if(result.code===0){
    const info=result.data
    commit('getInfo',{info})
  }
  },
  
async  getRatings({commit}){
    const result = await reqRatings()
    if(result.code===0){
      const ratings=result.data
      commit('getRatings',{ratings})
    }
    },
  async  getAutoLogin({commit,state}){
    const {user,token}= state
  
       if(token && !user._id){
        const result=await reqAutoLogin()
        if(result.code===0){
          commit('save_user',result.data)
        }
      
    }

  }}
     