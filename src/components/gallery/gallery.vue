<template lang="html">

  <router-link tag="section" class="modal-bg" :to="`/project/${alias}`">
    <!-- <div class="modal" @click.stop="" v-if="galleryContent" v-html="galleryContent"></div> -->
  <component :is="galleryComponent"
             v-if="galleryComponent && (videoId || htmlSrc)" 
             :videoId="videoId"
             :htmlSrc="htmlSrc"
             class="modal"
             :class="[type]" 
             @click.stop=""></component>
  </router-link>

</template>

<script lang="js">

  // Components
  import galleryVideo from '@/components/gallery/gallery-video';
  import galleryText from '@/components/gallery/gallery-text';

  // Services
  import { getGalleryItem } from '@/services/topography/topographies';

  // Bus
  import { bus } from '@/bus.js';


  export default  {
    name: 'gallery',
    components: {
      galleryVideo,
      galleryText
      },
    data() {
      return {
        alias: null,
        num: null,
        item:null,
        type: null,
        galleryComponent: null,
        videoId: null,
        htmlSrc: null,
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

      this.item = getGalleryItem(this.alias, this.num)

      this.type = this.item.type
      this.galleryComponent = 'gallery' + (this.type.charAt(0).toUpperCase() + this.type.slice(1));

      console.log('got this galleryComponent', this.galleryComponent)
      this.videoId = (this.item.id)? this.item.id : null
      this.htmlSrc = `/static/projects/${this.alias}/gallery/${this.num}/${this.item.src}`


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
