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
        textContent: '',
        lang: 'english'
      }
    },
    methods: {

      fetchText(lang) {
        return fetch(`${this.htmlSrc}${lang}.html`)
          .then( response => response.text())
            .then( text => this.textContent = text);       
      },

      toggleLanguage() {
        this.textContent = '';
        var lang = (this.lang === 'english')? 'hebrew' : 'english';
        this.fetchText(lang)
          .then( this.lang = lang )    
      }

    },
    computed: {
      langButton() {
        return (this.lang === 'english')? 'עברית' : 'ENG';
      }
    },
    mounted() {
      this.fetchText('english');
    }
}
</script>

<style scoped lang="scss">

</style>
