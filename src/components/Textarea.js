import baseComponent from '../mixins/text-field-mixins'

export default {
	data(){
		return {
			text : ''
		}
	},
	mixins : [baseComponent],
	props	: ['cols', 'rows'],
	watch : {
		value () {
			this.updateText(this.value)
		}
	},
	methods : {
		change (value) {
			this.updateFloatLabel(value)
			this.updateText(value)
			this.$emit('input', value)
		},
		updateText (value) {
			this.text = value
			this.$el.querySelector('textarea').value=this.text
			if (value == undefined || value == null)
				this.$el.querySelector('textarea').value=''
		}
	}
}
