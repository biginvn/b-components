<template>
	<div class="b-ios b-textarea">
		<label :class="classLabel">{{ label }}</label>
      	<textarea :placeholder="placeholder" type="text" :col="col" :row="row" ref="bTextarea" class="b__textarea" :disabled="disabled" @input="change($event.target.value)">{{ value }}</textarea>
	</div>
</template>
<script>

	export default {
		data(){
			return {
				classLabel : ''
			}
		},
		props	: ['value', 'disabled', 'placeholder', 'label', 'col', 'row'],
		mounted () {
			this.change();
		},
		watch :{
			value(value) {
				this.updateChange(value);
			}
		},
		methods : {
			change (value) {
				this.updateChange(this.$refs.bTextarea.value);
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