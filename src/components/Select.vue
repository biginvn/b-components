<template>
	<div class="b-select">
		<label :for="id">{{ label }}</label>
		<select :name="name" :id="id" :disabled="disabled" @change="update($event.target.value)" v-model="selected">
			<option v-for="item in items" :value="item.value">{{ item.name }}</option>
		</select>
	</div>
</template>
<script>
	export default {
		data () {
			return {
			}
		},
		props : [ 'id', 'default', 'label', 'name', 'disabled', 'list', 'item-key', 'item-val', 'value'],
		computed : {
			selected : {
				get () {
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
						name : listItem[this.itemKey]
					}
					items.push(item);
				}

				return items;
			}
		},
		methods : {
			update(val) {
				this.$emit('input', val)
			},
			isSelected(v) {
				if(this.value == v){
					this.selected = v
					return true
				}
				return false
			},
		}

	}
</script>