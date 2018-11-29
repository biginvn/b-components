<template>
	<div class="b__components b__tinymce b-float-label b__input loading-tiny">
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