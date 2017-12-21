import Vue from 'vue';
import Vuex from 'vuex';
import requestCache from './modules/requestCache';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    requestCache
  }
});
