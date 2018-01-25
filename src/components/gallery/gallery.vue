<template lang="html">

  <router-link tag="section" class="modal-bg" :to="`/project/${alias}`">

  <transition name="slideUp">

    <component :is="galleryComponent"
              v-if="galleryComponent && (videoId || htmlSrc)" 
              :videoId="videoId"
              :htmlSrc="htmlSrc"
              class="modal"
              :class="[type]" 
              @click.stop=""></component>

  </transition>

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
        animationTimeout: null
      }
    },
    methods: {
      stopAnimation() {

        if(this.num) {
          this.animationTimeout = setTimeout(() => {
            bus.$emit('stopAnimation');
          }, 1000);
        }
      }
    },

    mounted() {
      this.alias = this.$route.params.alias;
      this.num = this.$route.params.num;

      this.item = getGalleryItem(this.alias, this.num)

      this.type = this.item.type
      this.galleryComponent = 'gallery' + (this.type.charAt(0).toUpperCase() + this.type.slice(1));

      this.videoId = (this.item.id)? this.item.id : null
      this.htmlSrc = `/static/projects/${this.alias}/gallery/${this.num}/${this.item.src}`

      console.log('emitting galleryOn')

      bus.$emit('galleryOn');
      bus.$on('loadedAnimation', this.stopAnimation)

    },
    beforeDestroy() {
      bus.$emit('galleryOff');
      clearTimeout(this.animationTimeout);
      this.animationTimeout = null;
      this.num = null;
    }
}
</script>

<style scoped lang="scss">

</style>
