import { getCurObjects } from '@/services/topography/topographies';

export default {
  name: 'project',
  props: ['isLoaded'],
  data() {
    return {
      alias: null,
      menuObjects: null
    }
  },
  watch: {
    isLoaded(newLoaded, oldLoaded) {
      console.log('am I Loaded?', newLoaded);
    }
  },
  mounted() {
    this.alias = this.$route.params.alias;
    this.menuObjects = getCurObjects(this.alias);
  }
}