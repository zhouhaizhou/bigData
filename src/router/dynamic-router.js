import home from '@/components/pages/home'
import dataService from '@/components/pages/dataService'
import display from '@/components/pages/display'
import relateResults from '@/components/pages/relateResults'
import userSupport from '@/components/pages/userSupport'
import about from '@/components/pages/about'


/* 需要权限判断的路由 */
const dynamicRoutes=[
  {
    path:'/home',
    component:home,
    name:'home',
    meta:{
      name:'首页',
      entityName:'home'
    }
  },
  {
    path:'/dataService',
    component:dataService,
    name:'dataService',
    meta:{
      name:'数据服务',
      entityName:'dataService'
    }
  },
  {
    path:'/display',
    component:display,
    name:'display',
    meta:{
      name:'在线展示',
      entityName:'display'
    }
  },
  {
    path:'/relateResults',
    component:relateResults,
    name:'relateResults',
    meta:{
      name:'相关成果',
      entityName:'relateResults'
    }
  },
  {
    path:'/userSupport',
    component:userSupport,
    name:'userSupport',
    meta:{
      name:'用户支持',
      entityName:'userSupport'
    }
  },
  {
    path:'/about',
    component:about,
    name:'about',
    meta:{
      name:'关于我们',
      entityName:'about'
    }
  },
]