<template>
	<div class="b-checkbox">
		<input type="checkbox" :id="id" class="checkbox__input" :disabled="disabled" :checked="value" @click="update()">
		<span class="checkbox__checkmark"></span>
		<label :for="id">{{ label }}</label>
	</div>
</template>
<script>
	export default {
		props : [ 'value', 'disabled', 'id', 'label' ],
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