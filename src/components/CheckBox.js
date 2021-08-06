import baseComponent from '../mixins/base-mixins'
export default {
  data() {
    return {
      checkedStore: false,
    }
  },
  mixins: [baseComponent],
  props: [
    'class-name',
    'disabled',
    'id',
    'label',
    'checked',
    'name',
    'bind-value',
  ],
  created() {
    this.updateUIByModel()
  },
  computed: {
    classes() {
      return (this.className ? this.className : '') + ' checkbox__input'
    },
    isChecked: {
      cache: false,
      get() {
        return this.checkedStore
      },
    },
  },
  watch: {
    value() {
      this.updateUIByModel()
    },
  },
  methods: {
    uniqueArray(array) {
      var result = array.filter((item, pos) => {
        return array.indexOf(item) == pos
      })
      return result
    },
    updateUIByModel() {
      if (this.value != undefined || this.value == null) {
        // if this have model, we will compare model and bind-value
        if (this.bindValue && Array.isArray(this.value)) {
          this.checkedStore = this.value.indexOf(this.bindValue) >= 0
          return
        }
        this.checkedStore = this.value
      } else {
        console.error('[B-Components] Checkbox component must assign the model')
        this.checkedStore = false
      }
    },
    update() {
      if (Array.isArray(this.value)) {
        // $emit array to outside model
        if (this.checkedStore) {
          // Model already have value
          this.value.splice(this.value.indexOf(this.bindValue), 1)
          this.checkedStore = false
        } else {
          this.value.push(this.bindValue)
          this.checkedStore = true
        }
        this.$emit('input', this.value)
      } else {
        if (this.value) {
          this.$emit('input', false)
        } else this.$emit('input', true)
      }
    },
  },
}
