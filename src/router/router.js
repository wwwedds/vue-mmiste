import Vue from 'vue'
import VueRouter from 'vue-router'
import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/login.vue'
import Shop from '../pages/Shop/Shop.vue'
import Ratings from '../pages/Shop/shopRatings.vue'
import Goods  from  '../pages/Shop/shopGoods.vue'
import Info  from  '../pages/Shop/shopInfo.vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
      path: '/msite',
      component: Msite,
      meta:{
        isShow:true
      }
    },
    {
      path: '/search',
      component: Search,
      meta:{
        isShow:true
      }
    },
    {
      path: '/order',
      component: Order,
      meta:{
        isShow:true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta:{
        isShow:true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/shop/:id',
      props:true,
      component: Shop,
      children:[
        {
          path: 'goods',
          component: Goods,
        },
        {
          path: 'info',
          component: Info,
        },
        {
          path: 'ratings',
          component: Ratings,
        },
        {
          path: '',
          redirect: 'goods'
        }
      ]
    }
  ]

})