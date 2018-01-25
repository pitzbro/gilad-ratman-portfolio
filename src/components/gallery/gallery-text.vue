<template lang="html" class="text">

  <div class="modal" @click.stop="" v-if="textContent" v-html="textContent"></div>

</template>

<script lang="js">

  export default  {
    name: 'text',
    props: ['htmlSrc'],
    data() {
      return {
        textContent: null
      }
    },
    mounted() {
      console.log('this is the text component src!!!!!!', this.htmlsrc)
      fetch(this.htmlSrc)
        .then( response => response.text())
          .then( text => this.textContent = text);
    }
}
</script>

<style scoped lang="scss">

</style>
