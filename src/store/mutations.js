module.exports = {
  SET_PERMISSION(state, routes) {
    state.permissionList = routes;
  },
  CLEAR_PERMISSION(state) {
    state.permissionList = null
  },
  SET_SIDERMENU(state, menu) {
    state.sidebarMenu = menu
  },
  SET_TOPMENU(state, menu) {
    state.topbarMenu = menu
  },
  CLEAR_MENU(state) {
    state.sidebarMenu = []
  },
  SET_CURRENT_MENU(state, currentMenu) {
    state.currentMenu = currentMenu
  },
  setCrumbList(state, list) {
    state.crumbList = list
  },
  SETLOCALCITY(state, cityName) {
    state.localCity = cityName;
  },
   SETNAVHEIGHT(state,val){
    state.navHeight=val;
  },
  SETSELECTEDTIME(state,val){
    state.selectedTime=val;
  },
  SETPLAYINTERVAL(state,val){
    state.playInterval=val;
  },
  SETCHANGEUSER(state,val){
    state.changeUser=val;
  },
  SETCOOKIES(state,val){
    let obj=JSON.parse(val);
    let expires=obj.expires;
    if(state.UserToken == null || (obj.Account!=state.UserToken.Account)){
      state.changeUser=true;
    }
    state.UserToken=obj;
    $cookies.set('UserToken',val,expires)
    //$cookies.set('UserToken',val,'7D')
  },
  GETCOOKIES(state){
    if($cookies.isKey("UserToken")){
      let UserToken = $cookies.get("UserToken");
      state.UserToken=UserToken;
    }
  },
  REMOVECOOKIES(state){
    $cookies.remove("UserToken");
  },
  setMainHeight(state,obj){
    let self=obj.self;
    let ref=obj.ref;
    let headerH=state.navHeight;
    let footerH=document.querySelector('.foot-wrap').scrollHeight;
    let pageH=document.documentElement.clientHeight;
    let mainContentH=obj.contentH;
    let bottom=pageH-headerH-footerH-mainContentH;
    if(bottom>0){
      self.$refs[ref].style.marginBottom=bottom+'px'
      mainH=mainContentH;
    }
  },
  /**
 * 控制中间部分的高度
 */
setContainerHeight() {
  //       window.innerHeight  页面可视区域的高度（包含横向滚动条）
  //document.body.clientHeight等价于document.documentElement.clientHeight 页面可视区域的高度（不包含横向滚动条）
  // document.querySelector(".header").clientHeight   头部高
  // document.querySelector(".el-main").clientHeight   中间高
  // document.querySelector(".foot-wrap").clientHeight  尾部高
  let pageHeight = document.documentElement.clientHeight;
  let headerHeight = document.querySelector(".header").clientHeight;
  let midHeight = document.querySelector(".el-main").clientHeight;
  let footHeight = document.querySelector(".foot-wrap").clientHeight;

  let dHeight = headerHeight + midHeight + footHeight - pageHeight;
  if (dHeight <= 0) {
    midHeight = pageHeight - headerHeight - footHeight;
    document.querySelector(".el-main").style.height = midHeight + "px";
  }
}
}
