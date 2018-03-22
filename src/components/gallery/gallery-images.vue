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

    <div @mousemove="followCursor" class="full-pager flex"> 
      <div class="full-pager-prev prev" 
           @mouseover="hoverText = '-'"  
           @mouseout="hoverText = ''"
           :class="{ inactive: !currImage }"
           @click.stop="prevImage"></div>
      <div class="full-pager-next next" 
           @mouseover="hoverText = '+'"  
           @mouseout="hoverText = ''"
           :class="{ inactive: galleryEnd }"
           @click.stop="nextImage"></div>
    </div>

    <div class="hover-text" 
         :style="{ left: textHoverx, top: textHovery }">
      {{hoverText}}
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
        textHoverx: 0,
        textHovery: 0,
        hoverText: '',
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
      },
      followCursor(event) {
        this.textHoverx = event.pageX -40 + 'px';
        this.textHovery = event.pageY -20 + 'px';
        console.log('move', event.pageX)
      },
      
      keyPressed(e) {

        var keyCode = e.keyCode;

        switch(keyCode) {
          case 37:
            // left - previouse image
            this.prevImage();
            break;
          case 39:
            // right - next image
            this.nextImage();
            break;
          default:
            // Just any key
            break;
        }
      }
    },
    computed: {
      galleryEnd() {
        return this.currImage >= this.galleryNum-1;
      },
      // prevWidth() {
      //   if (this.currImage === 0) return 0;
      //   else if (this.galleryEnd) return '100%';
      //   else return '50%';
      // },
      // nextWidth() {
      //   if (this.currImage === 0) return '100%';
      //   else if (this.galleryEnd) return 0;
      //   else return '50%';
      // }
    },
    watch: {
      galleryEnd(newgalleryEnd, oldgalleryEnd) {
        bus.$emit('galleryEndChange', newgalleryEnd)
      }
    },
    mounted() {

      // Global Keyboard Event Listener
      window.addEventListener('keyup', this.keyPressed);

      bus.$on('nextImage', ()=> {
        this.nextImage()
      }) 
    },
    destroyed() {
      // Global Keyboard Event Remover
      window.removeEventListener("keyup", this.keyPressed);
    },
}
</script>

<style scoped lang="scss">

  .caption {
    text-align: end;
    padding-top: 10px;
  }

  .hover-text {
    position: fixed;
    font-family: "Assistant", sans-serif;
    color: #fff;
    text-transform: uppercase;
    font-weight: normal;
    font-size: 15px;
    font-size: 40px;
    letter-spacing: 0.2rem;
    text-shadow: 1px 1px black;
  }

  .full-pager {
    position: fixed;
    top: 0;
    left :0 ;
    width: 100%;
    height: 100%;
    z-index: 100;
    
    cursor: none;
    .prev {
      width: 50%;
      height: 100%;
    }
    .next {
      width: 50%;
      height: 100%;
    }
  }

</style>
