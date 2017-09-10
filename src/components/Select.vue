<template>
	<div class="b-select">
		<label :for="id" :class="isActive ? 'active' : '' ">{{ label }}</label>
		<select :placeholder="label" :name="name" :id="id" :disabled="disabled" @change="update($event.target.value)" v-model="selected">
			<option v-for="item in items" :value="item.value">{{ item.name }}</option>
		</select>
		<span :class=" isActive ? 'placeholder' : 'placeholder show' ">{{ label }}</span>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				isActive : false
			}
		},
		mounted () {
			this.float()
		},
		props : [ 'id', 'default', 'label', 'name', 'disabled', 'list', 'item-key', 'item-val', 'value'],
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
					if (item.value.toString() == this.value.toString()){
						found = true;
						break;
					}
				}
				return found;
			}
		}

	}
</script>