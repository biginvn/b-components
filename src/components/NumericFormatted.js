import baseMixins from '../mixins/text-field-mixins'
export default {
    data() {
        return {
            mask: String,
            error: false
        }
    },
    mixins: [baseMixins],
    props: ['affix', 'is_prefix', 'class-name'],
    mounted(mask) {
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
            // this.updateInput(this.value);
            this.blur(this.value.toString());

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
            // console.log(event)
            // console.log(event.key)
            // console.log(event.keyCode)

            // Remove Alphabet
            var charCode = event.charCode;
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
        focus(mask) {
            this.mask = this.value;
        },
        blur(mask) {
            if(mask==undefined) return
            // Validation type Affix
            this.affix == '$' || this.affix == '€' ? mask : mask = Math.trunc(mask).toString();
            if (this.affix == '%') {
                mask > 100 ? mask = '100' : mask;
            }
            // Get String position
            var pos = mask.indexOf('.');
            // Remove A-Z text
            mask = mask.toString().replace(/[^\d\.]/g, "");
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
            console.log($result + ' ' + typeof($result));
        },
        separator(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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