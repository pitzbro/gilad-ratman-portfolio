<template lang="html" class="videoWrapper">

  <section>
    <div class="image-gallery" @click.stop="nextImage" :class="{ end: galleryEnd }">
      <img v-for="(n, index) in galleryNum + 1" 
           :src="`${projectFolder}images/${index}.png`" 
           :class="{ active: index <= currImage}">

    </div>
    <div v-if="!galleryEnd">
      <!-- <button @click.stop="nextImage">Next image ❯</button>  -->
      {{currImage + 1}} / {{galleryNum}}</div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'image-gallery',
    props: ['galleryNum', 'projectFolder'],
    data() {
      return {
        currImage: 0,
        galleryEnd: false
      }
    },
    methods: {
      nextImage() {
        if (this.currImage >= this.galleryNum-2) {
          this.galleryEnd = true;
          this.currImage++
          return
        }
        this.currImage++
      }
    }
}
</script>

<style scoped lang="scss">

</style>
