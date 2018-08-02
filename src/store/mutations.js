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
  }
}
