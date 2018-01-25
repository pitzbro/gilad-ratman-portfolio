<template lang="html" class="video">

  <iframe :src="`https://player.vimeo.com/video/${videoId}?autoplay=1`" 
          width="640" 
          height="360" 
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
    // data() {
    //   return {
    //     id: null
    //   }
    // },
    // methods: {
    //   getContents() {
    //     fetch(`/static/projects/${this.alias}/gallery/${this.num}/content.html`)
    //       .then( response => response.text())
    //         .then( text => this.galleryContent = text);
    //   },
    //   stopAnimation() {
    //     setTimeout(() => {
    //       bus.$emit('stopAnimation');
    //     }, 1000);
    //   }
    // },
}
</script>

<style scoped lang="scss">

</style>
