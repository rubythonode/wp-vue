export default {
  namespaced: true,

  state: {
    posts: {}
  },

  mutations: {
    saveRequest (state, payload) {
      state[payload.path] = payload.data;
    },

    wipe (state) {
      state = {};
    },

    savePost (state, payload) {
      state.posts[payload.slug] = payload.data;
    }
  },

  actions: {
    savePosts ({ commit, state }, data) {
      data.forEach((item) => {
        commit('savePost', {
          slug: item.slug,
          data: item
        });
      });
    }
  }
}
