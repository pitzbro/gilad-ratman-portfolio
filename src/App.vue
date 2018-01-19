<template>
  <div id="app">
    <header>
      <router-link to="/"><h1>Gilad Ratman</h1></router-link>
      <h2 v-for="(topography, index) in topographies" v-if="!project || topography.alias === project">
        {{topography.name}}
        <span v-if="!project && index < topographies.length - 1"> | </span>
      </h2>
    </header>
    <router-view></router-view>
    <topography v-show="project" :project="project"></topography>
  </div>
</template>

<script>

// Components
import Topography from './components/topography';
// Topographies
import topographies from '@/services/topography/topographies'

export default {

  name: 'app',

  components: {
    Topography
  },

  data() {
    return {
      topographies,
      project: null
    }
  },
  methods: {
    // showTopography() {
    //   console.log('loaded');
    // }
  },
  watch: {
    '$route' (to, from) {
      this.project = this.$route.params.alias;
    }
  },
  
  mounted() {
    this.project = this.$route.params.alias;
  }
}
</script>

<style>

</style>
