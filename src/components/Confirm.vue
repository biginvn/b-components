<template id="b-confirm-template">
	<div>
		<button v-show="!confirm" :class="btnClass" @click.prevent="confirm=!confirm">
			<i class="icon-close">&nbsp;</i>
		</button><span
						v-show="confirm"
						class='b-btn btn--nohover btn--transparent'
						:class="sureClass">
			Sure?
		</span><button 
						v-show="confirm" 
						class="b-btn btn--red"
						@click.prevent="func()">
			Yes
		</button><button 
						v-show="confirm" 
						class="b-btn btn--gray"
						@click.prevent="confirm=!confirm">
			No
		</button>
	</div>
</template>

<script>

	export default {
		props: {
			btnClass :String,
			sureClass: String,
			func: {
				type: Function,
				required: false
			}
		},
		data: function() {
			return {
				confirm: false
			};
		},		
		template: '#b-confirm-template',
	}
	
</script>