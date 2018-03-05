<template>
 <div class="b__components b-ios b-float-label">
  <label :class="classLabel">{{ label }}</label>
  <input :placeholder="placeholder" :type="typeComponent" :min="min" :maxlength="maxLength" ref="bInput" :name="name" :id="id" :class="classes" :value="value" :disabled="disabled" @input="change($event.target.value)" @blur="blur" @focus="focus">
  <slot name="otherElements"></slot>
 </div>
</template>
<script>
	import TextField from './../../components/TextField'
	export default TextField
</script>