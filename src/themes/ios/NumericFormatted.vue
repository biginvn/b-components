<template>
	<div class="b__components b-ios b-float-label b__numeric">
		<label :class="classLabel">{{ label }}</label>
		<input @blur="blur($event.target.value)" @focus="focus($event.target.value)" class="b__input">
	</div>
</template>
<script>
	import NumbericFormatted from './../../components/NumericFormatted'
	export default NumbericFormatted
</script>