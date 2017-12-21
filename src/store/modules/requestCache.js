export default {
  namespaced: true,

  state: {},

  mutations: {
    save (state, payload) {
      state[payload.path] = payload.data;
    },

    wipe (state) {
      state = {};
    }
  }
}
