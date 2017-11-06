import baseComponent from '../mixins/base-mixins'

export default {
	mixins : [baseComponent],
	props:{
		tags:{
			type: Array,
			default:() => []
		}
	},
	data(){
		return {
			
			newTag: '',
			classLabel : '',
			

		}
	},
	methods:{
		focusNewTag(){
			this.$el.queySelector('.new_tag').focus();
		},
		addNewTag(tag){
			if(tag && this.tags.indexOf(tag) === -1){
				this.updateChange(tag);
				this.tags.push(tag);

				this.tagChange();

			}
			this.placeholder = '';
			this.newTag = '';
		},
		remove(index){
			this.tags.splice(index,1);
			if(this.tags.length == 0){
	        	this.updateChange(this.tags);
	        	this.placeholder = 'Input Tag';
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
	        	this.placeholder = 'Input Tag';
	        }
	        this.tagChange();
	        
     	 },
      	updateChange (value) {
      		
			var isEmpty = value == undefined || value == '' || value.length == 0 ? true : false;
			if (!isEmpty){
				this.classLabel = 'active';
			}
			else
				this.classLabel = '';
		},
		onPaste(evt){
			console.log(tags);
		}
	}
}