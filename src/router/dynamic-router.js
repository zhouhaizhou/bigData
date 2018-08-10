import home from '@/components/pages/home/home'
import dataService from '@/components/pages/dataService/dataService'
import dataServiceContent from '@/components/pages/dataService/dataServiceContent'
import display from '@/components/pages/display/display'
import displayContent from '@/components/pages/display/displayContent'
import relateResults from '@/components/pages/relateResult/relateResults'
import userSupport from '@/components/pages/userSupport/userSupport'
import about from '@/components/pages/about/about'
import building from '@/components/common/building'
import content from '../components/common/content.vue'
import axios from 'axios';

function siderBarRouters(path) {
  //return axios.get('/static/routerDate.json')
  return new Promise((resolve, reject) => {
    axios.get('./static/routerDate.json').then(function (response) {
        //let routerArr = new Array();
        let data = response.data
        proRoutersObj(data);
        //routerArr.push(data);
        resolve(data);
        // return new Promise((resolve,reject)=>{
        //   resolve(routerArr);
        // })
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  })
}

function proRoutersObj(data) {
  //var newObj = {};
  // if (obj instanceof Array) {
  //   //newObj = [];
  // }
  for (var key in data) {
    let val = data[key];
    if (key == 'component') {
      val = require("../components/" + val + ".vue");
      val = val.default;
    }
    data[key] = typeof val === 'object' ? proRoutersObj(val) : val;
  }
  return data;
}

// const siderBarRouter = [{
//   path: '/dataDownLoad',
//   name: 'dataDownLoad',
//   meta: {
//     name: '数据下载',
//     entityName: 'dataDownLoad',
//     parentEntityName: 'dataService'
//   },
//   //component:resolve => require(['../components/pages/router.vue'], resolve),
//   component: mainrouter,
//   children: [{
//     path: '/surfMeteo',
//     component: dataService,
//     name: 'surfMeteo',
//     meta: {
//       name: '地面气象资料',
//       entityName: 'surfMeteo'
//     }
//   }]
// }]
// const siderBarRouter2 = [{
//     path: '/dataInterface',
//     name: 'dataInterface',
//     meta: {
//       name: '数据接口',
//       entityName: 'dataInterface',
//       parentEntityName: 'display'
//     },
//     //component:resolve => require(['../components/pages/router.vue'], resolve),
//     component: displayContent,
//     children: [{
//       path: 'heighMeteo',
//       component: dataService,
//       name: 'heighMeteo',
//       meta: {
//         name: '高空气象资料',
//         entityName: 'heighMeteo'
//       }
//     }]
//   },
//   {
//     path: 'search',
//     name: 'search',
//     meta: {
//       name: '检索定制',
//       entityName: 'search',
//       parentEntityName: 'display'
//     },
//     //component:resolve => require(['../components/pages/router.vue'], resolve),
//     component: displayContent,
//     children: [{
//       path: 'shuzhiyubao',
//       component: dataService,
//       name: 'shuzhiyubao',
//       meta: {
//         name: '数值预报',
//         entityName: 'shuzhiyubao'
//       }
//     }, {
//       path: 'weixingtc',
//       component: dataService,
//       name: 'weixingtc',
//       meta: {
//         name: '卫星探测',
//         entityName: 'weixingtc'
//       }
//     }]
//   }
// ]
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
    component: building,
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
    path: '/relateResults',
    component: building,
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
    component: building,
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
    component: building,
    children: [],
    name: 'about',
    meta: {
      name: '关于我们',
      entityName: 'about',
      type: 'top',
      parentEntityName: '/',
      firstLoad: true
    }
  },
]
export {
  siderBarRouters
}
export default dynamicRoutes;
