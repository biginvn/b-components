<!-- Component make by thien.nguyen 19/01/2018 -->
<template>
	<div class="b__components b__modal_message">
		<div class="modal fade" :id="id" tabindex="-1" role="dialog" aria-labelledby="ModalViewMode" aria-hidden="true" style="overflow: scroll;">
	        <div class="modal-dialog modal-md">
	          <div class="modal-content" style="width: 75%; margin-left: 20%;">
	            <div class="modal-body clearfix">
	            	{{ message }}
	            </div>
	            <div class="modal-footer">
	            	<button type="button" class="btn-confirm-ok btn btn-primary btn-rounded pull-right" data-dismiss="modal" @click="closeMessage()">Yes</button>
	            </div>
	          </div>
	        </div>
	    </div>
	</div>
</template>
<script>
	import ModalMessage from './../../components/ModalMessage'
	export default ModalMessage
</script>