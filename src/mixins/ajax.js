import Axios from 'axios';

export default {

  methods: {
    /**
     * For every GET request, save the contents by the endpoint memory as they'r returned.
     * @param  {string} path The endpoint
     * @return {Promise}
     */
    get: function (path) {
      return new Promise(async (resolve, reject) => {

        //-- If this data is already cached, just use that.
        if(this.$store.state.cache[path] !== undefined) {
          resolve(this.$store.state.cache[path]);
        }

        //-- Otherwise, retrieve it from the specified path.
        try {
          let data = await Axios.get(this.$store.state.endpoint + path);

          this.$store.commit('cache/saveRequest', {
            path,
            data
          });

          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    },

    /**
     * For every post requested, first check if it's already in memory.
     * @param  {string} slug The post slug.
     * @return {Promise}
     */
    getPost: function (slug) {
      return new Promise(async (resolve, reject) => {

        //-- Check if we already have this post cached.
        if(this.$store.state.cache.posts[this.$route.params.slug] !== undefined) {
          resolve(this.$store.state.cache.posts[this.$route.params.slug]);
        }

        let response = await this.get(`/posts?slug=poop`);

        if(response.data.length) {
          resolve(response.data);
        }

        reject('Post not found.');
      });
    }
  }
}
