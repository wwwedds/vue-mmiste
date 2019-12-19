import Vue from 'vue'
import Vuex from 'vuex'
import state  from './state'
import  mutations from './mutations'
import actions  from './actions'
import getters from './getters'
import  shop  from './modules/shop'
import  user  from './modules/user'
import msite from './modules/msite'
Vue.use(Vuex)
const store=new Vuex.Store(
  { state,mutations,actions,getters,
    modules:{
      shop,user,msite
    }
  }
)
export default store