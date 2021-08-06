import baseComponent from '../mixins/base-mixins'
export default {
  data() {
    return {
      classLabel: '',
      error: false,
    }
  },
  mixins: [baseComponent],
  props: ['disabled', 'placeholder', 'label', 'class-name', 'name', 'id'],

  computed: {
    classes() {
      return (this.className ? this.className : '') + ' b__input b__zip__code'
    },
    wrapClass() {
      let defaultClass =
        'b__components b-ios b-float-label b__zip__code__wrapper'
      return (this.error ? 'has-error ' : '') + defaultClass
    },
  },
  mounted() {
    this.change(this.value)
  },
  watch: {
    value() {
      this.blur()
    },
  },
  methods: {
    change(value) {
      this.updateChange(value)
      this.$emit('input', value)
    },
    blur() {
      this.updateValidation(this.value)
      this.updateChange(this.value)
    },
    updateChange(value) {
      var isEmpty =
        value == undefined || value == null || value.length == 0 ? true : false
      if (!isEmpty) {
        this.classLabel = 'active'
      } else this.classLabel = ''
    },
    validate(value) {
      const regex = /^(?!0{3})[0-9]{3,5}$/gm
      var match = regex.exec(value)

      if (match != undefined && match != null && match.length > 0) return true
      return false
    },
    updateValidation(value) {
      if (
        value != undefined &&
        value != null &&
        value.length > 0 &&
        !this.validate(value)
      )
        this.error = true
      else this.error = false
    },
  },
}
