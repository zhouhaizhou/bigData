module.exports = {
  SET_PERMISSION(state, routes) {
    state.permissionList = routes
  },
  CLEAR_PERMISSION(state) {
    state.permissionList = null
  },
  SET_MENU(state, menu) {
    state.sidebarMenu = menu
  },
  CLEAR_MENU(state) {
    state.sidebarMenu = []
  },
  SET_CURRENT_MENU(state, currentMenu) {
    state.currentMenu = currentMenu
  }
}
