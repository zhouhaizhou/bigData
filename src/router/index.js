import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/pages/home/home.vue'
import layout from '@/components/common/layout.vue'

import data from '../../static/data/routerIndex.json'
import {proRoutersObj} from '@/utils/recursion-router'
let router=proRoutersObj(data);
Vue.use(Router)
export default new Router({
  mode:'history',
    routes: router,
    scrollBehavior (to, from, savedPosition) {
      if((to.meta.parentEntityName!=undefined) && (!(to.meta.parentEntityName.indexOf('dataDownLoad')>-1))){
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
