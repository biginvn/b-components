<template>
  <div class="b__components b-ios b-float-labels chart-container">
    <div
      v-if="chartType === 'doughnut' || chartType === 'doughnutChart'"
      :id="chartId"
      :type="chartType"
      :data="chartData"
    ></div>
    <canvas
      v-else
      :id="chartId"
      :type="chartType"
      :data="chartData"
      style="width: 100%; height: 350px"
    ></canvas>
  </div>
</template>

<script>
  import Chart from './../../components/Chart'
  export default Chart
</script>
