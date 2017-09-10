<template>
	<div class="b-checkbox">
		<input type="checkbox" :id="id" class="checkbox__input" :disabled="disabled" :checked="isChecked" @click="update()">
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
		props : [ 'value', 'disabled', 'id', 'label', 'checked' ],
		created () {
			if (this.value != undefined){
				this.checkedStore = this.value
			} else {
				this.checkedStore = this.checked
			}
		},
		computed : {
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