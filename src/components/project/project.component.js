import menuObject from '@/components/object/object';
import { getCurObjects } from '@/services/topography/topographies';

export default {
  name: 'project',
  components: {
    menuObject
  },
  data() {
    return {
      alias: null,
      menuObjects: null
    }
  },
  methods: {
  },
  mounted() {
    this.alias = this.$route.params.alias;
    this.menuObjects = getCurObjects(this.alias);
  }
}