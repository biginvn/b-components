<template>
	<div class="b__components b-radio">
		<input type="radio" :name="name" :id="id" ref="bRadio" :class="(className?className:'') + ' radio__input'" :disabled="disabled" :checked="isCheck" @change="update()">

		<span class="radio__checkmark"></span>
		<label :for="id">{{ label }}</label>
	</div>
</template>
<script>
	import Radio from './../../components/Radio'
	export default Radio
</script>