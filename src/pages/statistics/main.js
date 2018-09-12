// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import statistics from '../../components/pages/statistics/statistics.vue'

Vue.config.productionTip = false
Vue.use(Router)
var router = new Router({
  routes: [{
      path: '/',
      redirect: '/statistics',
    },
    {
      path: '/statistics',
      component: statistics
    }
  ]
})
var vm = new Vue({
  // el: '#app',
  router,
  render: h => h(App)
}).$mount('#app');
