<template lang="html" class="videoWrapper">

  <section>
    <div class="image-gallery" @click.stop="nextImage" :class="{ end: galleryEnd }">
      <img v-for="(n, index) in galleryNum" 
           :src="`${projectFolder}images/${index}.png`" 
           :class="{ active: index <= currImage}">

    </div>
    <div class="caption">{{captions[currImage]}}</div>
    <div @click.stop class="gallery-pager pager cursor-default">
      {{currImage + 1}} / {{galleryNum}} | 
      <button :class="{ inactive: !currImage }" @click.stop="prevImage">PREV</button> | 
      <button @click.stop="nextImage" :class="{ inactive: galleryEnd }">NEXT</button>

    </div>
  </section>

</template>

<script lang="js">

  // Bus
  import { bus } from '@/bus.js';

  export default  {
    name: 'image-gallery',
    props: ['galleryNum', 'projectFolder', 'captions'],
    data() {
      return {
        currImage: 0,
        // galleryEnd: false
      }
    },
    methods: {
      nextImage() {
        if (!this.galleryEnd) {
          this.currImage++
        }
      },
      prevImage() {
        if (this.currImage) {
          this.currImage--
        }
      }
    },
    computed: {
      galleryEnd() {
        return this.currImage >= this.galleryNum-1;
      }
    },
    watch: {
      galleryEnd(newgalleryEnd, oldgalleryEnd) {
        bus.$emit('galleryEndChange', newgalleryEnd)
      }
    },
    mounted() {
      bus.$on('nextImage', ()=> {
        this.nextImage()
      }) 
    }
}
</script>

<style scoped lang="scss">

.caption {
  text-align: end;
}

</style>
