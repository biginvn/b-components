import baseMixins from '../mixins/text-field-mixins'
export default{
	data () {
		return {
			mask : '0 ' + '$'
		}
	},
	mixins: [baseMixins],
	props: ['affix','is_prefix'],
	mounted() {
		this.blur(this.value)
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
		updateInput (value) {
			this.mask = this.convertValueToNumber(value)
			this.updateFloatLabel(value)
		},
		focus(){
			this.mask = this.value;
		},
		blur(value){
			// console.log('Already Blur')
			this.mask = this.convertNumberToString(value)
			value = this.convertValueToNumber(value)
			this.$emit("input", value)
			this.updateFloatLabel(value)
		},
		convertNumberToString(number){
			// console.log('Convert Number To String')
			let value = this.convertValueToNumber(number)
			if(this.is_prefix != undefined){
				if(value != null && value > 0){
					return this.is_prefix ? this.affix + ' ' + value.toLocaleString() : value.toLocaleString() + ' ' + this.affix
				return ''
				}
			}
			else{
				if(value != null && value > 0){
					return value.toLocaleString()
				return ''
				}
			}
		},
		convertValueToNumber(value){
			// console.log('Convert Value To Number')
			if (value == undefined || value == null || value.toString().trim().length == 0)
				value = ""
			let number = value.toString().replace(/[^\d\.]/g, "")
			// console.log(number)
			if (number == 0)
				return null
			return parseFloat(number)
		}
	}
}