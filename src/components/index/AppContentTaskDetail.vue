<template>
  <v-layout row justify-center>
    <v-btn flat icon dark color="red" v-on:click.stop="taskDialog = true">
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog
        v-model="taskDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
    >
        <v-card tile>
          <v-toolbar dark color="green">
            <v-btn icon dark v-on:click.native="taskDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>新的任务</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat v-on:click.native="createNewTask">保存</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-form ref="newTask" v-on:submit.prevent>
              <v-list three-line>
                <v-subheader>任务</v-subheader>
                <v-list-tile>
                  <v-text-field
                    label="任务"
                    prepend-icon="assignment"
                    v-model="TASK.TASK_TITLE"
                    v-validate="'required|min:10'"
                    v-bind:error-messages="errors.collect('title')"
                    data-vv-name="title"
                    box
                    required
                  >
                  </v-text-field>
                </v-list-tile>
                <v-list-tile>
                  <v-text-field
                    label="任务的描述"
                    prepend-icon="subject"
                    v-model="TASK.TASK_DESCRIPTION"
                    required
                    box
                  >
                  </v-text-field>
                </v-list-tile>

                <v-subheader>重复</v-subheader>
                <v-list-tile>
                  <v-text-field
                    required
                    v-validate="'required'"
                    v-bind:error-messages="errors.collect('loop')"
                    data-vv-name="loop"
                    box
                    label="选择重复周期"
                    clearable
                    readonly
                    v-model="TEMP.CRON_DESCRIPTION"
                    prepend-icon="repeat"
                    v-on:click.native="cronPicker = true"
                  ></v-text-field>
                  <v-dialog
                    full-width
                    lazy
                    max-width="600px"
                    v-model="cronPicker"
                  >
                    <v-form ref="dateForm">
                      <v-card>
                        <v-toolbar dark color="green red--after">
                          <v-btn icon v-on:click.native="goBack" v-if="windowDialog !==1">
                            <v-icon>chevron_left</v-icon>
                          </v-btn>
                          <v-btn icon v-on:click.stop="closeCronForm" v-else>
                            <v-icon>close</v-icon>
                          </v-btn>
                          <v-spacer></v-spacer>
                          <v-toolbar-title>选择日期</v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-btn icon v-bind:disabled="windowDialog === 1" flat v-on:click.stop="settingCron"><v-icon>check</v-icon></v-btn>
                        </v-toolbar>
                        <v-window v-model="windowDialog" touchless>
                          <v-window-item v-bind:value="1" lazy>
                            <v-list>
                              <v-subheader>循环任务</v-subheader>
                              <v-list-tile v-on:click.stop="allWorkDay">
                                <v-list-tile-action><v-icon>mdi-calendar-range</v-icon></v-list-tile-action>
                                <v-list-tile-content>
                                  <v-list-tile-title>工作日</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action></v-list-tile-action>
                              </v-list-tile>
                              <v-divider></v-divider>
                              <v-list-tile v-on:click.stop="goWindow(2)">
                                <v-list-tile-action><v-icon>mdi-calendar-week</v-icon></v-list-tile-action>
                                <v-list-tile-content>
                                  <v-list-tile-title>周</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action><v-icon>more_vert</v-icon></v-list-tile-action>
                              </v-list-tile>
                              <v-divider></v-divider>
                              <v-list-tile v-on:click.stop="goWindow(3)">
                                <v-list-tile-action><v-icon>mdi-calendar-text</v-icon></v-list-tile-action>
                                <v-list-tile-content>
                                  <v-list-tile-title>月</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action><v-icon>more_vert</v-icon></v-list-tile-action>
                              </v-list-tile>
                              <v-divider></v-divider>
                              <v-list-tile v-on:click.stop="goWindow(4)">
                                <v-list-tile-action><v-icon>mdi-calendar-multiselect</v-icon></v-list-tile-action>
                                <v-list-tile-content>
                                  <v-list-tile-title>自定义</v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action><v-icon>more_vert</v-icon></v-list-tile-action>
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
                                <v-list-tile-action><v-icon>mdi-numeric-7-box</v-icon></v-list-tile-action>
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
                            <div>每隔 {{ TEMP.WEEK_SELECTOR }} 周的周 {{ CRON_EXPRESSION.DAY_OF_WEEK.toString() }}</div>
                            <div class="pl-5 pr-5 pb-4">
                              <v-slider
                                step="1"
                                min="0"
                                max="8"
                                v-model="TEMP.WEEK_SELECTOR"
                                ticks="always"
                                thumb-color="red"
                                thumb-label="always"
                                v-on:change="weekLoopChange"
                              ></v-slider>
                            </div>
                            <div style="display: inline-block" >
                              <v-checkbox
                                v-for="i in $store.state.WORKDAY_INDEX.filter(item => item.itemValue !== '1-5')"
                                v-bind:key="i.itemValue"
                                v-bind:label="i.itemText"
                                v-bind:value="i.itemValue"
                                off-icon="close"
                                on-icon="check"
                                v-model="CRON_EXPRESSION.DAY_OF_WEEK"
                                color="red"></v-checkbox>
                            </div>
                            <v-footer></v-footer>
                          </v-window-item>
                          <v-window-item v-bind:value="3" lazy>
                            <v-subheader>选择周期</v-subheader>
                            <div>每隔 {{ TEMP.MONTH_SELECTOR }} 月第 {{ TEMP.WEEK_INDEX_SELECTOR }} 周的第 {{ TEMP.DAY_OF_WEEK_SELECTOR }} 天</div>
                            <div class="pl-5 pr-5">
                              <v-slider
                                hint="滑动选择月份"
                                step="1"
                                min="0"
                                max="12"
                                v-model="TEMP.MONTH_SELECTOR"
                                ticks="always"
                                thumb-color="red"
                                thumb-label="always"
                                v-on:change="monthLoopChange"
                              ></v-slider>
                              <v-container grid-list-md>
                                <v-layout wrap>
                                  <v-flex xs12 md12>
                                    <v-select
                                      prepend-icon="view_week"
                                      outline
                                      v-model="TEMP.WEEK_INDEX_SELECTOR"
                                      v-bind:items="$store.state.WEEK_INDEX"
                                      item-text="itemText"
                                      item-value="itemValue"
                                      label="第几周"
                                    ></v-select>
                                  </v-flex>
                                  <v-flex xs12 md12>
                                    <v-select
                                      menu-props="top"
                                      prepend-icon="view_day"
                                      outline
                                      v-model="TEMP.DAY_OF_WEEK_SELECTOR"
                                      v-bind:items="$store.state.WORKDAY_INDEX"
                                      item-avatar="itemIcon"
                                      item-text="itemText"
                                      item-value="itemValue"
                                      label="第几日"
                                      v-on:change="workDayLoopChange"
                                    >
                                      <template slot="item" slot-scope="data">
                                        <v-list-tile-avatar>
                                          <v-icon size="25">{{ data.item.itemIcon }}</v-icon>
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                          <v-list-tile-title v-html="data.item.itemText"></v-list-tile-title>
                                        </v-list-tile-content>
                                      </template>
                                    </v-select>
                                  </v-flex>
                                </v-layout>
                              </v-container>
                            </div>
                            <v-footer></v-footer>
                          </v-window-item>
                          <v-window-item v-bind:value="4" lazy>
                            <v-subheader>输入CRON表达式</v-subheader>
                            <v-container grid-list-md>
                              <v-layout wrap>
                                <v-flex xs2 md2 offset-md1 offset-xs1><v-text-field label="分" outline class="d-flex align-center" height="60" v-model="CRON_EXPRESSION.MINUTE"></v-text-field></v-flex>
                                <v-flex xs2 md2><v-text-field label="时" outline class="d-flex align-center" height="60" v-model="CRON_EXPRESSION.HOUR"></v-text-field></v-flex>
                                <v-flex xs2 md2><v-text-field label="天" outline class="d-flex align-center" height="60" v-model="CRON_EXPRESSION.DAY_OF_MONTH"></v-text-field></v-flex>
                                <v-flex xs2 md2><v-text-field label="月" outline class="d-flex align-center" height="60" v-model="CRON_EXPRESSION.MONTH"></v-text-field></v-flex>
                                <v-flex xs2 md2><v-text-field label="周" outline class="d-flex align-center" height="60" v-model="CRON_EXPRESSION.DAY_OF_WEEK"></v-text-field></v-flex>
                              </v-layout>
                              <span class="red--text">CRON是描述定时任务的表达式，用法请参考<a href="https://en.wikipedia.org/wiki/Cron" target="_blank">WiKi的简要介绍</a></span>
                            </v-container>
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
                    box
                    readonly
                    v-model="TASK.TASK_REMIND_AT"
                    prepend-icon="access_time"
                    v-on:click.native="timePicker = true"
                  ></v-text-field>
                  <v-dialog
                    v-model="timePicker"
                    :return-value="TASK.TASK_REMIND_AT"
                    full-width
                    lazy
                    width="290px"
                  >
                    <v-time-picker
                      v-model="TASK.TASK_REMIND_AT"
                      color="green"
                      format="24hr"
                    ></v-time-picker>
                  </v-dialog>
                </v-list-tile>
                <v-subheader>标签</v-subheader>
                <v-list-tile>
                  <v-autocomplete
                    prepend-icon="bookmark"
                    box
                    v-bind:items="getTags"
                    chips
                    clearable
                    hide-details
                    hide-no-data
                    hide-selected
                    multiple
                    single-line
                    v-model="TASK.TASK_TAGS"
                  ></v-autocomplete>
                </v-list-tile>
              </v-list>
            </v-form>
          </v-card-text>
          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
  </v-layout>
