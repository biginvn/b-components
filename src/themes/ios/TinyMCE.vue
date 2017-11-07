<!-- Author: Make By Thien Nguyen Developer -->
<!-- Contacts: thien.nguyen@bigin.vn -->
<!-- Date: 31/10/2017 -->
<!-- Component: SummerNote -->

<template>
	<div class="b__components b__summernote b-ios b-float-label minh class b__input 2">
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
	.fl-wrap-input{
		/*border: 1px solid #dce1e4;*/
		position: relative;
	    text-rendering: optimizeLegibility;
	    -webkit-font-smoothing: antialiased;
	    box-sizing: border-box;
	    font-family: inherit;
	    -webkit-font-smoothing: antialiased;
	    font-weight: normal;
	}
</style>