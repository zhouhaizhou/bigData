import home from '@/components/pages/home/home'
import dataService from '@/components/pages/dataService/dataService'
import display from '@/components/pages/display/display'
import relateResults from '@/components/pages/relateResult/relateResults'
import userSupport from '@/components/pages/userSupport/userSupport'
import about from '@/components/pages/about/about'
import building from '@/components/common/building'
import mainrouter from '../components/common/mainrouter'
import slideBar from '../components/common/slideBar.vue'

function siderBarRouters(path) {
  if (path.indexOf("display")>0) {
    return siderBarRouter;
  } else {
    return siderBarRouter2;
  }

}
const siderBarRouter = [{
  path: '/dataDownLoad',
  name: 'dataDownLoad',
  meta: {
    name: '数据下载',
    entityName: 'dataDownLoad',
    parentEntityName: 'dataService'
  },
  //component:resolve => require(['../components/pages/router.vue'], resolve),
  component: mainrouter,
  children: [{
    path: '/surfMeteo',
    component: dataService,
    name: 'surfMeteo',
    meta: {
      name: '地面气象资料',
      entityName: 'surfMeteo'
    }
  }]
}]
const siderBarRouter2 = [{
  path: '/dataInterface',
  name: 'dataInterface',
  meta: {
    name: '数据接口',
    entityName: 'dataInterface',
    parentEntityName: 'display'
  },
  //component:resolve => require(['../components/pages/router.vue'], resolve),
  component: mainrouter,
  children: [{
    path: '/heighMeteo',
    component: dataService,
    name: 'heighMeteo',
    meta: {
      name: '高空气象资料',
      entityName: 'heighMeteo'
    }
  }]
}]
/* 需要权限判断的路由 */
const dynamicRoutes = [{
    path: '/home',
    component: home,
    name: 'home',
    children: [],
    meta: {
      name: '首页',
      entityName: 'home',
      type: 'top',
      parentEntityName: '/'
    }
  },
  {
    path: '/dataService',
    component: slideBar,
    name: 'dataService',
    children: [],
    meta: {
      name: '数据服务',
      entityName: 'dataService',
      type: 'top',
      parentEntityName: '/'
    }
  },
  {
    path: '/display',
    children: [],
    component: slideBar,
    name: 'display',
    meta: {
      name: '在线展示',
      entityName: 'display',
      type: 'top',
      parentEntityName: '/'
    }
  },
  {
    path: '/relateResults',
    component: slideBar,
    children: [],
    name: 'relateResults',
    meta: {
      name: '相关成果',
      entityName: 'relateResults',
      type: 'top',
      parentEntityName: '/'
    }
  },
  {
    path: '/userSupport',
    component: slideBar,
    children: [],
    name: 'userSupport',
    meta: {
      name: '用户支持',
      entityName: 'userSupport',
      type: 'top',
      parentEntityName: '/'
    }
  },
  {
    path: '/about',
    component: building,
    children: [],
    name: 'about',
    meta: {
      name: '关于我们',
      entityName: 'about',
      type: 'top',
      parentEntityName: '/'
    }
  },
]
export {
  siderBarRouters
}
export default dynamicRoutes;
