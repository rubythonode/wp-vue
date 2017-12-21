import Axios from 'axios';

export default {

  methods: {
    get: function (path) {
      return new Promise(async (resolve, reject) => {

        //-- If this data is already cached, just use that.
        if(this.$store.state.requestCache[path] !== undefined) {
          resolve(this.$store.state.requestCache[path]);
        }

        //-- Otherwise, retrieve it from the specified path.
        try {
          let data = await Axios.get(this.$store.state.endpoint + path);

          this.$store.commit('requestCache/saveRequest', {
            path,
            data
          });

          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    },

    getPost: function (slug) {

      return new Promise(async (resolve, reject) => {

        if(this.$store.state.requestCache.posts[this.$route.params.slug] !== undefined) {
          resolve(this.$store.state.requestCache.posts[this.$route.params.slug]);
        }

        let response;

        response = await this.get(`/posts?slug=poop`);

        if(response.data.length) {
          resolve(response.data);
        }

        reject('Post not found.');
      });
    }
  }
}
