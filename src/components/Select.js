import baseComponent from '../mixins/base-mixins'

export default {
	data () {
		return {
			isActive : false
		}
	},
	mixins: [baseComponent],
	mounted () {
		this.float()
	},
	props : [ 'id', 'default', 'label', 'name', 'disabled', 'list', 'item-text', 'item-val', 'class-name', 'placeholder'],
	computed : {
		selected : {
			get () {
				this.float()
				return this.value;
			},
			set(newValue) {
			}
		},
		items() {
			if (this.list == undefined || this.list == null || this.list.length == 0){
				if (this.default != undefined && this.default != null ){
					return [this.default];
				}
				return [{ value : '', name : '' }];
			}

			let items = [];
			for(let i=0; i< this.list.length; i++){
				let listItem = this.list[i];
				let item = {
					value : listItem[this.itemVal], 
					name : listItem[this.itemText]
				}
				items.push(item);
			}

			return items;
		}
	},
	methods : {
		update(val) {
			this.$emit('input', val)
			this.float()
		},
		float() {
			if( this.$el== undefined || this.value == null || this.value.length == 0){
				this.isActive = false;
				return;
			}

			if (this.isModelInList()){
				this.isActive = true;
				return;
			}

			this.isActive = false;
		},
		isModelInList() {
			var found = false;
			for (var i =0; i < this.items.length; i++){
				var item = this.items[i]
				if (item.value!=null && item.value.toString() == this.value.toString()){
					found = true;
					break;
				}
			}
			return found;
		}
	}

}