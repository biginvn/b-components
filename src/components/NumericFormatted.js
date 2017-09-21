import baseMixins from '../mixins/text-field-mixins'
export default{
	mixins: [baseMixins],
	props: ['currency','prefixes'],
	mounted() {
		this.blur(this.value);
	},
	watch: {
		value() {
			this.blur(this.value);
		},
		prefixes() {
			this.blur(this.value);
		},
		currency() {
			this.blur(this.value);
		}
	},
	methods: {
		focus(value){
			value = parseFloat(value.replace(/[^\d\.]/g, ""));
			this.$el.querySelector('input').value = isNaN(value)? 0 : value;
		},
		blur(value){
			value = parseFloat(value.toString().replace(/[^\d\.]/g, "")) ;
			this.$emit("input", value);
			if (this.prefixes) {
				if(this.$el.querySelector('input').value = isNaN(value)){
					this.$el.querySelector('input').value = 0 + ' ' + this.currency;
				}
				else{
					this.$el.querySelector('input').value = value.toLocaleString() + ' ' + this.currency;
				}
			}
			else{
				if(this.$el.querySelector('input').value = isNaN(value)){
					this.$el.querySelector('input').value = this.currency + ' ' + 0;
				}
				else{
					this.$el.querySelector('input').value = this.currency + ' ' + value.toLocaleString();
				}
			}
		}
	}
}