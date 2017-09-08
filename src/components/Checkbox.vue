<template>
	<div class="b-checkbox">
		<input type="checkbox" class="checkbox__input" :disabled="disabled" :checked="value" @click="update()">
		<span class="checkbox__checkmark"></span>
	</div>
</template>
<script>
	export default {
		props : [ 'value', 'disabled' ],
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