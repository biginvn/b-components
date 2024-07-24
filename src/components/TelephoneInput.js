import {
  formatNumber,
  AsYouType,
  isValidNumber,
  parseDigits,
  parseNumber
} from 'libphonenumber-js'
import allCountries from '../assets/telephone-input/all-countries'
import getCountry from '../assets/telephone-input/default-country'

export default {
  name: 'b-telephone-input',
  props: {
    value: {
      type: String,
    },
    isValueModelInteger: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Enter a phone number',
    },
    classesParent: {
      type: String,
      default: null,
    },
    idParent: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: 'Number Phone',
    },
    disabledFetchingCountry: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    invalidMsg: {
      default: '',
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    defaultCountry: {
      // Default country code, ie: 'AU'
      // Will override the current country of user
      type: String,
      default: '',
    },
    countryCode: {
      // Default country code, ie: 1
      // Will override the current country of user
      // type: Number,
      default: null,
    },
    enabledFlags: {
      type: Boolean,
      default: true,
    },
    preferredCountries: {
      type: Array,
      default: () => ['us'],
    },
    onlyCountries: {
      type: Array,
      default: () => [],
    },
    ignoredCountries: {
      type: Array,
      default: () => [],
    },
    regex: {
      type: String,
      default: '[0-9]',
    },
    isPreventAfterInputValidNumber: {
      type: Boolean,
      default: true,
    },
    maxLengthDigits: {
      type: Number,
      default: 15,
    },
    maxLengthStandardDigits: {
      type: Number,
      default: 10,
    },
    customFormatNumberStandard: {
      type: Object / Array,
      default: function () {
        return {
          0: '(',
          3: ') ',
          6: '-',
        }
      },
    },
    customFormatNumberNotStandard: {
      type: Object / Array,
      default: function () {
        return {
          0: '(',
          3: ') ',
          7: '-',
          11: '-',
        }
      },
    },
    useCustomFormatNumber: {
      type: Boolean,
      default: false,
    },
    formatTypePhone: {
      type: String,
      default: 'INTERNATIONAL', //NATIONAL
    },
    formatByDefaultCountry: {
      type: String,
      default: null,
    },
  },
  mounted() {
    this.initializeCountry()
    this.updateLabel(this.phone)
  },
  created() {
    if (this.value) {
      this.phone = this.value
    }
  },
  data() {
    return {
      phone: '',
      activeCountry: { iso2: '' },
      open: false,
      selectedIndex: null,
      typeToFindInput: '',
      typeToFindTimer: null,
      classLabel: '',
      ctrlDown: false,
    }
  },
  computed: {
    formatCountryNumber() {
      return this.formatByDefaultCountry !== null
        ? this.formatByDefaultCountry
        : this.activeCountry.iso2
    },
    mode() {
      if (!this.phone) {
        return ''
      }
      if (this.phone[0] === '+') {
        return 'code'
      }
      if (this.phone[0] === '0') {
        return 'prefix'
      }
      return 'normal'
    },
    filteredCountries() {
      // List countries after filtered
      if (this.onlyCountries.length) {
        return this.getCountries(this.onlyCountries)
      }

      if (this.ignoredCountries.length) {
        return allCountries.filter(
          ({ iso2 }) =>
            !this.ignoredCountries.includes(iso2.toUpperCase()) &&
            !this.ignoredCountries.includes(iso2.toLowerCase())
        )
      }

      return allCountries
    },
    sortedCountries() {
      // Sort the list countries: from preferred countries to all countries
      const preferredCountries = this.getCountries(
        this.preferredCountries
      ).map(country => Object.assign({}, country, { preferred: true }))

      return [...preferredCountries, ...this.filteredCountries]
    },
    formattedResult() {
      if (!this.useCustomFormatNumber) {
        // Calculate phone number based on mode
        if (!this.mode || !this.filteredCountries) {
          return ''
        }
        let phone = this.phone
        // console.log('phone', phone)
        // let formatter = new AsYouType() // eslint-disable-line
        // if (!this.useCustomFormatNumber) {
        //   formatter = new AsYouType(this.formatCountryNumber) // eslint-disable-line
        // }
        // formatter.input(this.phone)

        if (this.mode === 'code') {
          // Find inputted country in the countries list
          this.activeCountry =
            this.findCountry(this.formatCountryNumber) || this.activeCountry
        } else if (this.mode === 'prefix') {
          // Remove the first '0' if this is a '0' prefix number
          // Ex: 0432421999
          phone = this.phone.slice(1)
        }
        return phone
        // return formatNumber(
        //   phone,
        //   this.formatCountryNumber,
        //   this.formatTypePhone
        // )
      } else {
        return this.formatNumberByCustom(this.phone)
      }
    },
    state() {
      return isValidNumber(
        this.formattedResult,
        this.activeCountry && this.activeCountry.iso2
      )
    },
    response() {
      // If it is a valid number, returns the formatted value
      // Otherwise returns what it is
      const number = this.state ? this.formattedResult : this.phone
      const valueModel = number
      // Emit input event in case v-model is used in the parent
      this.$emit('input', valueModel)
      return {
        number,
        valueModel,
        isValid: this.state,
        country: this.activeCountry,
      }
    },
  },
  watch: {
    state(value) {
      if (value && this.mode !== 'prefix') {
        // If mode is 'prefix', keep the number as user typed,
        // Otherwise format it
        this.phone = this.formattedResult
      }
    },
    value() {
      this.phone = this.value
    },
    phone() {
      if (!this.useCustomFormatNumber) {
        this.phone = this.formatPhoneByNational(this.phone)
        this.updateLabel(this.phone)
        // if (this.state) {
        //     this.phone = this.formattedResult;
        // }
      } else {
        this.phone = this.formatNumberByCustom(this.phone)
      }
      // Emit input event in case v-model is used in the parent
      this.$emit('input', this.phone)
    },
    activeCountry(value) {
      this.$emit('updatePhoneCountryCode', value)
      // this.phone = this.formatPhoneByNational(this.phone)
    },
    countryCode() {
      this.initializeCountry()
    },
  },
  methods: {
    formatNumberByCustom(phone) {
      if (phone != null) {
        var numbers = phone.replace(/\D/g, ''),
          phone = ''
        if (numbers.length <= this.maxLengthStandardDigits) {
          for (var i = 0; i < numbers.length; i++) {
            phone += (this.customFormatNumberStandard[i] || '') + numbers[i]
          }
        } else {
          for (var i = 0; i < numbers.length; i++) {
            phone += (this.customFormatNumberNotStandard[i] || '') + numbers[i]
          }
        }
        return phone
      } else {
        return ''
      }
    },
    formatPhoneByNational(phone) {
      // console.log('phone', phone)
      if(phone == '+' + this.activeCountry.dialCode) {
        return phone
      }
      // console.log('phone', phone)

      if(this.activeCountry.dialCode.length > 3) {
        // console.log('4 digit')
        const code = '+' + this.activeCountry.dialCode
        let numbers = phone.replace(code, '')
        numbers = numbers.replace(/\D/g, '')
        let newPhone = ''
        if (numbers.length <= this.maxLengthStandardDigits) {
          for (var i = 0; i < numbers.length; i++) {
            newPhone += (this.customFormatNumberStandard[i] || '') + numbers[i]
          }
        } else {
          for (var i = 0; i < numbers.length; i++) {
            newPhone += (this.customFormatNumberNotStandard[i] || '') + numbers[i]
          }
        }
        return code + ' ' + newPhone

      } else {

        let currentPhone = parseNumber(phone, this.activeCountry.iso2, { extended: true })
        // console.log('currentPhone', currentPhone)
        // console.log('this.activeCountry.dialCode', this.activeCountry.dialCode)
        // console.log('this.activeCountry.iso2', this.activeCountry.iso2)
        if(currentPhone.countryCallingCode != undefined) {
          const code = '+' + currentPhone.countryCallingCode
          let numbers = currentPhone.phone

          let newPhone = ''
          if (numbers.length <= this.maxLengthStandardDigits) {
            for (var i = 0; i < numbers.length; i++) {
              newPhone += (this.customFormatNumberStandard[i] || '') + numbers[i]
            }
          } else {
            for (var i = 0; i < numbers.length; i++) {
              newPhone += (this.customFormatNumberNotStandard[i] || '') + numbers[i]
            }
          }
          return code + ' ' + newPhone
        }

      }


      return phone


      // let formatter = new AsYouType() // eslint-disable-line
      // if (!this.useCustomFormatNumber) {
      //   formatter = new AsYouType(this.formatCountryNumber) // eslint-disable-line
      // } else {
      //   phone = parseDigits(phone)
      // }
      // return formatter.input(phone)

      // const code = '+' + this.activeCountry.dialCode
      // let numbers = formatter.getNumber().number
      // numbers = numbers.replace(code, '')
      // // numbers = numbers.replace(/\D/g, '')
      // // console.log('==', numbers)
      // let newPhone = ''
      // if (numbers.length <= this.maxLengthStandardDigits) {
      //   for (var i = 0; i < numbers.length; i++) {
      //     newPhone += (this.customFormatNumberStandard[i] || '') + numbers[i]
      //   }
      // } else {
      //   for (var i = 0; i < numbers.length; i++) {
      //     newPhone += (this.customFormatNumberNotStandard[i] || '') + numbers[i]
      //   }
      // }
      // return code + newPhone
    },
    initializeCountry() {
      /**
       * 1. Use default country if passed from parent
       */
      if (this.defaultCountry) {
        const defaultCountry = this.findCountry(this.defaultCountry)
        if (defaultCountry) {
          this.activeCountry = defaultCountry
          return
        }
      }
      /**
       * 2. Use default country if passed from parent
       */
      if (this.countryCode) {
        const countryByCode = this.findCountryByCode(this.countryCode)
        if (countryByCode) {
          this.activeCountry = countryByCode
          return
        }
      }
      /**
       * 3. Use the first country from preferred list (if available) or all countries list
       */
      this.activeCountry =
        this.findCountry(this.preferredCountries[0]) ||
        this.filteredCountries[0]
      /**
       * 4. Check if fetching country based on user's IP is allowed, set it as the default country
       */
      if (!this.disabledFetchingCountry) {
        getCountry().then(res => {
          this.activeCountry = this.findCountry(res) || this.activeCountry
        })
      }
    },
    /**
     * Get the list of countries from the list of iso2 code
     */
    getCountries(list = []) {
      return list
        .map(countryCode => this.findCountry(countryCode))
        .filter(Boolean)
    },
    findCountry(iso = '') {
      return allCountries.find(country => country.iso2.toUpperCase() === iso.toUpperCase())
    },
    findCountryByCode(countryCode) {
      return allCountries.find(
        country =>
          country.dialCode.toString() === countryCode.toString() &&
          country.priority === 0
      )
    },
    getItemClass(index, iso2) {
      const highlighted = this.selectedIndex === index
      const lastPreferred = index === this.preferredCountries.length - 1
      const preferred = !!~this.preferredCountries
        .map(c => c.toUpperCase())
        .indexOf(iso2)
      return {
        highlighted,
        'last-preferred': lastPreferred,
        preferred,
      }
    },
    choose(country) {
      let newPhone = this.phone
      if(newPhone == '') {
        this.phone = '+' + country.dialCode
      } else {
        newPhone = '+' + newPhone.replace(/\D/g, '')
        this.phone = newPhone.replace('+' + this.activeCountry.dialCode, '+' + country.dialCode)
      }
      this.activeCountry = country
    },
    onInput(e) {
      console.log('e', e)
      let newPhone = this.phone;
      newPhone = '+' + newPhone.replace(/\D/g, '')
      const code = this.activeCountry.dialCode
      if(!newPhone.startsWith('+' + code)) {
        this.phone = '+' + code + (e.data || '')
      }

      this.$refs.input.setCustomValidity(
        this.response.isValid ? '' : this.invalidMsg
      )
      // Emit the response, includes phone, validity and country
      this.$emit('onInput', this.response)
    },
    onBlur() {
      this.$emit('onBlur')
    },
    toggleDropdown() {
      if (this.disabled) {
        return
      }
      this.open = !this.open
    },
    clickedOutside() {
      this.open = false
    },
    keyDownPress(e) {
      let ctrlKey = 17,
        cmdKey = 91,
        vKey = 86,
        cKey = 67,
        xKey = 88

      let keyCode = e.keyCode || e.which

      // Detect when user press Ctrl C or Ctrl V:
      if (keyCode == ctrlKey || keyCode == cmdKey) this.ctrlDown = true
      if (
        this.ctrlDown &&
        (keyCode == vKey || keyCode == cKey || keyCode == xKey)
      )
        return

      // Don't validate the input if below arrow, delete and backspace keys were pressed
      if (
        keyCode != 37 &&
        keyCode != 38 &&
        keyCode != 39 &&
        keyCode != 40 &&
        keyCode != 46 &&
        keyCode != 8
      ) {
        // Left / Up / Right / Down Arrow, Delete keys;
        if (!this.useCustomFormatNumber) {
          // if (
          //   e.target.selectionEnd == e.target.selectionStart &&
          //   this.isPreventAfterInputValidNumber &&
          //   this.response.isValid
          // ) {
          //   console.log('keyDownPress', e.target, this.isPreventAfterInputValidNumber, this.response.isValid)
          //   e.preventDefault()
          //   return false
          // }
        } else {
          let phoneDigits = parseDigits(this.phone)
          if (
            e.target.selectionEnd == e.target.selectionStart &&
            this.isPreventAfterInputValidNumber &&
            this.maxLengthDigits <= phoneDigits.length
          ) {
            e.preventDefault()
            return false
          }
        }

        let keyCharacter = e.key
        let pattern = new RegExp(this.regex)
        if (
          this.regex !== undefined &&
          this.regex !== null &&
          this.regex !== ''
        ) {
          let res = pattern.test(keyCharacter)
          if (!res) {
            e.preventDefault()
            return false
          }
        }
      }

      // if (keyCode === 8) {
      //   let phoneTmp = this.phone
      //   let cursorPositionStart = this.getPositionCursorInPhone(
      //     phoneTmp,
      //     e.target.selectionStart
      //   )
      //   if (cursorPositionStart > 0) {
      //     if (e.target.selectionEnd == e.target.selectionStart) {
      //       e.preventDefault()
      //       this.phone = this.removeCharacter(
      //         parseDigits(phoneTmp),
      //         cursorPositionStart - 1
      //       )
      //       return
      //     }
      //   }
      // }
    },
    keyUpPress(e) {
      let ctrlKey = 17,
        cmdKey = 91
      let keyCode = e.keyCode || e.which
      if (keyCode == ctrlKey || keyCode == cmdKey) this.ctrlDown = false
    },
    getPositionCursorInPhone(str, currentCursorPosition) {
      // Ex: str = (0123) 456, and currentCursorPosition = 4
      let partSlicePhone = str.slice(0, currentCursorPosition) // Get part phone after slice from cursor => partSlicePhone = (0123
      let phoneNumber = parseDigits(partSlicePhone) // Get phone slice contains only number => phoneNumber = 0123
      return (
        currentCursorPosition - (partSlicePhone.length - phoneNumber.length)
      ) // Get the position of cursor in phone number => result = 3
    },
    removeCharacter(str, char_pos) {
      let part1 = str.substring(0, char_pos)
      let part2 = str.substring(char_pos + 1, str.length)
      return part1 + part2
    },
    keyboardNav(e) {
      if (e.keyCode === 40) {
        // down arrow
        this.open = true
        if (this.selectedIndex === null) {
          this.selectedIndex = 0
        } else {
          this.selectedIndex = Math.min(
            this.sortedCountries.length - 1,
            this.selectedIndex + 1
          )
        }
        let selEle = this.$refs.list.children[this.selectedIndex]
        if (
          selEle.offsetTop + selEle.clientHeight >
          this.$refs.list.scrollTop + this.$refs.list.clientHeight
        )
          this.$refs.list.scrollTop =
            selEle.offsetTop -
            this.$refs.list.clientHeight +
            selEle.clientHeight
      } else if (e.keyCode === 38) {
        // up arrow
        this.open = true
        if (this.selectedIndex === null) {
          this.selectedIndex = this.sortedCountries.length - 1
        } else {
          this.selectedIndex = Math.max(0, this.selectedIndex - 1)
        }
        let selEle = this.$refs.list.children[this.selectedIndex]
        if (selEle.offsetTop < this.$refs.list.scrollTop)
          this.$refs.list.scrollTop = selEle.offsetTop
      } else if (e.keyCode === 13) {
        // enter key
        if (this.selectedIndex !== null) {
          this.choose(this.sortedCountries[this.selectedIndex])
        }
        this.open = !this.open
      } else {
        // typing a country's name
        this.typeToFindInput += e.key
        clearTimeout(this.typeToFindTimer)
        this.typeToFindTimer = setTimeout(() => {
          this.typeToFindInput = ''
        }, 700)
        // don't include preferred countries so we jump to the right place in the alphabet
        let typedCountryI = this.sortedCountries
          .slice(this.preferredCountries.length)
          .findIndex(c => c.name.toLowerCase().startsWith(this.typeToFindInput))
        if (~typedCountryI) {
          this.selectedIndex = this.preferredCountries.length + typedCountryI
          let selEle = this.$refs.list.children[this.selectedIndex]
          if (
            selEle.offsetTop < this.$refs.list.scrollTop ||
            selEle.offsetTop + selEle.clientHeight >
              this.$refs.list.scrollTop + this.$refs.list.clientHeight
          ) {
            this.$refs.list.scrollTop =
              selEle.offsetTop - this.$refs.list.clientHeight / 2
          }
        }
      }
    },
    reset() {
      this.selectedIndex = this.sortedCountries
        .map(c => c.iso2)
        .indexOf(this.activeCountry.iso2)
      this.open = false
    },
    updateLabel(value) {
      var isEmpty =
        value == undefined || value == null || value == 0 || value == ''
          ? true
          : false
      if (!isEmpty) {
        this.classLabel = 'active'
      } else this.classLabel = ''
    },
  },
  directives: {
    // Click-outside from BosNaufal: https://github.com/BosNaufal/vue-click-outside
    'click-outside': {
      bind: function (el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
          var compName = vNode.context.name
          var warn =
            '[Vue-click-outside:] provided expression ' +
            binding.expression +
            ' is not a function, but has to be'
          if (compName) {
            warn += 'Found in component ' + compName
          }
          console.warn(warn)
        }
        // Define Handler and cache it on the element
        var bubble = binding.modifiers.bubble
        var handler = function (e) {
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
