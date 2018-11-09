// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import  '../../utils/api'
import ElementUI, { Alert } from 'element-ui';
import App from './App'
import router from '../../router'
import store from '../../store'
import _global from '../../global'
import VueCookies from 'vue-cookies'
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css';

Vue.use(ElementUI);
Vue.use(VueCookies);

// var root = process.env.API_ROOT;
// axios.defaults.withCredentials=true
// axios.defaults.baseURL=root;
var num=0;
Vue.prototype._global =_global;
Vue.prototype.axios =axios;
router.beforeEach((to, from, next) => {
    store.commit('GETCOOKIES');
    if(from.path=='/'&& to.matched.length==0&&num==0){
      console.log("from"+from);
      console.log("to"+to);
      store.dispatch('UpdateVisit');
      num++;
    }
    (async ()=>{
      if(!store.state.UserToken){
        let params={"userName":"BIGDATA","password":"BIGDATA","expires":"-1D"};
        await store.dispatch('LOGIN',params);
      }
    })().then(res=>{
      let flag = false;
      if(store.state.changeUser&&to.meta.parentEntityName=='/'){
        to.meta.firstLoad=true;   //重新拉去权限
      }
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
    }).catch()

  //}
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
