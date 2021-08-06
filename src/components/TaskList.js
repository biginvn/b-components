// var Events = new Vue({});

export default {
  props: ['value'],
  data() {
    return {
      task: null,
      showModal: false,
    }
  },

  watch: {
    value() {
      if (
        this.value == undefined ||
        this.value == null ||
        this.value.length == 0
      ) {
      }
    },
  },

  mounted() {
    this.task = this.value
  },

  methods: {
    haveButton(button) {
      if (button == true) {
        for (var i = 0; i < this.task.length; i++) {}
        return (
          '<div class="task-btn-group"><button type="button" class="btn btn-primary btn-rounded" data-toggle="modal" data-target="#modal-task-' +
          i +
          '">Edit Condition</button></div>'
        )
      }
    },
    addTask(button) {
      var html = this.haveButton(button)
      this.task = this.task ? this.task : []
      this.task.push({
        title: 'Condition',
        content: 'Your Condition',
        button: button,
        html: html,
      })
      this.$emit('input', this.task)
    },
    deleteTask(index) {
      var self = this

      // Animation
      var arrow = index - 1
      document
        .querySelectorAll('.task')
        [index].setAttribute(
          'style',
          'animation: vanishOut; animation-duration: 0.5s;'
        )
      arrow > -1
        ? document
            .querySelectorAll('[data-name="svg-task-arrow"]')
            [arrow].setAttribute(
              'style',
              'animation: vanishOut; animation-duration: 0.5s; height: 60px;'
            )
        : document.querySelectorAll('[data-name="svg-task-arrow"]')[arrow]

      // Animation then Remove Element
      setTimeout(function () {
        if (index > -1) {
          self.task.splice(index, 1)
          // Remove Style
          document.querySelectorAll('.task')[index].removeAttribute('style')
          arrow > -1
            ? document
                .querySelectorAll('[data-name="svg-task-arrow"]')
                [arrow].setAttribute('style', 'height: 60px;')
            : document.querySelectorAll('[data-name="svg-task-arrow"]')[arrow]
        }
      }, 500)
      this.$emit('input', self.task)
    },
    emptyTask() {
      this.task = []
      this.$emit('input', this.task)
    },
    changeStatusModal() {
      this.showModal = true
    },
    mouseover() {},
  },
}
