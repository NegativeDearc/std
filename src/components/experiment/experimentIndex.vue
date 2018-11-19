<template>
  <cron-picker-layout v-bind:show-border="tmp.index >= 0">
    <v-layout slot="1" align-center justify-center fill-height>
      <div class="body-2">每隔</div>
      <cron-number-picker v-on:number-change="changeNumber"></cron-number-picker>
      <cron-date-type-picker v-on:date-type-change="changeDateType"></cron-date-type-picker>
    </v-layout>
    <cron-day-picker slot="2" v-bind:index="tmp.index" v-on:date-picked="getDatePicked"></cron-day-picker>
  </cron-picker-layout>
</template>

<script>
import CronPicker from '../experiment/cronPicker'
import CronPickerLayout from '../experiment/cronPickerLayout'
import CronNumberPicker from '../experiment/cronNumberPicker'
import CronDateTypePicker from '../experiment/cronDateTypePicker'
import CronDayPicker from '../experiment/cronDayPicker'

export default {
  data () {
    return {
      tmp: {
        index: 0,
        number: 0,
        month: '',
        workday: ''
      }
    }
  },
  watch: {
    tmp: {
      handler: function () {
        switch (this.tmp.index) {
          case 0:
            this.tmp.day = [ '*', this.tmp.number * 7 ].join('/')
            break
          case 1:
            this.tmp.day = [ '*', this.tmp.number * 30 ].join('/')
            this.tmp.month = '*'
            break
          case 2:
            this.tmp.day = [ '*', this.tmp.number * 365 ].join('/')
            break
        }
        let _sequence = ['day', 'month', 'workday']
        let _cronArray = ['0', '17']
        for (let _seq of _sequence) {
          _cronArray.push(this.tmp[_seq])
        }
        console.log(this.tmp)
        console.log(_cronArray.join(' ').toString())
        this.$emit('cron-expression', _cronArray.join(' ').toString())
      },
      deep: true
    }
  },
  name: 'experimentIndex',
  components: { CronDayPicker, CronDateTypePicker, CronNumberPicker, CronPickerLayout, CronPicker },
  methods: {
    changeDateType: function (index) {
      this.tmp.index = index
    },
    changeNumber: function (num) {
      this.tmp.number = num
    },
    getDatePicked: function (form) {
      this.tmp.workday = form.workday
      this.tmp.month = form.month
    }
  }
}
</script>

<style scoped>

</style>
