<template>
	<div class="b__components b-ios b-float-label">
		<label :class="classLabel">{{ label }}</label>
		<input :placeholder="placeholder" :type="typeComponent" ref="bInput" :min="min" :max="max" :name="name" :id="id" :class="classes" :value="value" :disabled="disabled" @input="change($event.target.value)" @blur="blur" @focus="focus" @keyup="keyup">	
	</div>
</template>
<script>
	import TextField from './../../components/TextField'
	export default TextField
</script>