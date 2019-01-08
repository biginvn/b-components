import { formatNumber, AsYouType, isValidNumber, parseDigits } from 'libphonenumber-js';
import allCountries from '../assets/telephone-input/all-countries';
import getCountry from '../assets/telephone-input/default-country';

export default {
    name: 'vue-tel-input',
    props: {
        value: {
            type: String,
        },
        placeholder: {
            type: String,
            default: 'Enter a phone number',
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
        enabledFlags: {
            type: Boolean,
            default: true
        },
        preferredCountries: {
            type: Array,
            default: () => [],
        },
        onlyCountries: {
            type: Array,
            default: () => [],
        },
        ignoredCountries: {
            type: Array,
            default: () => [],
        },
    },
    mounted() {
        this.initializeCountry();
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
        };
    },
    computed: {
        mode() {
            if (!this.phone) {
                return '';
            }
            if (this.phone[0] === '+') {
                return 'code';
            }
            if (this.phone[0] === '0') {
                return 'prefix';
            }
            return 'normal';
        },
        filteredCountries() {
            // List countries after filtered
            if (this.onlyCountries.length) {
                return this.getCountries(this.onlyCountries);
            }

            if (this.ignoredCountries.length) {
                return allCountries.filter(({ iso2 }) =>
                    !this.ignoredCountries.includes(iso2.toUpperCase()) &&
                    !this.ignoredCountries.includes(iso2.toLowerCase()))
            }

            return allCountries;
        },
        sortedCountries() {
            // Sort the list countries: from preferred countries to all countries
            const preferredCountries = this.getCountries(this.preferredCountries).map(country => Object.assign({}, country, { preferred: true }));

            return [...preferredCountries, ...this.filteredCountries];
        },
        formattedResult() {
            // Calculate phone number based on mode
            if (!this.mode || !this.filteredCountries) {
                return '';
            }
            let phone = this.phone;
            // if (this.mode === 'code') {
            //     // If user manually type the country code
            //     const formatter = new AsYouType();// eslint-disable-line
            //     formatter.input(this.phone);
            //
            //     // Find inputted country in the countries list
            //     this.activeCountry = this.findCountry(formatter.country) || this.activeCountry;
            // } else if (this.mode === 'prefix') {
            //     // Remove the first '0' if this is a '0' prefix number
            //     // Ex: 0432421999
            //     phone = this.phone.slice(1);
            // }
            // If user manually type the country code
            const formatter = new AsYouType();// eslint-disable-line
            formatter.input(this.phone);

            return formatNumber(phone, this.activeCountry && this.activeCountry.iso2, 'NATIONAL');
        },
        state() {
            return isValidNumber(this.formattedResult, this.activeCountry && this.activeCountry.iso2);
        },
        response() {
            // If it is a valid number, returns the formatted value
            // Otherwise returns what it is
            const number = this.state ? this.formattedResult : this.phone;
            return {
                number,
                isValid: this.state,
                country: this.activeCountry,
            };
        },
    },
    watch: {
        state(value) {
            if (value && this.mode !== 'prefix') {
                // If mode is 'prefix', keep the number as user typed,
                // Otherwise format it
                this.phone = this.formattedResult;
            }
        },
        value() {
            this.phone = this.value;
        },
        phone() {
            const parseDigitPhone = new parseDigits();// eslint-disable-line
            this.phone = parseDigitPhone(this.phone);
        }
    },
    methods: {
        initializeCountry() {
            /**
             * 1. Use default country if passed from parent
             */
            if (this.defaultCountry) {
                const defaultCountry = this.findCountry(this.defaultCountry);
                if (defaultCountry) {
                    this.activeCountry = defaultCountry;
                    return;
                }
            }
            /**
             * 2. Use the first country from preferred list (if available) or all countries list
             */
            this.activeCountry = this.findCountry(this.preferredCountries[0]) || this.filteredCountries[0];
            /**
             * 3. Check if fetching country based on user's IP is allowed, set it as the default country
             */
            if (!this.disabledFetchingCountry) {
                getCountry().then((res) => {
                    this.activeCountry = this.findCountry(res) || this.activeCountry;
                });
            }
        },
        /**
         * Get the list of countries from the list of iso2 code
         */
        getCountries(list = []) {
            return list
                .map(countryCode => this.findCountry(countryCode))
                .filter(Boolean);
        },
        findCountry(iso = '') {
            return allCountries.find(country => country.iso2 === iso.toUpperCase());
        },
        getItemClass(index, iso2) {
            const highlighted = this.selectedIndex === index;
            const lastPreferred = index === this.preferredCountries.length - 1;
            const preferred = !!~this.preferredCountries.map(c => c.toUpperCase()).indexOf(iso2);
            return {
                highlighted,
                'last-preferred': lastPreferred,
                preferred,
            };
        },
        choose(country) {
            this.activeCountry = country;
            this.$emit('onInput', this.response);
        },
        onInput() {
            this.$refs.input.setCustomValidity(this.response.isValid ? '' : this.invalidMsg);
            // Emit input event in case v-model is used in the parent
            this.$emit('input', this.response.number);

            // Emit the response, includes phone, validity and country
            this.$emit('onInput', this.response);
        },
        onBlur() {
            this.$emit('onBlur');
        },
        toggleDropdown() {
            if (this.disabled) {
                return;
            }
            this.open = !this.open;
        },
        clickedOutside() {
            this.open = false;
        },
        keyboardNav(e) {
            if (e.keyCode === 40) {
                // down arrow
                this.open = true;
                if (this.selectedIndex === null) {
                    this.selectedIndex = 0;
                } else {
                    this.selectedIndex = Math.min(this.sortedCountries.length - 1, this.selectedIndex + 1);
                }
                let selEle = this.$refs.list.children[this.selectedIndex];
                if (selEle.offsetTop + selEle.clientHeight > this.$refs.list.scrollTop + this.$refs.list.clientHeight)
                    this.$refs.list.scrollTop = selEle.offsetTop - this.$refs.list.clientHeight + selEle.clientHeight;
            } else if (e.keyCode === 38) {
                // up arrow
                this.open = true;
                if (this.selectedIndex === null) {
                    this.selectedIndex = this.sortedCountries.length - 1;
                } else {
                    this.selectedIndex = Math.max(0, this.selectedIndex - 1);
                }
                let selEle = this.$refs.list.children[this.selectedIndex];
                if (selEle.offsetTop < this.$refs.list.scrollTop)
                    this.$refs.list.scrollTop = selEle.offsetTop;
            } else if (e.keyCode === 13) {
                // enter key
                if (this.selectedIndex !== null) {
                    this.choose(this.sortedCountries[this.selectedIndex]);
                }
                this.open = !this.open;
            } else {
                // typing a country's name
                this.typeToFindInput += e.key;
                clearTimeout(this.typeToFindTimer);
                this.typeToFindTimer = setTimeout(() => {
                    this.typeToFindInput = '';
                }, 700);
                // don't include preferred countries so we jump to the right place in the alphabet
                let typedCountryI = this.sortedCountries.slice(this.preferredCountries.length).findIndex(c => c.name.toLowerCase().startsWith(this.typeToFindInput));
                if (~typedCountryI) {
                    this.selectedIndex = this.preferredCountries.length + typedCountryI;
                    let selEle = this.$refs.list.children[this.selectedIndex];
                    if (selEle.offsetTop < this.$refs.list.scrollTop || selEle.offsetTop + selEle.clientHeight > this.$refs.list.scrollTop + this.$refs.list.clientHeight) {
                        this.$refs.list.scrollTop = selEle.offsetTop - this.$refs.list.clientHeight / 2;
                    }
                }
            }
        },
        reset() {
            this.selectedIndex = this.sortedCountries.map(c => c.iso2).indexOf(this.activeCountry.iso2);
            this.open = false;
        },
    },
    directives: {
        // Click-outside from BosNaufal: https://github.com/BosNaufal/vue-click-outside
        'click-outside': {
            bind: function (el, binding, vNode) {
                // Provided expression must evaluate to a function.
                if (typeof binding.value !== 'function') {
                    var compName = vNode.context.name;
                    var warn = '[Vue-click-outside:] provided expression ' + binding.expression + ' is not a function, but has to be';
                    if (compName) {
                        warn += 'Found in component ' + compName;
                    }
                    console.warn(warn);
                }
                // Define Handler and cache it on the element
                var bubble = binding.modifiers.bubble;
                var handler = function (e) {
                    if (bubble || (!el.contains(e.target) && el !== e.target)) {
                        binding.value(e)
                    }
                };
                el.__vueClickOutside__ = handler;
                // add Event Listeners
                document.addEventListener('click', handler)
            },
            unbind: function (el, binding) {
                // Remove Event Listeners
                document.removeEventListener('click', el.__vueClickOutside__);
                el.__vueClickOutside__ = null
            }
        }
    },
};