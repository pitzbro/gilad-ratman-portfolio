<template>
  <div id="app">

    <div class="narrow-msg">
      <img src="/static/projects/multipillory/objects/2.gif" class="audio-object"/>
      <h2>TOO NARROW!</h2>
      <p>This app requires a minimum 840 X 600 pixel resolution</p>
    </div>

    <transition name="fade">

      <header v-if="!credits">

        <div v-if="!alias">

          <div class="header-menu">

            <router-link to="/">
              <h1>Gilad Ratman | גלעד רטמן</h1>
            </router-link>

            <span v-for="(topography, index) in topographies">
              {{topography.name}}
              <span v-if="!alias && index < topographies.length - 1"> | </span>
            </span>

          </div>

        </div>

        <div v-else>
          <h1>{{name}} </h1>
          <span> {{subtitle}}</span>
        </div>

      </header>
    
    </transition>

    <transition name="fade">
     <project-nav v-if="!isLoaded" class="front front-menu" @toggleCredits="toggleCredits"></project-nav>
    </transition>

    
    <topography v-show="isLoaded" :project="alias" @animationLoaded="animationLoaded"></topography>


  </div>
</template>

<script>
// Components
import Topography from "./components/topography";
import ProjectNav from "./components/project-nav/project-nav";
// Topographies
import topographies from "@/services/topography/topographies";
import { getSubtitle } from "@/services/topography/topographies";
import { getName } from "@/services/topography/topographies";

export default {
  name: "app",

  components: {
    Topography,
    ProjectNav
  },

  data() {
    return {
      topographies,
      isLoaded: false,
      credits: null,
      alias: null,
      subtitle: null,
      name: null
    };
  },
  methods: {
    animationLoaded(isLoaded) {
      this.isLoaded = isLoaded;
    },
    toggleCredits() {
      this.credits = !this.credits;
    }
  },

  watch: {
    $route(to, from) {
      this.alias = this.$route.params.alias;
      if (this.alias) {
        this.subtitle = getSubtitle(this.alias);
        this.name = getName(this.alias);
      } else {
        this.isLoaded = false;
      }
    }
  },

  mounted() {
    this.alias = this.$route.params.alias;
    if (this.alias) {
      this.subtitle = getSubtitle(this.alias);
      this.name = getName(this.alias);
    }
  }
};
</script>

<style>

</style>
