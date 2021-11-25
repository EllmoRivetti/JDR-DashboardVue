<template>
  <div id="app">
   <!--<reactive-bar-chart :chart-data="chartData"></reactive-bar-chart>-->
  </div>
</template>
<script>
import Chart from 'chart.js/auto'
import chartData from '../js/chart-data.js'
import ReactiveBarChart from "../js/ReactiveBarChart.js";

export default {
  name: 'Map',
  components: {
    ReactiveBarChart
  },
  data() {
    return {
      chartData: null
    };
  },
  methods: {
    generateData() {
      let newArray = [];
      for (let i = 0; i < 10; i++) {
        let randomValue = Math.floor(Math.random() * 10);
        newArray.push(randomValue);
      }

      this.chartData = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: newArray
          }
        ]
      };
    }
  },
  mounted() {
    setInterval(this.generateData, 2000);
  }
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>