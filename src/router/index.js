import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/pages/home/home.vue'
import layout from '@/components/common/layout.vue'
import register from '@/components/pages/userRegister.vue'
import cart from '@/components/pages/cart.vue'
import userLogin from '@/components/pages/userLogin.vue'
import questionnaire from '@/components/pages/questionnaire.vue'
import registerInfo from '@/components/pages/registerInfo.vue'

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
          component:layout,
          children:[
            {
              path:'',
              //name:'registerInfo',
              component:register
            },
            {
              path:'registerInfo',
              name:'registerInfo',
              component:registerInfo
            }
          ]
        },{
          path:'/cart',
          component:cart
        },
        {
          path:'/userLogin',
          component:userLogin
        },
        {
          path:'/questionnaire',
          component:questionnaire
        }
        // ,{
        //   path:'/registerInfo',
        //   name:'registerInfo',
        //   component:registerInfo
        // }
        // ,
        // {
        //   path:'/modalProvincesPan',
        //   name:'modalProvincesPan',
        //   component:modalProvincesPan
        // }
    ],
    scrollBehavior (to, from, savedPosition) {
      if(!(to.meta.parentEntityName.indexOf('dataDownLoad')>-1)){
        return { x: 0, y: 0 }
      }
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
