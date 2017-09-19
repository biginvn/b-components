import baseComponent from '../base-component'
export default {
	data(){
		return {
			classLabel : '',
		}
	},
	mixins : [baseComponent],
	props	: ['disabled', 'placeholder', 'label', 'class-name', 'name', 'id', 'type'],

	computed : {
		classes () {
			return (this.className?this.className:'') + " b__input"
		},
		typeComponent () {
			if (this.type == undefined || this.type== null || this.type.length == 0)
				return 'text'
			return this.type
		}
	},
	mounted () {
		this.change(this.value)
	},
	methods : {
		change (value) {
			this.updateChange(value);
		},
		updateChange (value) {
			var isEmpty = value == undefined || value == null || value.length == 0 ? true : false;
			if (!isEmpty){
				this.classLabel = 'active';
			}
			else
				this.classLabel = '';

			this.$emit('input', value);

		}
	}
}