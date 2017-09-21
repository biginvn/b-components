<template>
	<div class="b__components b-ios b-float-label">
		<input @blur="blur($event.target.value)" @focus="focus($event.target.value)" >
	</div>
</template>
<script>
	import NumbericFormatted from './../../components/NumbericFormatted'
	export default NumbericFormatted
</script>