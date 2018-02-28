// Services
import { getCurObjects, getIndex } from '@/services/topography/topographies';

// Bus
import { bus } from '@/bus.js';

export default {
  name: 'project',
  data() {
    return {
      idx: null,
      alias: null,
      menuObjects: null,
      showObjects: true
    }
  },
  methods: {
    hideObjects() {
      this.showObjects = false;
    },
    displayObjects() {
      this.showObjects = true;
    },
    getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
    
  },
  computed: {
    objectStyles() {
      var rotateDeg = this.getRandomArbitrary(-30, 30)
      // return { transform: 'rotate(' + rotateDeg + 'deg)' }
      return { transitionDuration: '30s' }
    }
  },
  mounted() {
    this.alias = this.$route.params.alias;
    this.menuObjects = getCurObjects(this.alias);
    this.idx = getIndex(this.alias);

    bus.$on('galleryOn', this.hideObjects) 
    bus.$on('galleryOff', this.displayObjects) 
  }
}