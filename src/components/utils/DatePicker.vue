<template>
  <v-layout>
    <v-dialog
      full-width
      transition="dialog-bottom-transition"
      v-model="datePicker"
    >
      <v-text-field
        slot="activator"
        outline
        label="选择重复周期"
        prepend-icon="repeat"
      ></v-text-field>
      <v-form ref="dateForm">
        <v-card>
          <v-toolbar dark color="green red--after">
            <v-btn icon v-on:click.native="goBack" v-if="window !==1">
              <v-icon>chevron_left</v-icon>
            </v-btn>
            <v-btn icon v-on:click.stop="closeForm" v-else>
              <v-icon>close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title>选择日期</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat v-on:click.stop="submitDate" v-if="window !==1">设置</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-window v-model="window">
            <v-window-item v-bind:value="1">
              <v-list>
                <v-list-tile v-on:click.stop="allWorkDay">
                  <v-list-tile-action><v-icon>mdi-numeric-1-box</v-icon></v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>工作日</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action></v-list-tile-action>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile v-on:click.stop="goWindow(2)">
                  <v-list-tile-action><v-icon>mdi-numeric-7-box</v-icon></v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>周</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action></v-list-tile-action>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile v-on:click.stop="goWindow(3)">
                  <v-list-tile-action><v-icon>mdi-numeric-7-box</v-icon></v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>月</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action></v-list-tile-action>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile>
                  <v-list-tile-action><v-icon>mdi-numeric-7-box</v-icon></v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>自定义</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action></v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-window-item>
            <v-window-item v-bind:value="2">
              <v-subheader>选择周期</v-subheader>
              <div>每隔{{ loop.week }}周的{{ loop.workday }}</div>
              <div class="pl-5 pr-5 pb-4">
                <v-slider
                  step="1"
                  min="0"
                  max="8"
                  v-model="loop.week"
                  ticks="always"
                  thumb-color="red"
                  thumb-label="always"
                ></v-slider>
              </div>
              <div style="display: inline-block">
                <v-checkbox label="周一" value="1" off-icon="close" on-icon="check" v-model="loop.workday" color="red"></v-checkbox>
                <v-checkbox label="周二" value="2" off-icon="close" on-icon="check" v-model="loop.workday" color="red"></v-checkbox>
                <v-checkbox label="周三" value="3" off-icon="close" on-icon="check" v-model="loop.workday" color="red"></v-checkbox>
                <v-checkbox label="周四" value="4" off-icon="close" on-icon="check" v-model="loop.workday" color="red"></v-checkbox>
                <v-checkbox label="周五" value="5" off-icon="close" on-icon="check" v-model="loop.workday" color="red"></v-checkbox>
              </div>
            </v-window-item>
            <v-window-item v-bind:value="3">
              <v-subheader>选择周期</v-subheader>
              <div>每隔 {{ loop.month }} 月</div>
              <div class="pl-5 pr-5 pb-4">
                <v-slider
                  step="1"
                  min="0"
                  max="12"
                  v-model="loop.month"
                  ticks="always"
                  thumb-color="red"
                  thumb-label="always"
                ></v-slider>
              </div>
            </v-window-item>
          </v-window>
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'DatePicker',
  data () {
    return {
      window: null,
      datePicker: null,
      loop: {
        workday: [],
        week: null,
        month: null
      },
      cronExpression: ''
    }
  },
  watch: {
    loop: {
      handler: function () {
        const _cronTime = '0 0 0'
        let _cronDayOfMonth
        let _cronMonth
        let _workday
        if (this.loop.month) {
          _cronMonth = ['*', this.loop.month].join('/')
        } else {
          _cronMonth = '*'
        }
        if (this.loop.week) {
          _cronDayOfMonth = ['*', this.loop.week * 7].join('/')
        } else {
          _cronDayOfMonth = '*'
        }
        if (this.loop.workday.length > 0) {
          _workday = this.loop.workday.toString()
        } else {
          _workday = '*'
        }
        let _cronExpression = [_cronTime, _cronDayOfMonth, _cronMonth, _workday]
        // console.log(_cronExpression.join(' '))
      },
      deep: true
    }
  },
  methods: {
    generateCron: function () {
      const _cronTime = '0 0 0'
      let _cronDayOfMonth
      let _cronMonth
      let _workday
      if (this.loop.month) {
        _cronMonth = ['*', this.loop.month].join('/')
      } else {
        _cronMonth = '*'
      }
      if (this.loop.week) {
        _cronDayOfMonth = ['*', this.loop.week * 7].join('/')
      } else {
        _cronDayOfMonth = '*'
      }
      if (this.loop.workday.length > 0) {
        _workday = this.loop.workday.toString()
      } else {
        _workday = '*'
      }
      let _cronExpression = [_cronTime, _cronDayOfMonth, _cronMonth, _workday]
      this.cronExpression = _cronExpression.join(' ')
      console.log(this.cronExpression)
    },
    goBack: function () {
      this.window = 1
      this.$refs.dateForm.reset()
    },
    goWindow: function (n) {
      this.window = n
    },
    allWorkDay: function () {
      this.loop.workday = [1, 2, 3, 4, 5]
      // console.log(this.loop.workday)
      Object.assign(this.$data, this.$options.data())
      this.datePicker = false
      this.cronExpression = '0 0 0 * * 1-5' // or '0 0 17 * * 1-5'
      // console.log(this.cronExpression)
    },
    closeForm: function () {
      this.datePicker = false
      Object.assign(this.$data, this.$options.data())
    },
    submitDate: function () {
      // console.log(this.loop.week, this.loop.workday)
      this.generateCron()
      this.datePicker = false
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>

<style scoped>

</style>
