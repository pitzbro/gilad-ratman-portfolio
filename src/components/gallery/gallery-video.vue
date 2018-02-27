<template lang="html" class="videoWrapper">


<div class="video-container" :style="{ width: videoWidth }">

    <div v-if="videos.length > 1" @click.stop class="video-pager pager cursor-default">
      {{currVideo + 1}} / {{videos.length}}
      <button :class="{ inactive: !currVideo }" @click.stop="prevVideo">PREV</button> | 
      <button @click.stop="nextVideo" :class="{ inactive: (currVideo===videos.length - 1) }">NEXT</button>

    </div>

  <div class="videoWrapper" :style="{ 'padding-bottom': aspectRatio }">

    <iframe :src="`https://player.vimeo.com/video/${videoId}?autoplay=1`"  
            frameborder="0"
            webkitallowfullscreen 
            mozallowfullscreen 
            allowfullscreen>
    </iframe>

  </div>

</div>

</template>

<script lang="js">

  export default  {
    name: 'video',
    props: ['videos'],
    data() {
      return {
        videoId: null,
        aspectRatio: null,
        currVideo: 0
      }
    },
    methods: {
      nextVideo() {
        console.log('this.currVideo', this.videos, 'videos:', this.videos.length)
        if (this.currVideo < this.videos.length) {
          this.currVideo++
          console.log('next to num:', this.currVideo)
          this.changeVideoSrc()
        }
      },
      prevVideo() {
        if (this.currVideo) {
          this.currVideo--
          console.log('prev to num:', this.currVideo)
          this.changeVideoSrc()
        }
      },
      changeVideoSrc() {
        console.log('changing src to num:', this.currVideo)
        this.videoId = this.videos[this.currVideo].id;
        this.aspectRatio = this.videos[this.currVideo].aspectRatio; 
      }
    },
    computed: {
      videoWidth() {
        
        console.log('aspect ratio', this.aspectRatio)
        var computedWidth
        switch(this.aspectRatio) {
            case '25.6%':
                console.log('aspect 25.6')
                computedWidth = '230vh'
                break;
            case '53.1%':
                console.log('aspect 53.1')
                computedWidth = '130vh'
                break;
            case '72.1%':
                console.log('aspect 72.1')
                computedWidth = '95vh'
                break;
            default:
                console.log('aspect default')
                computedWidth = '130vh'
        }
        return computedWidth;
      }
    },
    mounted() {
      if (this.videos && this.videos.length) {
        this.changeVideoSrc()
      }
    }
}
</script>

<style scoped lang="scss">

</style>
