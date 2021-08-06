import caretCoordinates from '../assets/caret-coordinates/caret-coordinates'
import baseComponent from '../mixins/text-field-mixins'

export default {
  mixins: [baseComponent],
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    splitCharacter: {
      type: String,
      default: ' ',
    },
    defaultValue: {
      type: String,
      default: null,
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: null,
    },
    cols: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      inputValue: '',
      searchMatch: [],
      selectedIndex: 0,
      clickedChooseItem: false,
      wordIndex: 0,
    }
  },
  mounted() {
    if (this.defaultValue) this.inputValue = this.defaultValue

    const _self = this
    document
      .querySelector(`.autocomplete-input`)
      .addEventListener('input', function () {
        const caret = caretCoordinates(this, this.selectionEnd)

        if (_self.searchMatch.length > 0) {
          const element = document.querySelectorAll('.' + _self.id + '-list')

          if (element[0]) {
            element[0].style.top = caret.top + 40 + 'px'
            element[0].style.left = caret.left + 'px'
          }
        }
      })
  },
  computed: {
    classes() {
      return (this.className ? this.className : '') + ' b__input 2'
    },
    listToSearch() {
      if (typeof this.items !== 'undefined' && this.items.length > 0) {
        return this.items
      } else {
        return []
      }
    },
    currentWord() {
      return this.inputValue.replace(/(\r\n|\n|\r)/gm, ' ').split(' ')[
        this.wordIndex
      ]
    },
    inputSplitted() {
      return this.inputValue.replace(/(\r\n|\n|\r)/gm, ' ').split(' ')
    },
  },
  watch: {
    inputValue(value) {
      this.focus()
      this.selectedIndex = 0
      this.wordIndex = this.inputSplitted.length - 1
      this.$emit('input', value)
    },
    defaultValue(value) {
      if (value) this.inputValue = this.defaultValue
    },
  },
  methods: {
    highlightWord(word) {
      const regex = new RegExp('(' + this.currentWord + ')', 'g')
      return word.replace(regex, '<mark>$1</mark>')
    },
    setWord(word) {
      let inputValueReplace = this.inputValue.replace(';', ',')
      let currentWords = inputValueReplace
        .replace(/(\r\n|\n|\r)/gm, '__br__ ')
        .split(this.splitCharacter)
      currentWords[this.wordIndex] = currentWords[this.wordIndex].replace(
        this.currentWord,
        word + this.splitCharacter
      )
      this.wordIndex += 1
      this.inputValue = currentWords
        .join(this.splitCharacter)
        .replace(/__br__\s/g, '\n')
    },
    resetFormatInputValue() {
      var replace = `${this.splitCharacter.trim()}\\s*$`
      var re = new RegExp(replace, 'g')
      this.inputValue = this.inputValue.replace(re, '')
    },
    moveDown() {
      if (this.selectedIndex < this.searchMatch.length - 1) {
        this.selectedIndex++
      }
    },
    moveUp() {
      if (this.selectedIndex !== -1) {
        this.selectedIndex--
      }
    },
    selectItem(index) {
      this.selectedIndex = index
      this.chooseItem()
      this.focusout()
    },
    chooseItem(e) {
      this.clickedChooseItem = true

      if (this.selectedIndex !== -1 && this.searchMatch.length > 0) {
        if (e) {
          e.preventDefault()
        }
        this.setWord(this.searchMatch[this.selectedIndex])
        this.selectedIndex = -1
      }
    },
    focusout(e) {
      setTimeout(() => {
        if (!this.clickedChooseItem) {
          this.searchMatch = []
          this.selectedIndex = -1
        }
        this.clickedChooseItem = false
        this.resetFormatInputValue()
      }, 100)
    },
    focus() {
      this.searchMatch = []
      if (this.currentWord !== '') {
        this.searchMatch = this.listToSearch.filter(
          el => el.indexOf(this.currentWord) >= 0
        )
      }
      if (
        this.searchMatch.length === 1 &&
        this.currentWord === this.searchMatch[0]
      ) {
        this.searchMatch = []
      }
    },
    blur() {
      this.resetFormatInputValue()
    },
    change(value) {
      this.updateFloatLabel(value)
      this.$emit('input', value)
    },
    outside(e) {
      let inputElement = $(this)[0].$el
      let elementTarget = e.target.parentElement
      if (inputElement !== elementTarget) {
        if (!this.clickedChooseItem) {
          this.searchMatch = []
          this.selectedIndex = -1
        }
        this.clickedChooseItem = false
        this.resetFormatInputValue()
      }
    },
  },
  directives: {
    'click-outside': {
      bind: function (el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
          const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
          if (compName) {
            warn += `Found in component '${compName}'`
          }

          console.warn(warn)
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
      },

      unbind: function (el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      },
    },
  },
}
