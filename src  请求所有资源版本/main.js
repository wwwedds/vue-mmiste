import Vue from 'vue'
import 'lib-flexible/flexible.js'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router/router'
import Header from './components/Header/Header.vue'
import Star from './components/star/star.vue'
import store from './store/store'
import './valitabe'
import * as API from './api'
import i18n from './i18n'
import './mock/mock-sever'
import CartControl from './components/cartcontrol/CartControl'
import loading from './common/imgages/loading.gif'
Vue.use(VueLazyload, {
  loading

})
Vue.prototype.$API = API
Vue.config.productionTip = false
Vue.component(
  'Header', Header
)
Vue.component(
  'Star', Star
)
Vue.component(
  'CartControl', CartControl
)
new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')