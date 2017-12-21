import Vue from 'vue';
import Vuex from 'vuex';
import requestCache from './modules/requestCache';
import bus from '../bus';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    endpoint: REST_ENDPOINT
  },

  mutations: {
    updateEndpoint (state, endpoint) {
      state.endpoint = endpoint;
    }
  },

  modules: {
    requestCache
  }
});
