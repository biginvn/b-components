<template>
	<div class="b-ios b-float-label">
		<label :class="classLabel">{{ label }}</label>
      	<input :placeholder="placeholder" type="text" ref="bInput" class="b__input" :value="value" :disabled="disabled" @input="change()">
	</div>
</template>
<script>

	export default {
		data(){
			return {
				classLabel : ''
			}
		},
		props	: ['value', 'disabled', 'placeholder', 'label'],
		mounted () {
			this.change();
		},
		watch :{
			value(value) {
				this.updateChange(value);
			}
		},
		methods : {
			change () {
				this.updateChange(this.$refs.bInput.value);
			},
			updateChange (value) {
				var isEmpty = value == undefined || value == null || value.length == 0 ? true : false;
				if (!isEmpty)
					this.classLabel = 'active';
				else
					this.classLabel = '';

				this.$emit('input', value);
			}
		}
	}
	
</script>