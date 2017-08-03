<template lang="html">

  <section>
    <ul class="clean-list menu project-menu">
        <li v-for="topotopography in topographies"><router-link :to="`/project/${topotopography.alias}`">{{topotopography.name}}</router-link></li>
    </ul>
  </section>

</template>

<script lang="js">

import topographies from '@/services/topography/topographies';

  export default  {
    name: 'project-nav',
    data() {
      return {
          topographies
      }
    }
}
</script>

<style scoped lang="scss">

</style>
