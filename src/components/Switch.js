import baseComponent from '../base-component'

export default {
	props: ['disabled'],
	mixins : [baseComponent],
	methods: {
		update() {
			var checked = true;
			if (this.value)
				checked = false;
			this.$emit('input', checked);
		}
	}
}
