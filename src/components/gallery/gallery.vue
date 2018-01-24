<template lang="html">

  <router-link tag="section" class="modal-bg" :to="`/project/${alias}`">
    <div class="modal" @click.stop="" v-if="galleryContent" v-html="galleryContent"></div>
  </router-link>

</template>

<script lang="js">


  export default  {
    name: 'gallery',
    data() {
      return {
        alias: null,
        num: null,
        galleryContent: null
      }
    },
    methods: {
      getContents() {
        fetch(`/static/projects/${this.alias}/gallery/${this.num}/content.html`)
          .then( response => response.text())
            .then( text => this.galleryContent = text);
      },
      backToProject() {
        router.push(`/project/${alias}`);
      }
    },
    mounted() {
      this.alias = this.$route.params.alias;
      this.num = this.$route.params.num;
      console.log('alias:', this.alias, 'num:', this.num)
      this.getContents()
    }
}
</script>

<style scoped lang="scss">

</style>
