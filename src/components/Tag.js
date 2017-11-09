import baseComponent from '../mixins/text-field-mixins'

export default {
	mixins : [baseComponent],
	props:{
		tags:{
			type: Array,
			default:() => []
		},
	},
	data(){
		return {
			newTag: '',
			tagPlaceholder : ''
		}
	},

	mounted(){
		this.setDataDefault()
		this.setTag(this.value)
	},

	watch:{
        value(){
        	this.setTag(this.value)
        },
    },

	methods:{

		setDataDefault(){
			return this.tagPlaceholder = this.placeholder
		},

		focusNewTag(){
			this.$el.queySelector('.new_tag').focus();
		},
		addNewTag(tag){
			if(tag && this.tags.indexOf(tag) === -1){
				this.updateChange(tag);
				this.tags.push(tag);
				this.tagChange();
			}
			this.$emit('input',this.tags);
			this.tagPlaceholder = '';
			this.newTag = '';
		},
		remove(index){
			this.tags.splice(index,1);
			if(this.tags.length == 0){
	        	this.updateChange(this.tags);
	        	// this.tagPlaceholder = this.placeholder;
	        }
			this.tagChange();
		},
		tagChange () {
	        if (this.onChange) {
	          this.onChange(JSON.parse(JSON.stringify(this.tags)))
	        }
      	},
      	removeLastTag () {
	        if (this.newTag) { return }
	        this.tags.pop();
	    	if(this.tags.length == 0){
	        	this.updateChange(this.tags);
	        	this.tagPlaceholder = this.placeholder;
	        }
	        this.tagChange();
	        
     	 },
      	updateChange(value) {
      		
			var isEmpty = value == undefined || value == '' || value.length == 0 ? true : false;
			if (!isEmpty){
				this.classLabel = 'active';
			}
			else
				this.classLabel = '';
		},
		onPaste(evt){
			console.log(tags);
		},
		setTag(arrayTag){
			if( arrayTag.length == 0 ){
				this.tags = []
				this.tagPlaceholder = this.placeholder
			}
			for( let i = 0; i < arrayTag.length; i++ ){
				this.addNewTag(arrayTag[i])
			}
		}
	}
}