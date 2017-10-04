<template>
	<div class="b__components b-ios b-textarea">
		<label :class="classLabel">{{ label }}</label>
      	<textarea :placeholder="placeholder" type="text" :cols="cols" :rows="rows" ref="bTextarea" :id="id" :name="name" :class="(className?className:'') + ' b__textarea'" :disabled="disabled" :value="value" @input="change($event.target.value)">{{ text }}</textarea>
	</div>
</template>
<script>
	import Textarea from './../../components/Textarea'
	export default Textarea
</script>