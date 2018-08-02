import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/q',
      component: resolve => require(['../components/pages/home.vue'], resolve),
      //redirect: '/home',
      children:[{
          path: 'home',
          name: 'home',
          component: resolve => require(['../components/pages/home.vue'], resolve),
        }]
    }, 
    // {
    //   //component: resolve => require(['../components/common/header.vue'], resolve),
    //   path: '/home',
    //   name: 'home',
    //   component: resolve => require(['../components/pages/home.vue'], resolve),
    //   //component: resolve => require(['../components/home11.vue'], resolve),
    //   // children: [
    //   //   {
    //   //     path: '/register',
    //   //     name: 'register',
    //   //     component: resolve => require(['../components/pages/userRegister.vue'], resolve),
    //   //   }
    //   // ]
    // }, 
    { path:'/register',
      component:resolve => require(['../components/pages/userRegister.vue'], resolve),
      // children:[{
      //   path:'/',
      //   component: resolve => require(['../components/common/foot.vue'], resolve),
      // }]
    },
    {
      path:'/dataService',
      component:resolve => require(['../components/pages/dataService.vue'],resolve)
    }
  ]
})
