import baseMixins from '../mixins/text-field-mixins'
export default {
    data() {
        return {
            mask: '',
            valueTemp: '',
            error: false,
        }
    },
    mixins: [baseMixins],
    // props: ['affix', 'is_prefix', 'class-name'],
    props : {
        affix: {
            type: String,
            default: null
        },
        is_prefix: {
            type: Boolean,
            default: true
        },
        className: {
            type: String,
            required: false
        },
        maxValue: {
            type: Number,
            default: null
        },
        minValue: {
            type: Number,
            default: null
        },
        decimalNumber: {
            type: Number,
            default: 2
        }
    },
    mounted() {
        this.blur(this.value);
    },
    computed: {
        wrapClass () {
            let defaultClass = 'b__components b-ios b-float-label b__numeric';
            return ( this.error ? 'has-error ' : '' ) + defaultClass
        },
        maxValueNumber() {
            if (this.affix == "%" && this.maxValue === null)
                return 100;
            return this.maxValue;
        },
        minValueNumber() {
            if (this.minValue === null)
                return 0;

            return this.minValue;
        }
    },
    watch: {
        value() {
            this.blur(this.value);
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
            let minCharCodeAllow = 46;

            // Prevent '..'
            if( event.target.value.includes('.') ){
                event.charCode == 46 ? event.preventDefault() : event.charCode;
            }

            // Allow input "-" for negative number (only start of string):
            if( event.target.value !== "" && this.minValueNumber < 0){
                event.charCode == 45 ? event.preventDefault() : event.charCode;
                minCharCodeAllow = 45;
            }

            // Remove Alphabet
            if (charCode != 0) {
                // 48 - 57
                if (charCode < minCharCodeAllow || charCode > 57 || charCode == 47 ) {
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
            this.mask = event.target.value;
            var mask = this.mask;
            // Null Value and return ''
            mask == undefined || mask == null || mask == '' ? mask = '' : mask ;
            this.updateFloatLabel(mask);
        },
        focus() {
            this.mask = (this.value === "" || this.value === null) ? "" : (Math.round(parseFloat(this.value) * 100) / 100);
        },
        blur(mask) {
            // Validation type Affix
            if (mask === "" || mask === null) {
                this.$emit("input", "");
                return this.mask = "";
            }

            if (this.maxValueNumber !== null)
                parseFloat(mask) > this.maxValueNumber ? mask = this.maxValueNumber.toString() : mask;

            if (this.minValueNumber !== null)
                parseFloat(mask) < this.minValueNumber ? mask = this.minValueNumber.toString() : mask;

            mask = this.validateString(mask);

            // Get String position of "."
            var pos = mask.indexOf('.');
            // Cut String to Forward & Behind  "432.11" => "432" & "11"
            if (pos > 0) {
                var behind = mask.substring(pos + 1), // 1 is the length of your "." marker
                    forward = mask.split(".").shift();
                // If behind is not define "432."
                if (behind == undefined || behind == null || behind == '') {
                    mask = forward
                }
                this.$emit("input", this.isNull(parseFloat(mask)));

                // If Value = 4321. return 4321.0
                behind = '0.' + behind;
                mask = forward;
            } else {
                if (!this.validateIntegerFromString(mask)) { // Check value is integer
                    this.$emit("input", "");
                }
                else
                    this.$emit("input", mask);
                behind = null;
            }

            var n, number, $mask, $result;
            if ((mask === "" && behind === null) || !this.validateIntegerFromString(mask))
                n = null;
            else {
                if (behind === null)
                    n = parseFloat(mask);
                else
                    n = parseFloat(mask) + parseFloat(behind);
            }

            // Check Value is Null & Check Affix
            $mask = this.isNull(n);

            if ($mask != '') {
                if (this.affix !== null)
                    $result = this.is_prefix ? this.affix + this.separator($mask) : this.separator($mask) + this.affix
                else
                    $result = this.separator($mask)
            } else {
                $result = '';
            }

            this.mask = $result;

            this.updateFloatLabel(this.mask);
        },
        validateIntegerFromString(string) {
            let isInt = /^[-]?\d+$/.test(string);
            return isInt;
        },
        validateString(value){
            typeof(value) == 'number' ? value = value.toString() : value;
            if( value === undefined || value === null){
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
            if (n === null)
                return n = "";
            if (typeof(n) == 'number') {
                if (n === undefined || n === null || isNaN(n)) {
                    return n = '';
                } else {
                    if (this.decimalNumber === 0) {
                        return Math.round(n).toString();
                    }
                    else {
                        return n.toFixed(this.decimalNumber);
                    }
                }
            }
        }
    }
}