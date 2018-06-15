<template>
	<div class="b__components b__tinymce b-float-label b__input">
		<div>
			<label :class="classLabel">{{ label }}</label>
			<textarea :id="id"></textarea>
		</div>
	</div>
</template>
<script>
	import TinyMCE from './../../components/TinyMCE'
	export default TinyMCE
</script>

<style type="text/css">
/* .tiny-disable{
	pointer-events: none;
	background: red !important;
} */
/*  :disabled="(isEdit == false) ? 'disabled' : ''"  */
</style>