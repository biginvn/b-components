<template>
	<div class="b__components b-ios b-float-label b__numeric">
		<label :class="classLabel">{{ label }} ( {{ inputAffix }} )</label>
		<input type="text" :class="classes" :placeholder="placeholder" :id="id" :value="inputValue" :disabled="disabled" @input="eventInput($event.target.value)" @blur="eventBlur($event.target.value)" @focus="eventForcus()">
	</div>
</template>
<script>
	import TelerikNumberic from './../../components/TelerikNumberic'
	export default TelerikNumberic
</script>