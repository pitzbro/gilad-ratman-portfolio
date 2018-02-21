<template lang="html">

  <router-link tag="section" class="modal-bg" :to="`/project/${alias}`">

  <transition name="slideUp">

    <component :is="galleryComponent"
              v-if="galleryComponent && (videoId || htmlSrc)" 
              :videoId="videoId"
              :aspectRatio="aspectRatio" 
              :htmlSrc="htmlSrc"
              :galleryNum="galleryNum" 
              :projectFolder="projectFolder" 
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
  import galleryImages from '@/components/gallery/gallery-images';

  // Services
  import { getGalleryItem } from '@/services/topography/topographies';

  // Bus
  import { bus } from '@/bus.js';


  export default  {
    name: 'gallery',
    components: {
      galleryVideo,
      galleryText,
      galleryImages
      },
    data() {
      return {
        alias: null,
        num: null,
        item:null,
        type: null,
        galleryComponent: null,
        videoId: null,
        aspectRatio: null,
        htmlSrc: null,
        galleryNum: null,
        projectFolder: null
      }
    },

    mounted() {
      this.alias = this.$route.params.alias;
      this.num = this.$route.params.num;

      this.item = getGalleryItem(this.alias, this.num)

      this.type = this.item.type
      this.galleryComponent = 'gallery' + (this.type.charAt(0).toUpperCase() + this.type.slice(1));

      this.videoId = (this.item.id)? this.item.id : null
      this.aspectRatio = (this.item.aspectRatio)? this.item.aspectRatio : null
      this.htmlSrc = `/static/projects/${this.alias}/texts/`
      this.projectFolder = `/static/projects/${this.alias}/`
      this.galleryNum = (this.item.num)? this.item.num : null

      bus.$emit('galleryOn', `/project/${this.alias}`);
    },
    beforeDestroy() {
      bus.$emit('galleryOff');
    }
}
</script>

<style scoped lang="scss">

</style>
