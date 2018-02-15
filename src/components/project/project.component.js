import { getCurObjects } from '@/services/topography/topographies';
import { getIndex } from '@/services/topography/topographies';

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
    }
  },
  mounted() {
    this.alias = this.$route.params.alias;
    this.menuObjects = getCurObjects(this.alias);
    this.idx = getIndex(this.alias);

    console.log('project component got idx', this.idx)

    bus.$on('galleryOn', this.hideObjects) 
    bus.$on('galleryOff', this.displayObjects) 
  }
}