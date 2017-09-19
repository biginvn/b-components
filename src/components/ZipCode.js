import baseComponent from '../base-component'
export default {
	data(){
		return {
			classLabel : '',
		}
	},
	mixins : [baseComponent],
	props	: ['disabled', 'placeholder', 'label', 'class-name', 'name', 'id'],

	computed : {
		classes () {
			return (this.className?this.className:'') + " b__input b__zip__code"
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

			if (this.validate(value))
				this.$emit('input', value)
			else
				this.$emit('input', null)

		},
		validate(value){
			const regex = /^(?!0{3})[0-9]{3,5}$/gm;
			let m;

			while ((m = regex.exec(str)) !== null) {
			    // This is necessary to avoid infinite loops with zero-width matches
			    if (m.index === regex.lastIndex) {
			        regex.lastIndex++;
			    }
			    
			    // The result can be accessed through the `m`-variable.
			    m.forEach((match, groupIndex) => {
			        console.log(`Found match, group ${groupIndex}: ${match}`);
			    });
			}

			if (m.length > 0)
				return true
			return false
		}
	}
}