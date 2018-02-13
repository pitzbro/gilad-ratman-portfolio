<template lang="html">

  <section>

    <ul class="clean-list menu project-menu menu-projects link-list">
          <router-link v-for="(topotopography, index) in topographies" 
                     :to="`/project/${topotopography.alias}`" 
                     :key="index"
                     tag="li"
                     :class="`project-link project-${index+1} link-list-item`">
        </router-link>
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
