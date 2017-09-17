<template>
	<div class="b__components b-checkbox">
		<input type="checkbox" :name="name" :id="id" :class="classes" :disabled="disabled" :checked="isChecked" @click="update()">
		<span class="checkbox__checkmark"></span>
		<label :for="id">{{ label }}</label>
	</div>
</template>
<script>
	import CheckBox from './../../components/CheckBox'
	export default CheckBox
</script>