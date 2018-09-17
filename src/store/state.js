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
  playInterval:null,
  changeUser:false,   //判断用户是否用另一个账户登录，如果变化，怎需要重新拉去权限,false表示没有更改
  loginTxt:'登录'
}
