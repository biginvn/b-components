import baseMixins from '../mixins/text-field-mixins'
export default{
	data () {
		return {
			mask : String
		}
	},
	mixins: [baseMixins],
	props: ['affix','is_prefix'],
	mounted(mask) {
		this.blur(this.value);
	},
	watch: {
		value() {
			this.blur(this.value.toString());
			this.updateInput(this.value);
		},
		is_prefix(){
			this.blur(this.value);
		},
		affix() {
			this.blur(this.value);
		}
	},
	methods: {
		updateInput (value) {
			// Null Value and return ''
			if(value == null || value == ''){
				value = '';
				this.updateFloatLabel(value);
				this.$emit("input", value);
			}
		},
		focus(mask){
			this.mask = this.value;
		},
		blur(mask){
			// Get String position
			var pos = mask.indexOf('.');
			// Remove A-Z text
			mask = mask.toString().replace(/[^\d\.]/g, "")
			if (pos > 0) {
				var behind = mask.substring(pos+1), // 1 is the length of your "." marker
					forward = mask.split(".").shift();
				if(behind == undefined || behind == null || behind == ''){
					mask = forward + '.0'
				}
				this.$emit("input", mask);
				// If Value = 4321. return 4321.0
				behind = '0.' + behind;
				mask = forward;
			}
			else{
				if(mask == 0){
					mask = '';
				}
				this.$emit("input", mask);
				behind = 0;
			}

			var n, number, $mask, $result;
			n = parseFloat(mask) + parseFloat(behind);
			// Check Value is Null & Check Affix
			$mask = this.isNull(n);
			if(this.is_prefix != undefined){
				if($mask != ''){
					$result = this.is_prefix ? this.affix + ' ' + this.separator($mask) : this.separator($mask) + ' ' + this.affix
				}
				else{
					$result = '';
				}
			}
			else{
				if($mask != ''){
					$result = this.separator($mask)
				}
				else{
					$result = '';
				}
			}
			this.mask = $result;
			console.log($result + ' ' + typeof($result));
		},
		separator(value){
			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		isNull(n){
			if(typeof(n) == 'number'){
				if(n == undefined || n == null || n == 0 || isNaN(n)){
					return n = '';
				}
				else{
					if(this.affix == '$' || this.affix == '€'){
						return n.toFixed(2);
					}
					if(this.affix == '%' || this.affix == 'VND'){
						return Math.trunc(n);
					}
					return n;
				}
			}
		}
	}
}