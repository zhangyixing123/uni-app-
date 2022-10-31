import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import tabbar from './modules/tabbar';
import user from './modules/user'

const store = new Vuex.Store({
  modules: {
    tabbar,
	user
  }
});

export default store;