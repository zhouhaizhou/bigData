import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/pages/home/home.vue'
import layout from '@/components/common/layout.vue'
import register from '@/components/pages/userRegister.vue'
import cart from '@/components/pages/cart.vue'
// import HelloWorld from '@/components/HelloWorld'

import modalProvincesPan from '@/components/pages/dataService/modalProvincesPan.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect:'/home',
            children:[]
        },{
          path:'/register',
          component:register
        },{
          path:'/cart',
          component:cart
        }
        // ,
        // {
        //   path:'/modalProvincesPan',
        //   name:'modalProvincesPan',
        //   component:modalProvincesPan
        // }
    ],
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
})
export const DynamicRoutes = [
  {
      path: '/',
      component:layout,
      //redirect:'/home',
      children: [],
      meta:{
        type:'/',
        entityName:'/'
      }
  }
]
