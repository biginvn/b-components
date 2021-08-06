// import jvectormap from 'jvectormap';
export default {
  data() {
    return {
      jVectorMap: null,
    }
  },

  props: ['id', 'map-config'],

  created() {},

  mounted() {
    if (this.id != undefined || this.id != null) this.initMap(this.id)
    else
      console.log(
        'Developer use B-JBectorMap must be transfer argument id to props!'
      )
  },

  watch: {
    value(value) {},
    mapConfig(value) {
      this.updateMap(this.id)
    },
    'mapConfig.map'(value) {
      this.updateMap(this.id)
    },
    'mapConfig.markers'(value) {
      this.updateMap(this.id)
    },
    'mapConfig.series'(value) {
      this.updateMap(this.id)
    },
    'mapConfig.series.regions'(value) {
      this.updateMap(this.id)
    },
    'mapConfig.series.markers'(value) {
      this.updateMap(this.id)
    },
  },

  methods: {
    initMap(id) {
      let Vue = this
      this.jVectorMap = $('#' + id).vectorMap(
        Object.assign({}, {}, Vue.mapConfig ? Vue.mapConfig : {})
      )
    },
    updateMap(id) {
      $('#' + id + ' .jvectormap-container').remove()
      this.initMap(id)
    },
  },
}
