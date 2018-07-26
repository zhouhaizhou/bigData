import Vue from 'vue'
import Router from 'vue-router'
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
      component: resolve => require(['../components/pages/home.vue'], resolve),
      // children: [
      //   {
      //     path: '/register',
      //     name: 'register',
      //     component: resolve => require(['../components/pages/userRegister.vue'], resolve),
      //   }
      // ]
    }, 
    // {
    //   path: '/dataService',
    //   name: 'dataService',
    //   component: resolve => require(['../components/pages/dataService.vue'], resolve)
    //  }
    // ,{
    //   path:'/register',
    //   component:resolve => require(['../components/pages/userRegister.vue'], resolve)
    // }
  ]
})
