 import home from '@/components/pages/home/home'
 import building from '@/components/common/building'
 import content from '../components/common/content.vue'
 import axios from 'axios';

 function siderBarRouters(path) {
   return new Promise((resolve, reject) => {
     // axios.defaults.baseURL="";
     axios({
         method: 'get',
         baseURL: '',
         url: './static/' + path + 'RouterData.json'
       }).then(function (response) {
         let data = response.data
         proRoutersObj(data);
         resolve(data);
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
