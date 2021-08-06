Vue.directive('click-outside', {
  priority: 700,
  bind() {
    let self = this
    this.event = function (event) {
      self.vm.$emit(self.expression, event)
    }

    if (this.el != undefined) {
      this.el.addEventListener('click', this.stopProp)
      document.body.addEventListener('click', this.event)
    }
  },

  unbind() {
    this.el.removeEventListener('click', this.stopProp)
    document.body.removeEventListener('click', this.event)
  },
  stopProp(event) {
    event.stopPropagation()
  },
})
