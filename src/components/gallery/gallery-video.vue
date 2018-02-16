<template lang="html" class="videoWrapper">

<div class="videoContainer" :style="{ width: videoWidth }">

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
                computedWidth = '80%'
                break;
            case '53.1%':
                console.log('aspect 53.1')
                computedWidth = '75%'
                break;
            case '72.1%':
                console.log('aspect 72.1')
                computedWidth = '55%'
                break;
            default:
                console.log('aspect default')
                computedWidth = '75%'
        }
        return computedWidth;
      }
    },
}
</script>

<style scoped lang="scss">

</style>
