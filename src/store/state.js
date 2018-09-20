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
  funReturn:false,   //数据下载锚点定位的时候点击下一个的时候上次动画还没执行完，设置函数停止执行，开始本次动画
  anchorTimer:null
}
