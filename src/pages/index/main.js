// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import ElementUI from 'element-ui';
import App from './App'
import router from '../../router'
import store from '../../store'
import _global from  '../../global'
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css';
// import '../../../static/css/home.css'


//Vue.config.productionTip = false

 Vue.use(ElementUI);
 Vue.prototype._global =_global;
 Vue.prototype.axios =axios;
 router.beforeEach((to, from, next) => {
  if (!store.state.UserToken) {
      if (
          to.matched.length > 0 &&
          !to.matched.some(record => record.meta.requiresAuth)
      ) {
          next()
      } else {
          next({ path: '/login' })
      }
  } else {
      if (!store.state.permission.permissionList) {
          store.dispatch('permission/FETCH_PERMISSION').then(() => {
              next({ path: to.path })
          })
      } else {
          if (to.path !== '/login') {
              next()
          } else {
              next(from.fullPath)
          }
      }
  }
})

router.afterEach((to, from, next) => {
  var routerList = to.matched
  store.commit('setCrumbList', routerList)
  store.commit('permission/SET_CURRENT_MENU', to.name)
})
new Vue({
  // el: '#app',
  store,
  router,
  render: h => h(App)
}).$mount('#app');
