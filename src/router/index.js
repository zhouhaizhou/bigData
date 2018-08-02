import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/pages/home/home.vue'
import layout from '@/components/common/layout.vue'
import register from '@/components/pages/userRegister.vue'
// import HelloWorld from '@/components/HelloWorld'

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
        type:'/'
      }
  }
]
