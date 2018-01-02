import menuObject from '@/components/object/object';

export default {
  name: 'project',
  components: {
    menuObject
  },
  data() {
    return {

    }
  },
  methods: {
  },
  mounted() {
    const alias = this.$route.params.alias;
  }
}