<template lang="html">


  <div class="modal main-text" @click.stop v-if="textContent" :class="[currLang]">
    <div v-if="textSources.length > 1" @click.stop class="text-pager pager cursor-default">
      {{currText + 1}} / {{textSources.length}} | 
      <button :class="{ inactive: !currText }" @click.stop="prevText">PREV</button> | 
      <button @click.stop="nextText" :class="{ inactive: (currText===textSources.length - 1) }">NEXT</button>
    </div>

    <button v-if="languages.length > 1" class="lang-switcher" @click="toggleLanguage" v-text="langButton"></button>

    <div class="text-wrapper">
      <div v-html="textContent" class="text-content"></div>
    </div>

  </div>

</template>

<script lang="js">

  export default  {
    name: 'text',
    props: ['htmlSrc', 'textSources'],
    data() {
      return {
        textContent: '',
        lang: 'english',
        currText: 0,
        langNum: 0,
      }
    },
    methods: {

      fetchText() {
        this.textContent = '';
        return fetch(`${this.htmlSrc}texts-${this.currText}/${this.currLang}.html`)
          .then( response => response.text())
            .then( text => this.textContent = text);       
      },

      toggleLanguage() {
        this.langNum = this.langNum ? 0 : 1;
        this.fetchText()
      },

      nextText() {
        if (this.currText < this.textSources.length -1) {
          this.currText++
          this.fetchText(this.lang)
        }
      },
      prevText() {
        if (this.currText) {
          this.currText--
          this.fetchText(this.lang)
        }
      },

    },
    computed: {
      langButton() {
        return (this.currLang === 'english')? 'עברית' : 'EN';
      },
      languages() {
        return this.textSources[this.currText].languages;
      },
      currLang() {
        return this.textSources[this.currText].languages[this.langNum]
      }   
    },
    mounted() {
      this.fetchText();
    }
}
</script>

<style scoped lang="scss">

</style>
