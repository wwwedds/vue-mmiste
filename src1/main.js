import Vue from 'vue'
import 'lib-flexible/flexible.js'
import App from './App.vue'
import router from './router/router'
import Header from './components/Header/Header.vue'
import store from  './store/store'

Vue.config.productionTip = false
Vue.component(
  'Header',Header
)
new Vue({
  render: h => h(App),router,store
}).$mount('#app')
