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
  }
}
