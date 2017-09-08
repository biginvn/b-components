<template>
	<div checked="" class="b-switch" v-on:click="update()">
      	<input type="checkbox" class="switch__input" v-bind:checked="value" :disabled="disabled">
		<div class="switch__toggle">
			<div class="switch__handle">
				<div class="switch__touch"></div>
			</div>
		</div>
	</div>
</template>
<script>

	export default {
		props: ['value', 'disabled'],
		methods: {
			update() {
				var checked = true;
				if (this.value)
					checked = false;
				this.$emit('input', checked);
			}
		}
	}
	
</script>