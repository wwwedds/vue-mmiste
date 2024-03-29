import {addAdress,foodCategoryList,shopCategoryList} from '../api/index'
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
}

  }
     