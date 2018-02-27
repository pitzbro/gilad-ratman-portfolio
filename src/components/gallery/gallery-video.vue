<template lang="html" class="videoWrapper">

<div class="video-container" :style="{ width: videoWidth }">

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
    props: ['videoId', 'aspectRatio'],
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
}
</script>

<style scoped lang="scss">

</style>
