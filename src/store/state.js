module.exports = {
  permissionList: null /** 所有路由 */ ,
  sidebarMenu: [] /** 导航菜单 */ ,
  topbarMenu: [],
  currentMenu: '',
  /** 当前active导航菜单 */
  UserToken: null,
  crumbList: [],
  localCity: '',
  cacheSiderBar: {}, //缓存每一个大模块下面的侧面栏
  navHeight: 12
}
// var sidebarMenu=[
//   {
//     component:dataDownLoad,
//     mate:{
//       entityName:'dataDownLoad',
//       name:'数据下载'
//     },
//     children:[],
//   }
// ];
