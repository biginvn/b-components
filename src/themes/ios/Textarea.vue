<template>
	<div class="b__components b-ios b-textarea">
		<label :class="classLabel" v-show="!isViewPre">{{ label }}</label>
		<textarea v-show="!isViewPre" :placeholder="placeholder" type="text" :cols="cols" :rows="rows" ref="bTextarea" :id="id" :name="name" :class="(className?className:'') + ' b__textarea'"
				  :disabled="disabled" :value="value" @input="change($event.target.value)">{{ text }}</textarea>
		<div class="b-wrapper-pre" v-show="isViewPre">
			<label class="label-pre" :class="classLabel">{{ label }}</label>
			<pre class="pre-b-textarea" :placeholder="placeholder">{{ contentPreview }}</pre>
		</div>
	</div>
</template>
<script>
    import Textarea from './../../components/Textarea'
    export default Textarea
</script>