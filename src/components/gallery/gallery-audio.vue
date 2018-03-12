<template lang="html" class="videoWrapper">

<div class="audio-container flex column align-center" @click.stop>

  <img :src="`${projectFolder}objects/${num}.gif`" class="audio-object"/>

  <div class="caption">Lead singers from five heavy metal bands - mixed audio</div>

  <audio ref="audioEl" @volumechange="muteChange" @playing="togglePlay" autoplay loop>
    <source :src="`${projectFolder}audio/audio.mp3`" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>

  <p @click="toggleMute">
    <button v-if="!muted">Mute</button>
    <button v-else>Unmute</button>
  </p>

  <!-- <img v-show="playing && !muted" src="/static/img/eqalizer.gif" class="audio-equalizer"/> -->
  <img :style="{ visibility: visibilityEQ }" src="/static/img/eqalizer.gif" class="audio-equalizer"/>



</div>

</template>

<script lang="js">

  export default  {
    name: 'audio',
    props: ['num', 'projectFolder'],
    data() {
      return {
        playing: false,
        muted: false
      }
    },
    methods: {
      togglePlay() {
        this.playing = true;
      },
      toggleMute() {
        this.$refs.audioEl.muted = !this.muted;
      },
      muteChange() {
        this.muted = !this.muted;
      }
    },
    computed: {
      visibilityEQ() {
        if (this.playing && !this.muted) return 'visible'
        else return 'hidden'
      }
    }
}
</script>

<style scoped lang="scss">
  // .audio-container {
  //   height: 408px;
  // }
  .audio-equalizer {
    width: 60px;
  }

  .caption {
    font-size: 13px;
    margin: 10px 0 30px;
  }
</style>
