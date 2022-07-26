import baseComponent from '../mixins/base-mixins'
import { debounce, cloneDeep } from 'lodash'

export default {
  data() {
    return {
      isExpanding: false,
      isFocused: false,
      searchKeyword: '',
      pointerIndex: 0,
      selectedValue: null,
      searchList: [],
      searchListTotal: [],
      selectedPointerIndex: null,
      showResult: false,
      itemResult: {
        id: null,
        html: null,
        title: null,
        icon: null,
        url: null,
      },
      debounceSearch: null,
    }
  },
  props: {
    list: {
      required: true,
    },
    id: {
      required: true,
    },
    value: {
      required: false,
    },
    defaultValue: {
      default: null,
    },
    disabled: {
      type: Boolean,
    },
    disableIcon: {
      type: Boolean,
      default: true,
    },
    hasUrl: {
      type: Boolean,
      default: false,
    },
    styleDefault: {
      type: Boolean,
      default: false,
    },
    inputPlacehoder: {
      type: String,
    },
    label: {
      type: String,
    },
    ajaxSearchUrl: {
      type: String,
      default: null,
    },
    startLengthKey: {
      type: Number,
      default: 0,
    },
    formatList: {
      type: Object,
      default: null,
    },
    dataPrefix: {
      type: String,
      default: null,
    },
    keyNameSearch: {
      type: String,
      default: 'key',
    },
    orgPlaceholder: {
      type: String,
      default: '-',
    },
    nullPlaceholder: {
      type: String,
      default: '-',
    },
    paramAjaxSearch: {
      type: Object,
      default: null,
    },
    isShowHtmlResult: {
      type: Boolean,
      default: false,
    },
    isResetWhenBlurOut: {
      type: Boolean,
      default: true,
    },
    handleSearch: {
      type: Function,
    },
  },
  mixins: [baseComponent],
  created() {
    if (this.ajaxSearchUrl || this.handleSearch) {
      this.searchListTotal = []
      this.searchList = cloneDeep(this.searchListTotal)
    } else {
      this.searchList = cloneDeep(this.list)
      this.searchListTotal = cloneDeep(this.list)
    }

    if (this.defaultValue !== null) {
      const value = this.defaultValue
      const selectItem = this.searchListTotal.filter(
        item => item.id.toString() === value.toString()
      )
      if (selectItem.length > 0) {
        this.searchKeyword = selectItem[0].title
        this.selectedValue = value
      }
      this.pointerIndex = this.searchListTotal.indexOf(selectItem[0])
    }
  },
  watch: {
    searchListTotal() {
      this.searchList = JSON.parse(JSON.stringify(this.searchListTotal))

      if (!this.ajaxSearchUrl && !this.handleSearch) {
        this.switchList(false)
      }
    },
    list() {
      this.searchListTotal = JSON.parse(JSON.stringify(this.list))
      if (!this.ajaxSearchUrl && !this.handleSearch) {
        this.switchList(false)
      }
    },
    value(newValue) {
      if (newValue == null) {
        if (this.ajaxSearchUrl || this.handleSearch) {
          this.searchListTotal = []
        }
        return
      }
      const selectItem = this.searchListTotal.find(
        item => item.id.toString() === newValue.toString()
      )
      if (selectItem) {
        this.searchKeyword = selectItem.title
      }
    },
    defaultValue(value) {
      if (value !== null) {
        const selectItem = this.searchList.filter(
          item => item.id.toString() === value.toString()
        )
        this.pointerIndex = this.searchList.indexOf(selectItem[0])
        this.searchKeyword = selectItem.length > 0 ? selectItem[0].title : ''
        this.selectedValue = value
      } else {
        this.searchKeyword = ''
        this.selectedValue = null
        this.pointerIndex = 0
      }
    },
    selectedValue(val) {
      this.$emit('input', val)

      this.$nextTick(() => {
        this.itemResult = Object.assign({}, this.searchList[this.pointerIndex])
        if (val == null || val === '' || val === 0) this.showResult = false
        else {
          this.showResult = true
        }
        this.selectedPointerIndex = val
      })
    },
  },
  computed: {
    showInputSearchCombobox() {
      if (!this.isShowHtmlResult) return true
      if (!this.showResult && this.isShowHtmlResult) return true
      return false
    },
    isActive() {
      return (
        (this.value !== null && this.value !== '') ||
        (this.searchKeyword !== null && this.searchKeyword !== '')
      )
    },
    placeholderEmpty() {
      if (this.searchKeyword.length >= this.startLengthKey) return 'Not Found'

      if (this.searchList.length == 0)
        return (
          'Please type at least ' +
          this.startLengthKey +
          ' characters to search'
        )
    },
  },
  methods: {
    showInputSearch() {
      if (!this.hasUrl) {
        this.showResult = false
        this.switchList(true)
        let ref = 'input-search-' + this.id
        this.$nextTick(() => this.$refs[ref].focus())
      }
    },
    focusCombobox(event) {
      this.switchList(true)
      $(event.target).select()
    },
    blurCombobox(event) {
      // When blur outside input, always emit the selected value to model.
      // If user CLICK on ITEM, the click event will update again new value to model.
      // Close LIST after 500ms (waiting for CLICK event was handled)
      setTimeout(() => {
        this.switchList(false)
        if (
          this.selectedValue == null ||
          this.selectedValue === '' ||
          this.selectedValue === 0
        ) {
          this.searchList = JSON.parse(JSON.stringify(this.searchListTotal))
          if (this.isResetWhenBlurOut) this.searchKeyword = ''
          this.showResult = false
        } else this.showResult = true
      }, 500)
      this.$emit('input', this.selectedValue)
    },
    switchList(openList = false) {
      if (!this.disabled) {
        this.isExpanding = openList
        this.isFocused = openList
        let val = this.selectedPointerIndex
        if (openList && val !== null) {
          let selectItem = this.searchList.filter(
            item => item.id.toString() === val.toString()
          )
          this.pointerIndex = this.searchList.indexOf(selectItem[0])
        }
      }
    },
    toggleArrowDropdown() {
      this.switchList(!this.isExpanding)
      if (this.selectedValue == null) {
        this.searchList = JSON.parse(JSON.stringify(this.searchListTotal))
        this.searchKeyword = ''
        this.showResult = false
      } else this.showResult = true
      this.$emit('input', this.selectedValue)
    },
    selectItem(index) {
      if (index == undefined || index == null) {
        return
      }

      if (index >= this.searchList.length) {
        return
      }

      this.pointerIndex = index
      this.selectedValue = this.searchList[index].id
      this.searchKeyword = this.searchList[index].title
    },
    toggleItem(id, index) {
      this.selectedValue = id
      this.$nextTick(() => {
        this.switchList(false) // Close list
        this.searchKeyword = this.searchList[index].title
      })
    },
    searchAction(event) {
      this.selectedValue = null
      this.searchKeyword = event.target.value ? event.target.value : ''
      this.switchList(true)
      this.pointerIndex = null
      this.$emit('search-keywords', this.searchKeyword)

      if (this.handleSearch || this.ajaxSearchUrl) {
        if (this.searchKeyword.trim().length >= this.startLengthKey) {
          this.callDebounceSearch(
            this.handleSearch
              ? this.handleSearch.bind(this)
              : () => {
                  this.$http
                    .get(this.ajaxSearchUrl, {
                      params: {
                        ...this.paramAjaxSearch,
                        [this.keyNameSearch]: this.searchKeyword.trim(),
                      },
                    })
                    .then(success => {
                      this.searchListTotal = (
                        success.body[this.dataPrefix] || []
                      ).map(this.responseSearch)
                    })
                }
          )
        }
      } else {
        this.searchList = this.searchListTotal.filter(item => {
          return item.title != undefined && item.title != null
            ? item.title
                .toUpperCase()
                .match(
                  new RegExp('.*' + this.searchKeyword.toUpperCase() + '.*')
                )
            : false
        })
      }
    },
    callDebounceSearch(callback) {
      if (this.debounceSearch) {
        this.debounceSearch()
      } else {
        this.debounceSearch = debounce(callback, 1000)
        this.debounceSearch()
      }
    },
    responseSearch(data) {
      return ['id', 'html', 'title', 'icon', 'url'].reduce((prev, curr) => {
        prev[curr] = this.formatList[curr]
          ? this.formatListHtml(this.formatList[curr], data)
          : null
        return prev
      }, {})
    },
    resolve(obj, path) {
      path = path.split('.')
      let current = obj
      while (path.length) {
        if (typeof current !== 'object') return undefined
        current = current[path.shift()]
      }
      return current
    },

    formatListHtml(str, data) {
      if (str !== null && str !== '') {
        let result = ''
        let preStr = str.split('{{')
        if (preStr.length > 0) {
          let afterStr = preStr[1].split('}}')
          let dataObj = this.resolve(data, afterStr[0])
          result = preStr[0] + dataObj + afterStr[1]
        } else result = eval(preStr)
        return result
      }
      return str
    },

    keypressAction(keyName, event) {
      let pointerIndex = this.pointerIndex
      switch (keyName) {
        case 'ArrowDown':
          if (
            this.pointerIndex == null ||
            this.pointerIndex >= this.searchList.length - 1
          ) {
            pointerIndex = 0
          } else {
            pointerIndex++
          }
          break
        case 'ArrowUp':
          if (this.pointerIndex == null || this.pointerIndex == 0) {
            pointerIndex = this.searchList.length - 1
          } else {
            pointerIndex--
          }
          break
        case 'Enter':
          this.switchList(false)
          this.selectItem(pointerIndex)
          break
        default:
          pointerIndex = null
          this.selectedValue = null
      }
      this.pointerIndex = pointerIndex
      if (event != null) {
        event.target.selectionStart = event.target.selectionEnd =
          event.target.value.length
      }
    },
  },
}
