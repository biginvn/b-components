import baseMixins from '../mixins/text-field-mixins'
export default{
	data () {
		return {
			mask : '0 ' + '$'
		}
	},
	mixins: [baseMixins],
	props: ['currency','is_prefix'],
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
		currency() {
			this.blur(this.value);
		}
	},
	methods: {
		updateInput (value) {
			this.updateFloatLabel(value)
			this.mask = this.convertNumberToString(value)
			console.log("Mask : " + 
				this.convertNumberToString(value))
		},
		focus(){
			this.mask = this.value;
		},
		blur(value){

			this.mask = this.convertNumberToString(value)
			value = this.convertValueToNumber(value)
			this.$emit("input", value)
		},
		convertNumberToString(number){
			console.log('convert number to string' + number)
			let value = this.convertValueToNumber(number)
			console.log('value: ' + value)
			if(value != null && value > 0)
				return this.is_prefix ? this.currency + ' ' + value.toLocaleString() : value.toLocaleString() + ' ' + this.currency
			return ""
		},
		convertValueToNumber(value){
			console.log('conver value to number')
			if (value == undefined || value == null || value.toString().trim().length == 0)
				value = ""
			let number = value.toString().replace(/[^\d\.]/g, "")
			if (number.length == 0)
				return null
			return parseFloat(number)
		}
	}
}