import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/pages/home/home.vue'
import layout from '@/components/common/layout.vue'
import register from '@/components/pages/userRegister.vue'
import dataService from '@/components/pages/dataService/dataService.vue'
import building from '@/components/common/building.vue'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/home'
    }, 
    {
      //component: resolve => require(['../components/common/header.vue'], resolve),
      path: '/home',
      name: 'home',
      component: resolve => require(['../components/pages/home/home.vue'], resolve)
    }, 
    { path:'/register',
      component:resolve => require(['../components/pages/userRegister.vue'], resolve)
    },
    {
      path:'/dataService',
      name:'dataService',
      //component:resolve => require(['../components/pages/dataService/dataService.vue'], resolve)
      component:dataService
    },
    {
      path:'/display',
      name:'display',
      component:building
    },
    {
      path:'/relateResult',
      name:'relateResult',
      component:building
    },
    {
      path:'/userSupport',
      name:'userSupport',
      component:building
    },
    {
      path:'/about',
      name:'about',
      component:building
    }
  ]
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
