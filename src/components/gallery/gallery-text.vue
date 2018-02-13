<template lang="html">

  <div class="modal main-text" @click.stop="" v-if="textContent" :class="[lang]">
    <button class="lang-switcher" @click="toggleLanguage" v-text="langButton"></button>
    <div class="text-wrapper">
      <div v-html="textContent" class="text-content"></div>
    </div>
  </div>

</template>

<script lang="js">

  export default  {
    name: 'text',
    props: ['htmlSrc'],
    data() {
      return {
        textContent: null,
        lang: 'english'
      }
    },
    methods: {

      fetchText() {
        fetch(`${this.htmlSrc}${this.lang}.html`)
          .then( response => response.text())
            .then( text => this.textContent = text);       
      },

      toggleLanguage() {
        this.lang = (this.lang === 'english')? 'hebrew' : 'english';
        this.fetchText();
      }

    },
    computed: {
      langButton() {
        return (this.lang === 'english')? 'עברית' : 'ENG';
      }
    },
    mounted() {
      this.fetchText();
    }
}
</script>

<style scoped lang="scss">

</style>
