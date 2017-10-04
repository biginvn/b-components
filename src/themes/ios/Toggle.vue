<template>
	<div checked="" class="b__components b-toggle" @click="update()">
      	<input type="checkbox" :name="name" :id="id" :class="classes" :disabled="disabled" :checked="isChecked">
		<div class="toggle__toggle">
			<div class="toggle__handle">
				<div class="toggle__touch"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import CheckBox from '../../components/CheckBox'
	export default {
		mixins :	[CheckBox],
		computed : {
			classes () {
				return (this.className ? this.className : '') + ' toggle__input'
			}
		}
	}
</script>