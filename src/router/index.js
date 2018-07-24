import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
     // redirect: '/news',
      component:  resolve => require(['../components/common/header.vue'], resolve),
      children:[{
        path:'home',
        name:'home',
        component:  resolve => require(['../components/pages/home.vue'], resolve),
      },{
          path:'dataService',
          name:'dataService',
          component:  resolve => require(['../components/pages/dataService.vue'], resolve),
        }
    ]
    }
  ]
})
