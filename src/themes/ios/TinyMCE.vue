<!-- Author: Make By Thien Nguyen Developer -->
<!-- Contacts: thien.nguyen@bigin.vn -->
<!-- Date: 31/10/2017 -->
<!-- Component: SummerNote -->

<template>
	<div class="b__components b__tinymce b-float-label b__input">
		<div class="class">
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
</style>