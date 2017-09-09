<template>
	<div class="b-select">
		<label :for="id">{{ label }}</label>
		<select :name="name" :id="id" :disabled="disabled" @change="update()">
			<option v-for="item in items" :value="item.value" :selected="isSelected(item.value)">{{ item.name }}</option>
		</select>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				selected : ''
			}
		},
		props : [ 'id', 'default', 'label', 'name', 'disabled', 'list', 'item-key', 'item-val', 'value'],
		watch : {
			value() {
				this.updateWhenNotFound()
			},
			list () {
				this.updateWhenNotFound()
			}
		},
		mounted () {
			this.updateWhenNotFound()
		},
		computed : {
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
						name : listItem[this.itemKey]
					}
					items.push(item);
				}

				return items;
			}
		},
		methods : {
			update() {
				let selected = this.$el.querySelector('select').value
				this.$emit('input', selected)
				this.selected = selected
			},
			isSelected(v) {
				var a = 1;
				if(this.value == v){
					this.selected = v
					return true
				}
				return false
			},
			isFound() {
				var found = false;
				if (this.list == undefined || this.list == null || this.list.length == 0){
					return found;
				}

				let items = [];
				for(let i=0; i< this.list.length; i++){
					let listItem = this.list[i]
					let item = {
						value : listItem[this.itemVal], 
						name : listItem[this.itemKey]
					}
					if (item.value == this.value){
						found = true
						break
					}
				}

				return found;
			},
			updateWhenNotFound() {
				if (this.list == undefined || this.list == null || this.list.length == 0){
					this.$el.querySelector('select').value=null
				} else {
					var founded = this.isFound()
					if(!founded)
						this.$el.querySelector('select').value=null
				}
			}
		}

	}
</script>