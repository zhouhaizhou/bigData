import {fetchPermission} from '@/utils/permission'
import router, {DynamicRoutes} from '@/router/index'
import {recursionRouter,setDefaultRoute,getContainer,joinRouter} from '@/utils/recursion-router'
import dynamicRouter, {siderBarRouters} from '@/router/dynamic-router'

export default  {
  scrollAnchor({context}, paramObj) {
    //Top 对象要从开始的位置移动到目标位置的距离
    //obj 哪个对象要移动
    var Top = paramObj.top;
    var obj = paramObj.obj;
    var self = this;
    if (document.documentElement.scrollTop >= obj.offsetTop) {
      return;
    }
    document.documentElement.scrollTop=Top;
    var timer = setInterval(function() {
      clearInterval(timer);
      let distance = (obj.offsetTop - document.documentElement.scrollTop) / 10 //步长
      self.dispatch('scrollAnchor', {
        top: distance + Top,
        obj: obj
      });
    }, 15);
},
  FETCH_PERMISSION({commit,state}, paramObj) {
    let type = paramObj.type;
    let path = paramObj.path;
    path=((path.charAt(path.length-1)=="/")&&path.length>1)?path.substring(0,path.length-1):path;
    let routers = null;
    let DynamicR = DynamicRoutes;
    let permissionList = null;
    let routerTo = paramObj.router;
    let firstLoad = paramObj.flag;
    let defaultRouter = {
      name: null
    };
    let children=null;
    if (!firstLoad) { //不是第一次点击则不需要重新从后台读取，直接获取第一次缓存的数据即可
      if (path.split('/').length > 2) {
        return;
      } else {
         commit('SET_SIDERMENU', state.cacheSiderBar[path]);
        setDefaultRoute(DynamicR, path.split('/')[1], defaultRouter);
        router.push(defaultRouter);
         //return;
       }
    }
    if (type == 'top') { //第一次获取一级菜单
      permissionList = fetchPermission("");
      routers = recursionRouter(permissionList, dynamicRouter) //这里其实做了一步过滤
      children = joinRouter(DynamicR, routers, path);
      commit('SET_TOPMENU', children[0].children);
      router.addRoutes(DynamicR);
      commit('SET_PERMISSION', [...DynamicR])
    } else { //从后台读取左边权限  第一次点击一级菜单才会触发
      DynamicR = state.permissionList;
      siderBarRouters(path.split('/')[1]).then(function (res) {
        routers = res;
        children = joinRouter(DynamicR, routers, "/"+path.split('/')[1]);
        state.cacheSiderBar[path] = routers;
        commit('SET_SIDERMENU', state.cacheSiderBar[path]);
        router.addRoutes(DynamicR);
        /* 完整的路由表 */
        commit('SET_PERMISSION', [...DynamicR]);
        setDefaultRoute(DynamicR, path.split('/')[1], defaultRouter);
        router.push(defaultRouter);
      });
    }
  }
}

