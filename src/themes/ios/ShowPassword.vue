<template>
	<div class="b__components b-ios b-float-label">
		<label :class="classLabel">{{ label }}</label>
      	<input :placeholder="placeholder" :type="isShow" ref="bInput" :name="name" :id="id" :class="classes" :value="value" :disabled="disabled" @input="change($event.target.value)">
      	<span title="Click here to show/hide password" class="add_on" @click="OnOffPassword()"><i :class="switchEye"></i></span>
	</div>
</template>
<script>
	import TextField from './../../components/TextField'
	export default {
		data () {
		return {
				isShow : 'text',
				switchEye: 'fa fa-eye'
			}
		},
		mixins :	[TextField],
		methods: {
        	OnOffPassword(){
        		this.switchEye == 'fa fa-eye' ? this.switchEye = 'fa fa-eye-slash' : this.switchEye = 'fa fa-eye'
				this.isShow == 'text' ? this.isShow = 'password' : this.isShow = 'text';
			}
		}
	}
</script>