// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import ElementUI from 'element-ui';
import App from './App'
import router from '../../router'
import store from '../../store'
import _global from '../../global'
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css';
var root = process.env.API_ROOT;
axios.defaults.baseURL=root;
 Vue.use(ElementUI);
 Vue.prototype._global =_global;
 Vue.prototype.axios =axios;
router.beforeEach((to, from, next) => {
  if (!store.state.UserToken) {
    // if (to.matched.length > 0 &&!to.matched.some(record => record.meta.requiresAuth)) {
    //     next()
    // } 
    let flag = false;
    if ((to.meta.firstLoad == undefined && to.name==null) || to.meta.firstLoad == true) {
      flag = true;
      to.meta.firstLoad = false;
    }
    if (!store.state.permissionList) { 
      store.dispatch('FETCH_PERMISSION', {
        type: "top",
        path: '/',
        router: to,
        flag:flag,
      }).then(() => {
        next({
          path: to.path
        })
      })
    } else { 
      if (to.path !== '/') {
        store.dispatch('FETCH_PERMISSION', {
          type: "siderBar",
          path: to.path,
          router: to,
          flag:flag
        }).then(() => {
          next()
        })
      } else {
        next(from.fullPath)
      }
    }
  }
})

router.afterEach((to, from, next) => {
  var routerList = to.matched
  store.commit('setCrumbList', routerList)
  store.commit('SET_CURRENT_MENU', to.name)
})
 
var vm = new Vue({
  // el: '#app',
  store,
  router,
  render: h => h(App)
}).$mount('#app');
