export default {
  props: ['class-name', 'disabled', 'id', 'label', 'name', 'type', 'icon'],
  data() {
    return {
      isAnimating: false,
    }
  },
  computed: {
    classes() {
      return (
        (this.className ? this.className : '') +
        ' b__button__control' +
        (this.isAnimating ? ' clicked-animate' : '')
      )
    },
    labelHtml() {
      return (this.icon ? this.icon : '') + this.label
    },
  },
  methods: {
    animate() {
      this.isAnimating = true
      setTimeout(() => {
        this.isAnimating = false
      }, 600)
    },
  },
}
