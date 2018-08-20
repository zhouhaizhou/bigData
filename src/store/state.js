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
  navHeight: 12,
  selectedTime:null,   //在线展示页面右边选择的时间索引
  playInterval:null
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
