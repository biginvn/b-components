<template>
	<div class="b__components b-ios b-float-label b__numeric">
		<label :class="classLabel">{{ label }}</label>
		<input type="text" :class="classes" @blur="blur($event.target.value)" @focus="focus()" :value = "mask">
	</div>
</template>
<script>
	import NumbericFormatted from './../../components/NumericFormatted'
	export default NumbericFormatted
</script>