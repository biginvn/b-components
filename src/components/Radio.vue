<template>
	<div class="b-radio">
		<input type="radio" :name="name" :id="id" ref="bRadio" :class="(className?className:'') + ' radio__input'" :disabled="disabled" :checked="isCheck" @change="update()">

		<span class="radio__checkmark"></span>
		<label :for="id">{{ label }}</label>
	</div>
</template>
<script>
	export default {
		props : [ 'value', 'disabled', 'name', 'id', 'label', 'class-name' ],
		computed : {
			isCheck() {
				if (this.value == this.$attrs.value)
					return true;
				else return false;
			}
		},
		methods : {
			update() {
				if (this.$refs.bRadio.checked)
					this.$emit('input', this.$attrs.value);

			}
		}

	}
</script>