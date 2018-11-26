/**
 *
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */
import axios from 'axios'
import store from '../store/index.js'
//一级菜单过滤
export function recursionRouter(userRouter = [], allRouter = []) {
  var realRoutes = []
  allRouter.forEach((v, i) => {
    userRouter.forEach((item, index) => {
      if (item.entityName === v.meta.entityName) {
        if (item.children && item.children.length > 0) {
          v.children = recursionRouter(item.children, v.children)
        }
        realRoutes.push(v)
      }
    })
  })
  return realRoutes
}

export function getContainer(routers, path, containerRouters) {
  let pathArr = path.split('/');
  let pathTemp = "";
  for (var i = 0; i < routers.length; i++) {
    var item = routers[i];
    for (var j = 0; j < pathArr.length; j++) {
      pathTemp += pathArr[j] + "/";
      if (pathTemp != '/') {
        pathTemp = pathTemp.substring(0, pathTemp.length - 1);
      }
      if (item.path == pathTemp) {
        if (containerRouters == null) {
          containerRouters = item;
        } else {
          let arr = [];
          arr.push(item);
          containerRouters.children.push(...arr);
        }
        if (pathTemp == path) {
          return containerRouters;
        }
      } else {
        if (item.children.length > 0 && j == pathArr.length - 1 && i == routers.length - 1) {
          var contain = cloneObj(containerRouters)
          // containerRouters.children=contain;
          var router = getContainer(item.children, path, contain);
        }
      }
    }
  }
  return router;
}
//对象深度拷贝
export function cloneObj(obj){
//var cloneObj = function (obj) {
  var newObj = {};
  if (obj instanceof Array) {
    newObj = [];
  }
  for (var key in obj) {
    var val = obj[key];
    //newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。
    newObj[key] = typeof val === 'object' ? cloneObj(val) : val;
  }
  return newObj;
};
/**
 *
 * @param {Array} routes 用户过滤后的路由
 *
 * 递归为所有有子路由的路由设置第一个children.path为默认路由
 */
// export function setDefaultRoute(routes, parentName, defaultRoute) {
  // routes.forEach((v, i) => {
  //   if (v.children && v.children.length > 0) {
  //     if (v.name == parentName) {
  //       if (v.children[0].children != undefined) {
  //         setDefaultRoute(v.children, v.children[0].name,defaultRoute);
  //       } else {
  //         defaultRoute.name=v.children[0].name;
  //        // return v.children[0].name;
  //       }
  //     }
  //     setDefaultRoute(v.children, parentName,defaultRoute);
  //   }
  // })
  //设置默认路由
  export function setDefaultRoute(parentName) {
  return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: "Register.svc/GetDefault",
        params:{
          rootName:parentName
        }
      }).then(res => {
        let data =JSON.parse(res.data);
        let router = data[0].ModuleName;
        resolve(router)
      }).catch(res => {console.log(res);reject(res)})
    })
  }

  export function joinRouter(MainContainer, routers, path) {
    for (let i = 0; i < MainContainer.length; i++) {
      let item = MainContainer[i]
      if ( item.children!=undefined && item.children.length > 0) {
      //if (item.children.length > 0 && item.meta.type != 'top') {
        joinRouter(item.children, routers, path);
      } else {
        let itemPath=item.path;
        if(item.path.indexOf("/:")>0){  //路由中有参数
          itemPath=item.path.split('/:')[0];
        }
        if (itemPath == path && (item.meta.entityName == routers[0].meta.parentEntityName)) {
          if(item.children==undefined){
            item["children"]=[];
          }
          item.children.push(...routers);
        }
      }
    }
    return MainContainer;
  }
  //原版
  export function joinRouter2(MainContainer, routers, path) {
    for (let i = 0; i < MainContainer.length; i++) {
      let item = MainContainer[i]
      //if ( item.children!=undefined && item.children.length > 0) {
      if (item.children.length > 0 && item.meta.type != 'top') {
        joinRouter(item.children, routers, path);
      } else {
        let itemPath=item.path;
        if(item.path.indexOf("/:")>0){  //路由中有参数
          itemPath=item.path.split('/:')[0];
        }
        if (itemPath == path && (item.meta.entityName == routers[0].meta.parentEntityName)) {
          item.children.push(...routers);
        }
      }
    }
    return MainContainer;
  }
  //后台读取的路由json转成路由对象，并导入路由中用到的组件
export function proRoutersObj(data) {
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
//从后台读取左侧菜单模块
export function siderBarRouters(path) {
  return new Promise((resolve, reject) => {
    let account=store.state.UserToken.Account;
   //  alert(account);
    axios.get("GetImageProducts.svc/GetModules", {
        params: {
          token: account,
          moduleName: path
        }
      }).then(function (response) {
        let data = response.data;
        if(data.indexOf("失败")>-1||data.indexOf("没有")>-1){
          store.commit('SET_SIDERMENU', []);
          reject(data);
          return;
        }
        data=JSON.parse(data);
        proRoutersObj(data);
        resolve(data);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  })
}