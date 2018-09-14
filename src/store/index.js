import Vue from 'vue'
import Vuex from 'vuex';
import VueCookies from 'vue-cookies'
import state from './state'
import getters from './mutations'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

