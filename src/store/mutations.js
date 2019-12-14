export default {
  getAddress(address,state){
state.address=address
  },
  getFoodList(state,categorys){
   state.categorys=categorys
  },
  getShopsList(state,shops){
   state.shops=shops
  }
}