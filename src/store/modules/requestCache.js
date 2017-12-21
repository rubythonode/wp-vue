export default {
  namespaced: true,

  state: {},

  mutations: {
    save (state, payload) {
      state[payload.endpoint] = payload.data;
    },

    wipe (state) {
      state = {};
    }
  }
}
