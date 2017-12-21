import Axios from 'axios';

export default {

  methods: {
    get: function (endpoint) {
      return new Promise(async (resolve, reject) => {

        //-- If this data is already cached, just use that.
        if(this.$store.state.requestCache[endpoint] !== undefined) {
          resolve(this.$store.state.requestCache[endpoint]);
        }

        //-- Otherwise, retrieve it from the specified endpoint.
        try {
          let data = await Axios.get(endpoint);
          this.$store.commit('requestCache/save', {
            endpoint,
            data
          });

          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    }
  }
}
