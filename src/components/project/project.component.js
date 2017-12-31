import objectLink from '@/components/object/object';

export default {
  name: 'project',
  components: {
    objectLink
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