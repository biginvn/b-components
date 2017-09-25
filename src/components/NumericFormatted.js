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
		focus(){
			this.mask = this.value
		},
		blur(value){
			this.mask = this.convertNumberToString(value)
			value = this.convertValueToNumber(value)
			this.$emit("input", value)
		},
		convertNumberToString(number){
			let value = this.convertValueToNumber(number)
			if(isNaN(value))
				return this.is_prefix ? this.currency + ' 0' : '0 ' + this.currency
			return this.is_prefix ? this.currency + ' ' + value.toLocaleString() : value.toLocaleString() + ' ' + this.currency
		},
		convertValueToNumber(value){
			if (value == undefined || value == null)
				value = 0
			let number = value.toString().replace(/[^\d\.]/g, "")
			if (number.length == 0)
				return 0
			return parseFloat(number)
		}
	}
}