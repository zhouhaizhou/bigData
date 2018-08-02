import { fetchPermission } from '@/utils/permission'
import router, { DynamicRoutes } from '@/router/index'
import { recursionRouter, setDefaultRoute,getContainer,joinRouter } from '@/utils/recursion-router'
import dynamicRouter,{siderBarRouters} from '@/router/dynamic-router'


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
  FETCH_PERMISSION({commit,state},paramObj) {
    let type=paramObj.type;
    let path=paramObj.path;
    let routers=null;
    let DynamicR=DynamicRoutes;
    let permissionList=null;
    let routerTo=paramObj.router;
    if(type=='top'){
      permissionList =  fetchPermission("");
      routers = recursionRouter(permissionList, dynamicRouter)   //这里其实做了一步过滤
    }else{
     // permissionList = fetchPermission("siderBar");
      routers=siderBarRouters(path);
      DynamicR=state.permissionList;
    }
    /*  根据权限筛选出我们设置好的路由并加入到path=''的children */
   // let MainContainer = DynamicR.find(v => v.path === path)
   // let MainContainer =getContainer(DynamicR,path,null);
    let children=joinRouter(DynamicR,routers,path);
    /* 生成顶部导航菜单 */
    if(type=='top'){
      commit('SET_TOPMENU', children[0].children);
      
    }else{
      commit('SET_SIDERMENU', routers);
      
    }
    setDefaultRoute(routers)
    /*  初始路由 */
   let initialRoutes = router.options.routers;

    /*  动态添加路由 */
    router.addRoutes(DynamicRoutes);
    /* 完整的路由表 */
    commit('SET_PERMISSION', [ ...DynamicRoutes])
  }
}
