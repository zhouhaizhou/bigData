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
  // SETCOOKIES(state,val){
  //   state.UserToken=val;
  //   $cookies.set('UserToken',val,60 * 60 * 24 * 7)
  // }
}
