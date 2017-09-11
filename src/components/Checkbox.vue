<template>
	<div class="b-checkbox">
		<input type="checkbox" :name="name" :id="id" :class="classes" :disabled="disabled" :checked="isChecked" @click="update()">
		<span class="checkbox__checkmark"></span>
		<label :for="id">{{ label }}</label>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				checkedStore : false
			}
			
		},
		props : [ 'class-name','value', 'disabled', 'id', 'label', 'checked', 'name' ],
		created () {
			if (this.value != undefined){
				this.checkedStore = this.value
			} else {
				this.checkedStore = this.checked
			}
		},
		computed : {
			classes () {
				return (this.className?this.className:'') + ' checkbox__input'
			},
			isChecked (){
				return this.checkedStore
			}
		},
		methods : {
			update() {
				var checked = true;
				if (this.value)
					checked = false;
				this.$emit('input', checked);
			}
		}

	}
</script>