<template lang="html">

  <router-link tag="section" :class="{ 'cross-hair': type == 'images', 'not-allowed': galleryEnd}" class="modal-bg" :to="hrefLink" @click.native="emitEvent()">

  <transition name="slideUp">

    <component :is="galleryComponent"
              v-if="galleryComponent && (videos || htmlSrc)" 
              :videos="videos"
              :num="num"
              :htmlSrc="htmlSrc"
              :galleryNum="galleryNum" 
              :captions="captions" 
              :textSources="textSources" 
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
  import galleryAudio from '@/components/gallery/gallery-audio';
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
      galleryAudio,
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
        videos: null,
        htmlSrc: null,
        textSources: null,
        galleryNum: null,
        galleryEnd: false,
        captions: null,
        projectFolder: null
      }
    },

    methods: {
      emitEvent() {
        if (this.type === 'images') {
          bus.$emit('nextImage');
        }
      },
      keyPressed(e) {
        var keyCode = e.keyCode;
        if (keyCode === 27) {
          this.$router.push(`/project/${this.alias}`);
        }
      }
    },

    mounted() {
      
      window.addEventListener('keyup', this.keyPressed);

      this.alias = this.$route.params.alias;
      this.num = this.$route.params.num;

      this.item = getGalleryItem(this.alias, this.num)

      this.type = this.item.type
      this.galleryComponent = 'gallery' + (this.type.charAt(0).toUpperCase() + this.type.slice(1));

      this.videos = (this.item.videos)? this.item.videos : null
      this.htmlSrc = `/static/projects/${this.alias}/texts/`
      this.projectFolder = `/static/projects/${this.alias}/`
      this.galleryNum = (this.item.num)? this.item.num : null
      this.captions = (this.item.captions)? this.item.captions : null
      this.textSources = (this.item.textSources)? this.item.textSources : null

      bus.$emit('galleryOn', `/project/${this.alias}`);

      bus.$on('galleryEndChange', (galleryEnd)=> {
        this.galleryEnd = galleryEnd;
      })
    },

    destroyed() {
      window.removeEventListener("keyup", this.keyPressed);
    },

    computed: {
      hrefLink() {
        return (this.type === 'images')? '#' : `/project/${this.alias}`
      }
    },

    beforeDestroy() {
      bus.$emit('galleryOff');
    }
}
</script>

<style scoped lang="scss">

</style>
