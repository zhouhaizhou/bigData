import Router from 'vue-router'
import router, {DynamicRoutes} from '@/router/index'
import { recursionRouter,setDefaultRoute,getContainer,joinRouter,siderBarRouters,cloneObj} from '@/utils/recursion-router'
// import dynamicRouter, { siderBarRouters} from '@/router/dynamic-router'
import dynamicRouter from '@/router/dynamic-router'
import axios from 'axios'
export default {
  scrollAnchor({commit,state}, paramObj) {
    //Top 对象要从开始的位置移动到目标位置的距离
    //obj 哪个对象要移动
    //commit('SETFUNRETURN',true);
    var Top = paramObj.top;
    var obj = paramObj.obj;
    var self = this;
    document.documentElement.scrollTop = Top;
    let isScroll = paramObj.isScroll == undefined ? true : paramObj.isScroll; //页面到最低端之后点击其他的菜单时所触发的条件，每次点击菜单则为true,首页锚点定位没有传这个参数
    if (Math.abs(document.documentElement.scrollTop - obj.offsetTop) <= 1) { //初底部以外到达该条件就退出
      return;
    }
    let isBottom = document.body.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight; //判断滚动是否到达底部的条件
    if (!isScroll && Math.abs(isBottom) <= 1) { //判断如果到底部了就退出
      return;
    }
    state.anchorTimer = setInterval(function () {
      clearInterval(state.anchorTimer);
      let distance = (obj.offsetTop - document.documentElement.scrollTop) / 10 //步长
      self.dispatch('scrollAnchor', {
        top: distance + Top,
        obj: obj,
        isScroll: false
      });
    }, 15);
  },
  FETCH_PERMISSION({commit, state}, paramObj) {
    let type = paramObj.type;
    let path = paramObj.path;
    path = ((path.charAt(path.length - 1) == "/") && path.length > 1) ? path.substring(0, path.length - 1) : path;
    let routers = null;
    let DynamicR = DynamicRoutes;
    let permissionList = null;
    let routerTo = paramObj.router;
    let firstLoad = paramObj.flag;
    let routeRed = routerTo.params.redirect;
    let children = null;
    if (!firstLoad) { //不是第一次点击则不需要重新从后台读取，直接获取第一次缓存的数据即可
      if (path.split('/').length > 2) {
        return;
      } else {
        commit('SET_SIDERMENU', state.cacheSiderBar[path]);
        // setDefaultRoute(DynamicR, path.split('/')[1], defaultRouter);
        setDefaultRoute(path.split('/')[1]).then(res => {
          if (routeRed != undefined) {
            res = routeRed;
          }
          router.push({
            name: res
          });
        }).catch(res => console.log(res));
      }
    }
    if (type == 'top') { //第一次获取一级菜单
      //routers = recursionRouter(permissionList, dynamicRouter) //这里其实做了一步过滤
      routers =dynamicRouter;
      children = joinRouter(DynamicR, routers, path);
      let topMenu=cloneObj(children[0].children);
      topMenu.forEach((element,i) => {
        if(element.name=='admin'){
          topMenu.splice(i,1);
        }
      });
      commit('SET_TOPMENU', topMenu);
      router.addRoutes(DynamicR);
      commit('SET_PERMISSION', [...DynamicR])
    } else { //从后台读取左边权限  第一次点击一级菜单才会触发
      DynamicR = state.permissionList;
      siderBarRouters(path.split('/')[1]).then(function (res) {
        routers = res;
        children = joinRouter(DynamicR, routers, "/" + path.split('/')[1]);
        state.cacheSiderBar[path] = routers;
        commit('SET_SIDERMENU', state.cacheSiderBar[path]);
        router.addRoutes(DynamicR);
        /* 完整的路由表 */
        commit('SET_PERMISSION', [...DynamicR]);
        setDefaultRoute(path.split('/')[1]).then(res => {
          if (routeRed != undefined) {
            res = routeRed;
          }
          router.push({
            name: res
          });
        }).catch(res => console.log(res));
      }).catch(res=>console.log(res));
    }
  },
  LOGIN({commit,state}, paramObj) {
    return new Promise((resolve, reject) => {
      let userName = paramObj.userName;
      let password = paramObj.password;
      let expires = paramObj.expires;
      axios({
        method: "get",
        url: "DataService.svc/Login",
        // baseURL: '',
        params: {
          userName: userName,
          Pwd: password
        }
      }).then(res => {
        let data = res.data;
        let dataArr = JSON.parse(data);
        dataArr[0].expires = expires;
        if (dataArr.length == 0) {
          resolve("error");
        } else {
          let dataObj = JSON.stringify(dataArr[0]);
          // dataObj.expires=expires;
          commit('SETCOOKIES', dataObj)
          resolve("ok");
        }
      }).catch(res => {
        console.log(res);
        resolve("error");
      })
    })
  },
  UpdateVisit({commit,state}) {
    let ip = returnCitySN.cip;
    let access="readearth";
    if(state.UserToken!=null){
      access = state.UserToken.Account;
    }
    let location = returnCitySN.cname;
    axios({
      method: "get",
      url: "DataService.svc/UpdateVisit",
      params: {
        access: access,
        ip: ip,
        location: location
      }
    }).then(res => console.log(res.data)).catch(res => console.log(res.log))
  }
}