</template>

<script>
import cronstrue from 'cronstrue'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  name: 'AppContentTaskDetail',
  data () {
    return {
      CRON_EXPRESSION: {
        MINUTE: '59',
        HOUR: '23',
        DAY_OF_MONTH: '',
        MONTH: '',
        DAY_OF_WEEK: []
      },
      TASK: {
        TASK_TITLE: null,
        TASK_DESCRIPTION: null,
        TASK_CRON_EXPRESSION: null,
        TASK_CRON_EXPRESSION_DESCRIPTION: null,
        TASK_REMIND_AT: null,
        TASK_TAGS: []
      },
      TEMP: {
        MONTH_SELECTOR: 0,
        WEEK_SELECTOR: '',
        WEEK_INDEX_SELECTOR: '',
        DAY_OF_WEEK_SELECTOR: '',
        CRON_DESCRIPTION: '',
        CRON_EXPRESSION: ''
      },
      taskDialog: null,
      windowDialog: null,
      cronPicker: null,
      timePicker: null,
      dictionary: {
        custom: {
          title: {
            required: () => '不可为空',
            min: '至少10个字符'
          },
          loop: {
            required: () => '不可为空'
          }
        }
      }
    }
  },
  watch: {
    CRON_EXPRESSION: {
      handler: function () {
        let _cronExpression = this.generateCron
        this.TEMP.CRON_EXPRESSION = this.generateCron
        this.TEMP.CRON_DESCRIPTION = cronstrue.toString(_cronExpression)
      },
      deep: true
    }
  },
  computed: {
    getTags: function () {
      return this.$store.state.TASK_TAGS
    },
    generateCron: function () {
      let _sequence = ['MINUTE', 'HOUR', 'DAY_OF_MONTH', 'MONTH', 'DAY_OF_WEEK']
      let _cronValue = []
      for (let _seq of _sequence) {
        if (this.CRON_EXPRESSION[_seq].toString() === '') {
          _cronValue.push('*')
        } else { _cronValue.push(this.CRON_EXPRESSION[_seq].toString()) }
      }
      return _cronValue.join(' ')
    }
  },
  methods: {
    weekLoopChange: function () {
      if (this.TEMP.WEEK_SELECTOR > 0) {
        this.CRON_EXPRESSION.DAY_OF_MONTH = [ '*', parseInt(this.TEMP.WEEK_SELECTOR * 7) ].join('/')
      }
    },
    monthLoopChange: function () {
      if (this.TEMP.MONTH_SELECTOR > 0) {
        this.CRON_EXPRESSION.MONTH = ['*', parseInt(this.TEMP.MONTH_SELECTOR)].join('/')
      }
    },
    workDayLoopChange: function () {
      this.CRON_EXPRESSION.DAY_OF_WEEK = [ this.TEMP.DAY_OF_WEEK_SELECTOR + this.TEMP.WEEK_INDEX_SELECTOR ]
    },
    createNewTask () {
      let _formData = {
        taskTitle: this.TASK.TASK_TITLE,
        taskDescription: this.TASK.TASK_DESCRIPTION,
        taskTags: this.TASK.TASK_TAGS ? this.TASK.TASK_TAGS.toString() : null,
        taskRepeatInterval: this.TEMP.CRON_EXPRESSION,
        taskFrequencyDescription: cronstrue.toString(this.generateCron),
        taskRemindAt: this.TASK.TASK_REMIND_AT,
        createBy: this.$store.getters.GET_USER_ID
      }
      this.$validator.validateAll().then(data => {
        if (data) {
          this.taskDialog = false // todo: speed up close process
          this.$store.dispatch('CREATE_NEW_TASK', _formData)
          this.$store.commit('CLEAR_CRON_DESCRIPTION')
          Object.assign(this.$data, this.$options.data())
          this.$refs.newTask.reset()
        }
      }).then(() => {
      })
    },
    goBack: function () {
      this.windowDialog = 1
      Object.assign(this.$data.CRON_EXPRESSION, this.$options.data().CRON_EXPRESSION)
      Object.assign(this.$data.TEMP, this.$options.data().TEMP)
    },
    goWindow: function (n) {
      this.windowDialog = n
    },
    allWorkDay: function () {
      this.CRON_EXPRESSION.DAY_OF_MONTH = '*'
      this.CRON_EXPRESSION.MONTH = '*'
      this.CRON_EXPRESSION.DAY_OF_WEEK = ['1', '2', '3', '4', '5']
      this.cronPicker = false
    },
    closeCronForm: function () {
      this.cronPicker = false
    },
    settingCron: function () {
      this.cronPicker = false
    }
  }
}
</script>

<style scoped>
</style>
