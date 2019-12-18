import Vue from 'vue'
import 'lib-flexible/flexible.js'
import App from './App.vue'
import router from './router/router'
import Header from './components/Header/Header.vue'
import store from  './store/store'
import './valitabe'
import * as API from './api'
import i18n from './i18n'
import './mock/mock-sever'


Vue.prototype.$API=API
Vue.config.productionTip = false
Vue.component(
  'Header',Header
)
new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')
