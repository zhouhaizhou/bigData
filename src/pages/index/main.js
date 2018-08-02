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
// import '../../../static/css/home.css'
// import 'babel-polyfill'

//Vue.config.productionTip = false

 Vue.use(ElementUI);
 Vue.prototype._global =_global;
 Vue.prototype.axios =axios;
 
var vm = new Vue({
  // el: '#app',
  store,
  router,
  render: h => h(App)
}).$mount('#app');
