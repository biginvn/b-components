import baseMixins from './base-mixins'

export default {
  data() {
    return {
      classLabel: '',
    }
  },
  mixins: [baseMixins],
  // props: ['disabled', 'placeholder', 'label', 'class-name', 'name', 'id'],
  props: {
    disabled: {},
    placeholder: {},
    label: {},
    'class-name': {},
    name: {},
    id: {},
  },
  computed: {
    classes() {
      return (this.className ? this.className : '') + ' b__input'
    },
  },
  mounted() {
    this.updateFloatLabel(this.value)
  },
  watch: {
    value(newValue) {
      // Detect when value change will update float label
      this.updateFloatLabel(newValue)
    },
  },
  methods: {
    updateFloatLabel(value) {
      var isEmpty =
        value == undefined || value == null || value == 0 || value == ''
          ? true
          : false
      if (!isEmpty) {
        this.classLabel = 'active'
      } else this.classLabel = ''
    },
  },
}
