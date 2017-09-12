<template>
	<div class="b-ios b-textarea">
		<label :class="classLabel">{{ label }}</label>
      	<textarea :placeholder="placeholder" type="text" :cols="col" :rows="row" ref="bTextarea" :id="id" :name="name" :class="(className?className:'') + ' b__textarea'" :disabled="disabled" @input="change($event.target.value)">{{ text }}</textarea>
	</div>
</template>
<script>

	export default {
		data(){
			return {
				classLabel : '',
				text : ''
			}
		},
		props	: ['value', 'disabled', 'placeholder', 'label', 'col', 'row', 'class-name', 'id', 'name'],
		mounted () {
			this.change(this.value);
		},
		watch :{
			value(value) {
				this.updateChange(value);
			}
		},
		methods : {
			change (value) {
				this.updateChange(value);
			},
			updateChange (value) {
				var isEmpty = value == undefined || value == null || value.length == 0 ? true : false;
				if (!isEmpty)
					this.classLabel = 'active';
				else
					this.classLabel = '';

				this.text = value
				this.$el.querySelector('textarea').value=this.text

				this.$emit('input', value);
			}
		}
	}
	
</script>