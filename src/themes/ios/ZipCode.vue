<template>
	<div :class="wrapClass">
		<label :class="classLabel">{{ label }}</label>
      	<input :placeholder="placeholder" :name="name" @blur="blur()" :id="id" :class="classes" :value="value" :disabled="disabled" @input="change($event.target.value)">
	</div>
</template>
<script>
	import ZipCode from './../../components/ZipCode'
	export default ZipCode
</script>