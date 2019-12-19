import Vue from  'vue'
export default {
  getAddress(state, adress) {
    state.address = adress
  },
  getFoodList(state, categorys) {
    state.categorys = categorys
  },
  getShopsList(state, shops) {
    state.shops =shops
  },
save_token(state,token){
  state.token=token
},

save_user(state,user){
  state.user=user
},
getGoods(state,{goods}){
  state.goods=goods
},
getInfo(state,{info}){
state.info=info
},
getRatings(state,{ratings}){
state.ratings=ratings
},
saveAdd(state,{food}){
if(food.count){
  food.count++
}else{
 Vue.set(food,'count',1)
}
},
saveIncrement(state,{food}){
  if(food.count>0){
    food.count--
  }
  },
}