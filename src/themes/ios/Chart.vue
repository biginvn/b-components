<template>
	<div class="b__components b-ios b-float-labels chart-container" >
		<div :id="chartId" :type="chartType" :data="chartData"  ></div>
	</div>
</template>

<script>
	import Chart from './../../components/Chart'
	export default Chart
</script>