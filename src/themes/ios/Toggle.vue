<template>
	<div checked="" class="b__components b-toggle" @click="update()">
      	<input type="checkbox" :name="name" :id="id" :class="classes" :disabled="disabled" :checked="isChecked">
		<div class="toggle__toggle" :class= "{'active' : isChecked }">
			<span class="toggle__icon"></span>
			<div class="content">
				<div class="toggle__off" :class= "{'active' : !isChecked }" v-if="textOff">{{ textOff }}</div>
				<div class="toggle__on" :class= "{'active' : isChecked }" v-if="textOn">{{ textOn }}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import CheckBox from '../../components/CheckBox'
	export default {
		props : ['text-on', 'text-off'],
		mixins :	[CheckBox],
		computed : {
			classes () {
				return (this.className ? this.className : '') + ' toggle__input'
			}
		}
	}
</script>