/**
 *
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */

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

var cloneObj = function (obj) {
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
export function setDefaultRoute(routes) {
  routes.forEach((v, i) => {
    if (v.children && v.children.length > 0) {
      v.redirect = {
        name: v.children[0].name
      }
      setDefaultRoute(v.children)
    }
  })
}
export function joinRouter(MainContainer, routers, path) {
  for (let i = 0; i < MainContainer.length; i++) {
    let item = MainContainer[i]
    if (item.children.length > 0 && item.meta.type!='top') {
      joinRouter(item.children, routers,path);
    } else {
      if (item.path == path && (item.meta.entityName==routers[0].meta.parentEntityName)) {
        item.children.push(...routers);
      }
    }
  }
  return MainContainer;
}
