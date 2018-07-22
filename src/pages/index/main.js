// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import App from './App'
import router from '../../router'
import store from '../../store'
import _global from '../../global'
import 'animate.css';


//Vue.config.productionTip = false
 //Vue.use(axios);
 Vue.prototype._global =_global;
 Vue.prototype.axios =axios;
/* eslint-disable no-new */
new Vue({
  // el: '#app',
  store,
  router,
  render: h => h(App)
}).$mount('#app');
