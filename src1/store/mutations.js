export default {
  getAddress(state, adress) {
    state.address = adress
  },
  getFoodList(state, categorys) {
    state.categorys = categorys
  },
  getShopsList(state, shops) {
    state.shops =shops
  }
}