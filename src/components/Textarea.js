import baseComponent from '../base-component'

export default {
	data(){
		return {
			classLabel : '',
			text : ''
		}
	},
	mixins : [baseComponent],
	props	: ['value', 'disabled', 'placeholder', 'label', 'cols', 'rows', 'class-name', 'id', 'name'],
	mounted () {
		this.change(this.value);
	},
	watch :{
		value(value) {
			this.updateChange(value);
		}
	},
	methods : {
		change (value) {
			this.updateChange(value);
		},
		updateChange (value) {
			var isEmpty = value == undefined || value == null || value.length == 0 ? true : false;
			if (!isEmpty)
				this.classLabel = 'active';
			else
				this.classLabel = '';

			this.text = value
			this.$el.querySelector('textarea').value=this.text
			if (value == undefined || value == null)
				this.$el.querySelector('textarea').value=''

			this.$emit('input', value);
		}
	}
}
