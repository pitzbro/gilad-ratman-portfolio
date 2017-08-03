export default {
  name: 'project',
  data() {
    return {

    }
  },
  methods: {
  },
  mounted() {
    const alias = this.$route.params.alias;
    console.log('got this alias', alias);
  }
}