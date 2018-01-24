<template lang="html">

  <router-link tag="section" class="modal-bg" :to="`/project/${alias}`">
    <div class="modal" @click.stop="" v-if="galleryContent" v-html="galleryContent"></div>
  </router-link>

</template>

<script lang="js">


  // Bus
  import { bus } from '@/bus.js';


  export default  {
    name: 'gallery',
    data() {
      return {
        alias: null,
        num: null,
        item:null,
        galleryContent: null
      }
    },
    methods: {
      getContents() {
        fetch(`/static/projects/${this.alias}/gallery/${this.num}/content.html`)
          .then( response => response.text())
            .then( text => this.galleryContent = text);
      },
      stopAnimation() {
        setTimeout(() => {
          bus.$emit('stopAnimation');
        }, 1000);
      }
    },
    mounted() {
      this.alias = this.$route.params.alias;
      this.num = this.$route.params.num;

      // this.item = getGalleryItem(this.alias, this.num)


      this.getContents()
      bus.$emit('stopAnimation');
      bus.$on('loadedAnimation', this.stopAnimation)
    },
    beforeDestroy() {
      bus.$emit('startAnimation');
    }
}
</script>

<style scoped lang="scss">

</style>
