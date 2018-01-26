<template lang="html" class="videoWrapper">

<div class="videoContainer">

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
}
</script>

<style scoped lang="scss">

</style>
