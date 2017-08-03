<template>
  <div id="app">
    <router-link to="/"><h1>Gilad Ratman</h1></router-link>
    <h2>Four Works</h2>
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

    }
  },
  methods: {
  },
  components: {
    Topography
  }
}
</script>

<style>

</style>
