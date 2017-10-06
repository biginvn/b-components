<template>
	<div checked="" class="b__components b-toggle">
		<input type="checkbox" :name="name" :id="id" :class="classes" :disabled="disabled" :checked="isChecked">
		<div class="toggle__btn" :class= "{'active' : isChecked }" @click="update()">
			<div class="toggle__off" :class= "{'active' : !isChecked }" v-if="textOff">{{ textOff }}</div>

			<div class="toggle__on" :class= "{'active' : isChecked }" v-if="textOn">{{ textOn }}</div>
		</div>
	</div>
</template>
<script>
import CheckBox from '../../components/CheckBox'
export default {
	props : ['text-on', 'text-off' , 'effect'],
	mixins :	[CheckBox],
	watch: {
		effect() {
			this.effect = this.effect;
		}
	},
	computed : {
		classes () {
			return (this.className ? this.className : '') + ' toggle__input ' + this.effect
		}
	}
}
</script>