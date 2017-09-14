<template>
	<div class="b__components b-ios b-float-label">
		<label :class="classLabel">{{ label }}</label>
      	<input :placeholder="placeholder" type="text" ref="bInput" :name="name" :id="id" :class="classes" :value="value" :disabled="disabled" @input="change($event.target.value)">
	</div>
</template>
<script>

	export default {
		data(){
			return {
				classLabel : '',
				objModel : this.value
			}
		},
		props	: ['value', 'disabled', 'placeholder', 'label', 'class-name', 'name', 'id'],
		computed : {
			classes () {
				return (this.className?this.className:'') + " b__input"
			}
		},
		mounted () {
			this.change(this.value)
		},
		methods : {
			change (value) {
				this.updateChange(value);
			},
			updateChange (value) {
				var isEmpty = value == undefined || value == null || value.length == 0 ? true : false;
				if (!isEmpty){
					this.classLabel = 'active';
				}
				else
					this.classLabel = '';
				this.objModel = value

				this.$emit('input', value);

			}
		}
	}
	
</script>