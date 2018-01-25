<template>
  <div id="app">

    <router-link to="/" v-if="alias">home</router-link>
    <header v-if="!alias">
      <router-link to="/">
        <h1>Gilad Ratman</h1>
      </router-link>
      <span v-for="(topography, index) in topographies">
        {{topography.name}}
        <span v-if="!alias && index < topographies.length - 1"> | </span>
      </span>
    </header>

    <header v-else>
      <h1>{{alias}}</h1>
      <span>{{subtitle}}</span>
    </header>

    <router-view></router-view>

    
    <topography v-show="isLoaded" :project="alias" @animationLoaded="animationLoaded"></topography>


  </div>
</template>

<script>

// Components
import Topography from './components/topography';
// Topographies
import topographies from '@/services/topography/topographies'
import { getSubtitle } from '@/services/topography/topographies';

export default {

  name: 'app',

  components: {
    Topography
  },

  data() {
    return {
      topographies,
      isLoaded: false,
      alias: null,
      subtitle: null
    }
  },
  methods: {
    animationLoaded(isLoaded) {
      this.isLoaded = isLoaded;
    }
  },

  watch: {
    '$route' (to, from) {
      this.alias = this.$route.params.alias;
      if (this.alias) {
        this.subtitle = getSubtitle(this.alias)
      } else {
        this.isLoaded = false;
      }
    }
  },
  
  mounted() {
    this.alias = this.$route.params.alias;
      if (this.alias) {
        this.subtitle = getSubtitle(this.alias)
      }
  }
}
</script>

<style>

</style>
