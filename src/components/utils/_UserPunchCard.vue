<template>
  <div>
    <v-layout>
      <v-flex xs12 md12>
        <apexcharts height="100%" width="100%" type="area" v-bind:options="chartOptions" v-bind:series="series"></apexcharts>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'UserPunchCard',
  components: {
    apexcharts: VueApexCharts
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        }
      },
      dataLabels: {
        enabled: false
      },
      theme: {
        monochrome: {
          enabled: true,
          color: '#255aee',
          shadeTo: 'light',
          shadeIntensity: 0.65
        }
      },
      xaxis: {
        type: 'datetime',
        category: []
      },
      series: []
    }
  },
  mounted: function () {
    this.axios.get('/punch/' + this.$store.state.USER_ID)
      .then(data => {
        let _xaxis = []
        let _total = []
        let _onTimeFinish = []

        for (let i in data.data.target) {
          _xaxis.push(data.data.target[i])
        }

        for (let i in data.data.cumTotal) {
          _total.push(data.data.cumTotal[i])
        }

        for (let i in data.data.onTimeFinishTotal) {
          _onTimeFinish.push(data.data.onTimeFinishTotal[i])
        }

        let _a = []
        let _b = []
        for (let i in _total) {
          let _tmp = []
          _tmp.push(_xaxis[i])
          _tmp.push(_total[i])
          _a.push(_tmp)
        }

        for (let i in _total) {
          let _tmp = []
          _tmp.push(_xaxis[i])
          _tmp.push(_onTimeFinish[i])
          _b.push(_tmp)
        }
        this.series.push({ name: 'Total Task', data: _a })
        this.series.push({ name: 'On Time Finish', data: _b })
      })
  }
}
</script>

<style scoped>

</style>
