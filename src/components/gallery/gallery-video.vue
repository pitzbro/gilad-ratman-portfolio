<template lang="html" class="video">

  <iframe :src="`https://player.vimeo.com/video/${videoId}?autoplay=1`" 
          width="683" 
          height="512" 
          frameborder="0" 
          webkitallowfullscreen 
          mozallowfullscreen 
          allowfullscreen>
  </iframe>

</template>

<script lang="js">

  export default  {
    name: 'video',
    props: ['videoId'],
}
</script>

<style scoped lang="scss">

</style>
