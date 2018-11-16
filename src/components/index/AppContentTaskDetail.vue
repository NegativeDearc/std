<template>
  <v-layout row justify-center>
    <v-btn
      icon
      dark
      v-on:click.stop="task = true"
    >
      <v-icon color="red">add</v-icon>
    </v-btn>
    <v-dialog
        v-model="task"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
    >
        <v-card tile>
          <v-toolbar dark color="green">
            <v-btn icon dark v-on:click.native="task = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>新的任务</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat v-on:click.native="submitForm">保存</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <form ref="newTask" v-on:submit.prevent>
              <v-list two-line>
                <v-subheader>任务<span class="red--text">(＊必需)</span></v-subheader>
                <v-list-tile>
                  <v-text-field
                    label="任务"
                    prepend-icon="assignment"
                    v-model="taskName"
                    v-validate="'required|min:10'"
                    v-bind:error-messages="errors.collect('title')"
                    data-vv-name="title"
                    outline
                    required
                  >
                  </v-text-field>
                </v-list-tile>
                <v-list-tile>
                  <v-text-field
                    label="任务的描述"
                    prepend-icon="subject"
                    v-model="taskDescription"
                    required
                    outline
                  >
                  </v-text-field>
                </v-list-tile>

                <v-subheader>重复</v-subheader>
                <v-list-tile>
                  <v-text-field
                    outline
                    label="选择重复周期"
                    clearable
                    readonly
                    v-model="$store.state.CRON_DESCRIPTION"
                    prepend-icon="repeat"
                    v-on:click.native="datePicker = true"
                  ></v-text-field>
                  <v-dialog
                    full-width
                    lazy
                    persistent
                    max-width="500px"
                    v-model="datePicker"
                    v-bind:return-value="getCronDescription"
                  >
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
                          <v-toolbar-items v-if="window !==1">
                            <v-btn dark flat v-on:click.stop="submitDate">设置</v-btn>
                          </v-toolbar-items>
                        </v-toolbar>
                        <v-window v-model="window" touchless>
                          <v-window-item v-bind:value="1" lazy>
                            <v-list>
                              <v-subheader>循环任务</v-subheader>
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
                                <v-list-tile-content v-on:click.stop="goWindow(4)">
                                  <v-list-tile-title>自定义</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action></v-list-tile-action>
                              </v-list-tile>
                              <v-subheader>一次任务</v-subheader>
                              <v-list-tile>
                                <v-list-tile-action><v-icon>mdi-numeric-1-box</v-icon></v-list-tile-action>
                                <v-list-tile-content>
                                  <v-list-tile-title>明天这个时候</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action></v-list-tile-action>
                              </v-list-tile>
                              <v-divider></v-divider>
                              <v-list-tile>
                                <v-list-tile-action><v-icon>mdi-numeric-1-box</v-icon></v-list-tile-action>
                                <v-list-tile-content>
                                  <v-list-tile-title>下周这个时候</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action></v-list-tile-action>
                              </v-list-tile>
                            </v-list>
                            <v-footer></v-footer>
                          </v-window-item>
                          <v-window-item v-bind:value="2" lazy>
                            <v-subheader>选择周期</v-subheader>
                            <div v-if="loop.week > 0 && loop.workday.length > 0">每隔{{ loop.week }}月的周{{ loop.workday.toString() }}</div>
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
                            <v-footer></v-footer>
                          </v-window-item>
                          <v-window-item v-bind:value="3" lazy>
                            <v-subheader>选择周期</v-subheader>
                            <div>每隔 {{ loop.month }} 月</div>
                            <div class="pl-5 pr-5">
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
                            <v-tabs v-if="loop.month"
                              centered
                            >
                              <v-tab v-bind:href="`#tab-1`">选星期</v-tab>
                              <v-tab v-bind:href="`#tab-2`">选日期</v-tab>
                              <v-tabs-items>
                                <v-tab-item v-bind:value="`tab-1`">
                                  <div style="display: inline-block">
                                    第
                                    <v-select
                                      dense
                                      outline
                                      chips
                                      v-bind:items="[1,2,3,4]"
                                    >
                                    </v-select>
                                  </div>
                                </v-tab-item>
                                <v-tab-item v-bind:value="`tab-2`">bbb</v-tab-item>
                              </v-tabs-items>
                            </v-tabs>
                            <v-footer></v-footer>
                          </v-window-item>
                        </v-window>
                      </v-card>
                    </v-form>
                  </v-dialog>
                </v-list-tile>

                <v-list-tile>
                  <v-text-field
                    clearable
                    label="选择时间"
                    outline
                    readonly
                    v-model="taskTimeSlot"
                    prepend-icon="access_time"
                    v-on:click.native="menu2 = true"
                  ></v-text-field>
                  <v-dialog
                    v-model="menu2"
                    :return-value="taskTimeSlot"
                    full-width
                    lazy
                    width="290px"
                  >
                    <v-time-picker
                      v-model="taskTimeSlot"
                      color="green"
                      format="24hr"
                    ></v-time-picker>
                  </v-dialog>
                </v-list-tile>
                <v-subheader>任务标签</v-subheader>
                <v-list-tile>
                  <v-autocomplete
                    prepend-icon="bookmark"
                    outline
                    v-bind:items="getTags"
                    chips
                    clearable
                    hide-details
                    hide-no-data
                    hide-selected
                    multiple
                    single-line
                    v-model="taskTags"
                  ></v-autocomplete>
                </v-list-tile>
              </v-list>
            </form>
          </v-card-text>
          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
  </v-layout>
