<template>
	<div checked="" class="b__components b-switch" v-on:click="update()">
      	<input type="checkbox" class="switch__input" v-bind:checked="value" :disabled="disabled">
		<div class="switch__toggle">
			<div class="switch__handle">
				<div class="switch__touch"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import Switch from './../../components/Switch'
	export default Switch
</script>