import {addAdress,foodCategoryList,shopCategoryList} from '../../api/index'

export  default{
state:{
  latitude: 40.10038, // 纬度
    longitude: 116.36867, // 经度
    address: {}, // 地址信息对象
    categorys: [], // 分类数组
    shops: [], //商家数组

},
mutations:{
  getAddress(state, adress) {
    state.address = adress
  },
  getFoodList(state, categorys) {
    state.categorys = categorys
  },
  getShopsList(state, shops) {
    state.shops =shops
  },

},
actions:{
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
},
getters:{}
}