<template lang="html">

  <img :src="`/static/img/objects/001/${srcNum}.png`" />

</template>

<script lang="js">

// import topographies from '@/services/topography/topographies';

  export default  {
    name: 'object',
    data() {
      return {
        srcNum: 1
      }
    },
    methods: {
      animateObj() {
        this.srcNum = (this.srcNum >= 25)? 1 : this.srcNum + 1;
        // if (this.srcNum >= 25) {
        //   console.log('big')
        // } else {
        //   console.log('small')

        // }
      }
    },
    mounted() {
      setInterval(this.animateObj, 150);
    }
}
</script>

<style scoped lang="scss">

</style>
