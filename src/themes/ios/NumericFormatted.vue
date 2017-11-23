<template>
	<div :class="wrapClass">
		<label :class="classLabel">{{ label }}</label>
		<input type="text" :class="classes" @keypress="keypress" @keyup="keyup" @blur="blur($event.target.value)" @focus="focus()" :value="mask" :placeholder="placeholder" :disabled="disabled" @input="updateInput($event.target.value)">
	</div>
</template>
<script>
	import NumbericFormatted from './../../components/NumericFormatted'
	export default NumbericFormatted
</script>