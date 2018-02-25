<template lang="html" class="videoWrapper">

  <section>
    <div class="image-gallery" @click.stop="nextImage" :class="{ end: galleryEnd }">
      <img v-for="(n, index) in galleryNum" 
           :src="`${projectFolder}images/${index}.png`" 
           :class="{ active: index <= currImage}">

    </div>
    <div class="galleryPager">
      {{currImage + 1}} / {{galleryNum}}
      <button :class="{ inactive: !currImage }" @click.stop="prevImage">PREV</button> | 
      <button @click.stop="nextImage" :class="{ inactive: galleryEnd }">NEXT</button>

    </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'image-gallery',
    props: ['galleryNum', 'projectFolder'],
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
        return (this.currImage >= this.galleryNum-1) ? true : false;
      }
    }
}
</script>

<style scoped lang="scss">

  button {
    color: #fff;
    &:hover {
      text-decoration: underline;
    }
    &.inactive {
      color: grey;
      &:hover {
        cursor: default;
        text-decoration: none;
      }
    }
  }

</style>
