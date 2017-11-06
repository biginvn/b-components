<!-- Author: Make By Thien Nguyen Developer -->
<!-- Contacts: thien.nguyen@bigin.vn -->
<!-- Date: 31/10/2017 -->
<!-- Component: SummerNote -->

<template>
	<div class="b__components b__summernote b-ios b-float-label minh class b__input 2">
		<div class="fl-wrap fl-wrap-input fl-is-active fl-has-focus">
			<label :class="classLabel" id="label-tinyMCE" >{{ label }}</label>
			<textarea id="bTinyMCE__Components"></textarea>
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