<template>
  <div id="app">
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
