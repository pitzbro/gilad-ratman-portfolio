<template lang="html">

  <section>
    <button @click="toggleCredits" class="credits-btn">

      <!-- <svg v-if="!credits" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         fill="#fff" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
        <path id="info-6-icon" d="M255.961-94.731 M255.961,609.811 M255.961-94.731 M248.674,503.302
        c-59.867,21.037-109.219-3.088-99.319-60.581c9.904-57.507,66.711-180.613,74.816-203.893c8.098-23.282-7.432-29.663-24.078-20.189
        c-9.601,5.54-23.87,16.641-36.119,27.43c-3.396-6.841-8.174-14.656-11.761-22.142c19.989-20.03,53.401-46.886,92.957-56.62
        c47.26-11.666,126.25,6.982,92.299,97.316c-24.244,64.388-41.388,108.815-52.193,141.903c-10.797,33.103,2.027,40.041,20.932,27.145
        c14.768-10.082,30.5-23.797,42.032-34.433c5.337,8.671,7.042,11.436,12.32,21.399C340.544,441.157,288.178,489.175,248.674,503.302z
          M372.711,105.016c-27.152,23.113-67.398,22.612-89.913-1.127c-22.509-23.729-18.755-61.704,8.394-84.822
        c27.148-23.109,67.405-22.608,89.913,1.115C403.613,43.919,399.86,81.894,372.711,105.016z"/>
      </svg> -->
      <span v-if="!credits">Credits</span>

      <span v-else>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fff" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve">
          <g id="close">
            <polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3     214.2,178.5   "/>
          </g>
        </svg>
      </span>

      </button>

    <transition name="fade">
      <section v-if="credits" class="credits-wrapper" @click="toggleCredits">
        <div class="credits" @click.stop>
          <p><img src="/static/img/logos/hapais-logo-white-long.png"/></p>
          <p>The catalog was produced with the support of the <strong>Israel Lottery Council For Culture & Arts</strong></p>
          <p>Site by <a href="http://asioren.co.il/" target="_blank"><strong>Asi Oren</strong></a></p>
          <p>3D Modeling <strong>David Chaki</strong></p>
          <p>Advisor <strong>Nir Harel</strong></p>
          <p>Array and textureless GLSL 3D simplex noise function by <strong>Ian McEwan, Ashima Arts</strong></p>
        </div>
      </section>
    </transition>

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
        credits: false,
        topographies
      }
    },
    methods: {
      toggleCredits() {
        this.credits = !this.credits;
        this.$emit('toggleCredits');
      }
    }
}
</script>

<style scoped lang="scss">

</style>
