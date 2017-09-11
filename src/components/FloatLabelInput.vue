<template>
	<div class="b-ios b-float-label">
		<label :class="classLabel">{{ label }}</label>
      	<input :placeholder="placeholder" type="text" ref="bInput" :name="name" :id="id" :class="classes" :value="value" :disabled="disabled" @input="change($event.target.value)">
	</div>
</template>
<script>

	export default {
		data(){
			return {
				classLabel : ''
			}
		},
		props	: ['value', 'disabled', 'placeholder', 'label', 'class-name', 'name', 'id'],
		computed : {
			classes () {
				return this.className + " b__input"
			}
		},
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