<template lang="html">

  <section>

    <ul class="clean-list menu project-menu menu-projects link-list">
          <router-link v-for="(topotopography, index) in topographies" 
                     :to="`/project/${topotopography.alias}`" 
                     :key="index"
                     tag="li"
                     :class="`project project-${index+1} link-list-item`">
          {{topotopography.name}}
          <div :class="`project_topography_thumb topography-${index+1}`">
          </div>
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
