 import home from '@/components/pages/home/home'
 import building from '@/components/common/building'
 import about from '@/components/pages/about/about'
 import content from '../components/common/content.vue'
 import relateResults from '../components/pages/relateResult/relateResults.vue'

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
       parentEntityName: '/',
       firstLoad: true
     }
   },
   {
     path: '/dataService',
     component: content,
     name: 'dataService',
     children: [],
     meta: {
       name: '数据服务',
       entityName: 'dataService',
       type: 'top',
       parentEntityName: '/',
       firstLoad: true
     }
   },
   {
     path: '/display',
     children: [],
     component: content,
     name: 'display',
     meta: {
       name: '在线展示',
       entityName: 'display',
       type: 'top',
       parentEntityName: '/',
       firstLoad: true
     }
   },
   {
    path: '/statistics',
    children: [],
    component: content,
    name: 'statistics',
    meta: {
      name: '开放统计',
      entityName: 'statistics',
      type: 'top',
      parentEntityName: '/',
      firstLoad: true
    }
   },
   {
     path: '/relateResults',
     component: relateResults,
     children: [],
     name: 'relateResults',
     meta: {
       name: '相关成果',
       entityName: 'relateResults',
       type: 'top',
       parentEntityName: '/',
       firstLoad: true
     }
   },
   {
     path: '/userSupport',
     component: content,
     children: [],
     name: 'userSupport',
     meta: {
       name: '用户支持',
       entityName: 'userSupport',
       type: 'top',
       parentEntityName: '/',
       firstLoad: true
     }
   },
   {
     path: '/about',
     component: about,
     children: [],
     name: 'about',
     meta: {
       name: '关于我们',
       entityName: 'about',
       type: 'top',
       parentEntityName: '/',
       firstLoad: true
     }
   },{
    path: '/admin/:account',
    component: content,
    children: [],
    name: 'admin',
    meta: {
      name: '用户管理',
      entityName: 'admin',
      type: 'top',
      parentEntityName: '/',
      firstLoad: true
    }
  },
 ]
//  export {
//    siderBarRouters
//  }
 export default dynamicRoutes;
