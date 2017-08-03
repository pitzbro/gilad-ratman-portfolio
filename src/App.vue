<template>
  <div id="app">
    <header>
      <router-link to="/"><h1>Gilad Ratman</h1></router-link>
      <h2>Four Works</h2>
    </header>
    <router-view></router-view>
    <topography></topography>
  </div>
</template>

<script>

//Components
import Topography from './components/topography';

export default {
  name: 'app',
  data() {
    return {
      project: null
    }
  },
  methods: {
    // showTopography() {
    //   console.log('loaded');
    // }
  },
  components: {
    Topography
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
