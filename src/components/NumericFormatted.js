import baseMixins from '../mixins/text-field-mixins'
export default {
    data() {
        return {
            mask: '',
            valueTemp: '',
            error: false
        }
    },
    mixins: [baseMixins],
    props: ['affix', 'is_prefix', 'class-name'],
    mounted() {
        // this.validateString(this.value);
        this.blur(this.value);
    },
    computed: {
        wrapClass () {
            let defaultClass = 'b__components b-ios b-float-label b__numeric';
            return ( this.error ? 'has-error ' : '' ) + defaultClass
        }
    },
    watch: {
        value() {
            this.blur(this.value);
            // this.validateString(this.value);
            this.mask == '0' ? this.mask = '' : this.mask;
        },
        is_prefix() {
            this.blur(this.value);
        },
        affix() {
            this.blur(this.value);
        }
    },
    methods: {
        keypress(event) {
            var charCode = event.charCode;

            // Prevent '..'
            if( event.target.value.includes('.') ){
                event.charCode == 46 ? event.preventDefault() : event.charCode;
            }

            // Remove Alphabet
            if (charCode != 0) {
                // 48 - 57
                if (charCode < 46 || charCode > 57 || charCode == 47) {
                    event.preventDefault();
                    return this.error = true;
                }
                return this.error = false;
            }

        },
        keyup(event) {
            this.mask = event.target.value;
            if(event.key.match(/^[0-9]$/g, "") == null && event.keyCode != 8 && event.keyCode != 190){
                return this.error = false;
            }
        },
        updateInput(value) {
            // Null Value and return ''
            if (value == undefined || value == null || value == '') {
                value = '';
                this.updateFloatLabel(value);
                this.$emit("input", value);
            }
        },
        focus() {
            this.mask = this.value;
        },
        blur(mask) {
            // Validation type Affix
            this.affix == '$' || this.affix == '€' ? mask : mask = Math.trunc(mask).toString();
            if (this.affix == '%') {
                mask > 100 ? mask = '100' : mask;
            }
            mask = this.validateString(mask);
            // Get String position
            var pos = mask.indexOf('.');
            // Cut String to Forward & Behind  "432.11" => "432" & "11"
            if (pos > 0) {
                var behind = mask.substring(pos + 1), // 1 is the length of your "." marker
                    forward = mask.split(".").shift();
                if (behind == undefined || behind == null || behind == '') {
                    mask = forward + '.0'
                }
                this.$emit("input", mask);
                // If Value = 4321. return 4321.0
                behind = '0.' + behind;
                mask = forward;
            } else {
                if (mask == 0) {
                    mask = '';
                }
                this.$emit("input", mask);
                behind = 0;
            }

            var n, number, $mask, $result;
            n = parseFloat(mask) + parseFloat(behind);
            // Check Value is Null & Check Affix
            $mask = this.isNull(n);
            if (this.is_prefix != undefined) {
                if ($mask != '') {
                    $result = this.is_prefix ? this.affix + ' ' + this.separator($mask) : this.separator($mask) + ' ' + this.affix
                } else {
                    $result = '';
                }
            } else {
                if ($mask != '') {
                    $result = this.separator($mask)
                } else {
                    $result = '';
                }
            }
            this.mask = $result;
        },
        validateString(value){
            typeof(value) == 'number' ? value = value.toString() : value;
            if( value == undefined || value == null || value == '0' ){
                value = '';
                return value;
            }
            return value;
        },
        separator(value) {
            value = this.validateString(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return value;
        },
        isNull(n) {
            if (typeof(n) == 'number') {
                if (n == undefined || n == null || n == 0 || isNaN(n)) {
                    return n = '';
                } else {
                    if (this.affix == '$' || this.affix == '€') {
                        return n.toFixed(2);
                    }
                    if (this.affix == '%' || this.affix == 'VND') {
                        return Math.trunc(n);
                    }
                    return n;
                }
            }
        }
    }
}