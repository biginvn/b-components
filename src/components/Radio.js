import baseComponent from '../base-component'
export default {
	mixins : [baseComponent],
	props : [ 'disabled', 'name', 'id', 'label', 'class-name' ],
	computed : {
		isCheck() {
			if (this.value == this.$attrs.value)
				return true;
			else return false;
		}
	},
	methods : {
		update() {
			if (this.$refs.bRadio.checked)
				this.$emit('input', this.$attrs.value);

		}
	}

}