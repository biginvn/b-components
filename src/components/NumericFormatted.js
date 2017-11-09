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
			this.mask = this.convertNumberToString(value)
			value = this.convertValueToNumber(value)
			this.$emit("input", value)
			this.updateFloatLabel(value)
		},
		convertNumberToString(number){
			let value = this.convertValueToNumber(number)
			// debugger;
			if(this.is_prefix != undefined){
				if(value != null && value > 0){
					return this.is_prefix ? this.affix + ' ' + this.separator(value) : this.separator(value) + ' ' + this.affix
					return ''
				}
			}
			else{
				if(value != null && value > 0){
					return this.separator(value)
					return ''
				}
			}
		},
		convertValueToNumber(value){
			if (value == undefined || value == null || value.toString().trim().length == 0)
				value = ""
			let number = value.toString().replace(/[^\d\.]/g, "")
			if (number == 0){
				return null
			}
			else{
				return this.currencyType(number);
			}
		},
		currencyType(number){
			if(this.affix == '$'){
				return parseFloat(number).toFixed(2);
				console.log('Is Dollar');
			}
			else{
				return parseFloat(number);
			}
		},
		separator(value){
			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			console.log(value);
		}
		
	}
}