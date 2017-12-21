<template>
  <div>

    <article>

      <router-link :to="{path: '/'}">Back to All Posts</router-link>

      <header>
        <img
          v-if="featured_image"
          :src="featured_image"
        >
        <h1 v-html="title"></h1>
      </header>

      <PostBody :content="content"></PostBody>

    </article>

  </div>
</template>

<script>
  import bus from '../bus';
  import utils from '../mixins/utils';
  import ajax from '../mixins/ajax';
  import PostBody from '../components/PostBody';

  export default {
    name: 'Post',

    mixins: [utils, ajax],

    data () {
      return {
        post: {},
        title: '',
        content: '',
        featured_image: ''
      }
    },

    created: async function () {
      this.post = await this.getPost();
      this.title = this.post.title.rendered;
      this.content = this.post.content.rendered;
      this.featured_image = await this.getFeaturedImage(this.post.featured_media);

      bus.$emit('toggleLoading', false);
    },

    methods: {
      getPost: async function () {
        let response;

        try {
          response = await this.get(`/posts?slug=${this.$route.params.slug}`);
          this.totalPages = response.headers['x-wp-totalpages'];
        } catch (error) {
          bus.$emit('toggleLoading', 'There was an error with the REST request.');
          return null;
        }

        if(response.data[0] === undefined) {
          this.$router.push({name: 'four-o-four'});
        }

        return response.data[0];
      },

      getFeaturedImage: async function (id) {
        let response;

        try {
          response = await this.get(`/media/${id}`);
        } catch (error) {
          return null;
        }

        return response.data.media_details.sizes['medium'].source_url;
      }
    },

    components: {
      PostBody
    }
  }
</script>

<style scoped lang="scss">
  article {
    max-width: 900px;
    margin: 0 auto;
    background: $gray--extraLight;
    padding: 1rem;

    @include media($small) {
      padding: 3rem;
    }
  }

  header {
    text-align: center;
  }

  h1 {
    margin: 2rem 0;
  }

  a {
    display: block;
    margin-bottom: 1rem;
  }
</style>
