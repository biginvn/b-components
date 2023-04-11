import baseComponent from '../mixins/text-field-mixins'

export default {
  data() {
    return {
      text: '',
    }
  },
  mixins: [baseComponent],
  props: {
    cols: {},
    rows: {},
    isViewMode: {
      // type: Boolean,
      default: false,
    },
    hasPreView: {
      // type: Boolean,
      default: false,
    },
    nullPrePlaceholder: {
      default: '-',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value(val) {
      this.updateText(this.value)
    },
  },
  computed: {
    isViewPre() {
      if (this.isViewMode && this.hasPreView) return true
      return false
    },
    contentPreview() {
      if (this.value == null || this.value == '') return this.nullPrePlaceholder
      return this.value
    },
  },
  methods: {
    change(value) {
      this.updateFloatLabel(value)
      this.updateText(value)
      this.$emit('input', value)
    },
    updateText(value) {
      this.text = value || ''
      this.$el.querySelector('textarea').value = this.text
      if (value == undefined || value == null)
        this.$el.querySelector('textarea').value = ''
    },
  },
}
