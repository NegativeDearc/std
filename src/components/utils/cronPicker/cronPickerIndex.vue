<template>
  <cron-picker-layout v-bind:show-border="tmp.index >= 0" id="cron-picker">
    <v-layout slot="1" align-center justify-center fill-height>
      <div class="body-2">每隔</div>
      <cron-number-picker v-on:number-change="changeNumber"></cron-number-picker>
      <cron-date-type-picker v-on:date-type-change="changeDateType"></cron-date-type-picker>
    </v-layout>
    <cron-day-picker slot="2" v-bind:index="tmp.index" v-on:date-picked="getDatePicked"></cron-day-picker>
  </cron-picker-layout>
</template>

<script>
import CronPickerLayout from './cronPickerLayout'
import CronNumberPicker from './cronNumberPicker'
import CronDateTypePicker from './cronDateTypePicker'
import CronDayPicker from './cronDayPicker'

export default {
  name: 'cronPickerIndex',
  components: { CronDayPicker, CronDateTypePicker, CronNumberPicker, CronPickerLayout },
  data () {
    return {
      tmp: {
        index: 0,
        number: 0,
        workday: null,
        month: null
      }

    }
  },
  watch: {
    tmp: {
      handler: function () {
        let CRON_DICT = {
          // 'SECOND': '00',
          'MINUTE': '00',
          'HOUR': '17',
          'DAY_OF_MONTH': '*',
          'MONTH': '*',
          'DAY_OF_WEEK': '*'
          // 'YEAR': '*'
        }
        switch (this.tmp.index) {
          case 0:
            CRON_DICT.DAY_OF_MONTH = ['*', this.tmp.number].join('/')
            break
          case 1:
            CRON_DICT.MONTH = ['*', this.tmp.number].join('/')
            break
          case 2:
            CRON_DICT.YEAR = ['*', this.tmp.number].join('/')
            // CRON_DICT.MONTH = this.tmp.month
            break
        }
        CRON_DICT.DAY_OF_WEEK = this.tmp.workday
        // console.log(CRON_DICT)
        this.$emit('cron-expression', CRON_DICT)
      },
      deep: true
    }
  },
  methods: {
    changeDateType: function (index) {
      this.tmp.index = index
    },
    changeNumber: function (num) {
      this.tmp.number = num
    },
    getDatePicked: function (form) {
      this.tmp.workday = form.workday
      // this.tmp.month = form.month
    }
  }
}
</script>

<style scoped>
  #cron-picker {
    font-family:  "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
