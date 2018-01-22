<template lang="html">

  <h1>THIS IS THE GALLERY MODULE</h1>

</template>

<script lang="js">


  export default  {
    name: 'gallery',
    data() {
      return {
        alias: null,
        num: null
      }
    },
    // methods: {
    //   animateObj() {
    //     this.srcNum = (this.srcNum >= 25)? 1 : this.srcNum + 1;
    //     if (this.srcNum >= 25) {
    //       console.log('big')
    //     } else {
    //       console.log('small')

    //     }
    //   }
    // },
    mounted() {
      this.alias = this.$route.params.alias;
      this.num = this.$route.params.num;
      console.log('alias:', this.alias, 'num:', this.num)
    }
}
</script>

<style scoped lang="scss">

</style>