</template>

<script>
// import cronstrue from 'cronstrue'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  name: 'AppContentTaskDetail',
  data () {
    return {
      week: [],
      taskName: null,
      taskDescription: null,
      taskTags: null,
      taskRepeatInterval: null,
      taskTimeSlot: null,
      date: null,
      task: false,
      menu2: false,

      window: null,
      datePicker: null,
      loop: {
        workday: [],
        week: null,
        month: null
      },
      cronExpression: '',

      dictionary: {
        custom: {
          title: {
            required: () => 'Name can not be empty',
            min: 'The name field may not be greater than 10 characters'
            // custom messages
          }
        }
      }
    }
  },
  computed: {
    getTags: function () {
      return this.$store.state.TASK_TAGS
    },
    getCronDescription: function () {
      if (this.cronExpression) {
        // console.log(cronstrue.toString(this.cronExpression, { locale: 'zh_CN' }))
        this.$store.dispatch('GET_CRON_EXPRESSION_DESCRIPTION', new URLSearchParams({expression: this.cronExpression}))
        return this.$store.CRON_DESCRIPTION
      }
    }
  },
  methods: {
    submitForm () {
      let _formData = new URLSearchParams(
        {
          taskName: this.taskName ? this.taskName : null,
          taskDescription: this.taskDescription,
          taskTags: this.taskTags ? this.taskTags.toString() : null,
          taskRepeatInterval: this.cronExpression,
          taskTimeSlot: this.taskTimeSlot,
          createBy: this.$store.getters.GET_USER_ID
        }
      )
      this.$validator.validateAll().then(data => {
        if (data) {
          this.$store.dispatch('CREATE_NEW_TASK', _formData)
          this.task = false
        }
      })
    },
    generateCron: function () {
      const _cronTime = '0 0'
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
      Object.assign(this.$data.loop, this.$options.data().loop)
      this.datePicker = false
      this.cronExpression = '0 0 * * 1-5' // or '0 0 17 * * 1-5'
      console.log(this.cronExpression)
    },
    closeForm: function () {
      this.datePicker = false
      Object.assign(this.$data.loop, this.$options.data().loop)
    },
    submitDate: function () {
      // console.log(this.loop.week, this.loop.workday)
      this.generateCron()
      this.datePicker = false
      Object.assign(this.$data.loop, this.$options.data().loop)
    }
  }
}
</script>

<style scoped>
</style>
