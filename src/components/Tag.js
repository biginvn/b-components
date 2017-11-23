import baseComponent from '../mixins/text-field-mixins'

export default {
	mixins : [baseComponent],
	props: ['type'],
	data(){
		return {
			newTag: '',
			tagPlaceholder : '',
			classLabel:''
		}
	},

	mounted(){
		this.setDataDefault()
		this.setTag(this.value)
	},

	computed:{
        tags(){
        	return this.value ? this.value.map( item => item.toString() ) : []
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
			if(tag!= undefined && tag!=null)
				tag = tag.toString()

			let regex = /^[0-9]+\-*[0-9]+$/g
			if(tag!= undefined && tag!=null && !tag.match(regex) && this.type == 'zipcode') return

			if(tag && this.tags.indexOf(tag.toString()) === -1){
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
			this.$emit('input', this.tags)
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
	        this.$emit('input', this.tags)
	        
     	 },
      	updateChange(value) {
      		
			var isEmpty = value == undefined || value == '' || value.length == 0 ? true : false;
			if (!isEmpty){
				this.classLabel = 'active';
			}
			else
				this.classLabel = '';
		},
		onPaste(tag){
			tag = tag.split(',');
			this.setTag(tag);
		},
		setTag(arrayTag){
			if( arrayTag.length == 0 ){
				this.tags = []
				this.tagPlaceholder = this.placeholder
			}
			for( let i = 0; i < arrayTag.length; i++ ){
				this.addNewTag(arrayTag[i])
			}
		},
		keyhandler(event) {
			console.log(event);
     	 let regex = /^[0-9]$/g
     	 if(event.key.match(regex) == null && event.keyCode != 8 &&  event.keyCode != 189 ){
     	 	event.preventDefault();
     	 }
    	},
	}
}