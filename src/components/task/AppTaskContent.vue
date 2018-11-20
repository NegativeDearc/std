<template>
  <div>
    <v-toolbar app>
      <v-toolbar-side-icon v-on:click="back">
        <v-icon>chevron_left</v-icon>
      </v-toolbar-side-icon>
      <span>返回</span>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ TASK.TASK_TITLE || '任务详情' }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat v-if="!TASK.TASK_IS_DONE" v-on:click="updateForm">更新</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content
      app
    >
      <v-card
        flat
        height="100%"
      >
        <v-card-text>
          <v-form ref="newTask" v-on:submit.prevent>
            <v-list three-line subheader dense>
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
                  v-bind:disabled="TASK.TASK_IS_DONE"
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
                  v-bind:disabled="TASK.TASK_IS_DONE"
                >
                </v-text-field>
              </v-list-tile>

              <v-subheader>重复</v-subheader>
              <v-list-tile v-bind:disabled="TASK.TASK_IS_DONE">
                <v-text-field
                  v-bind:disabled="TASK.TASK_IS_DONE"
                  required
                  v-validate="'required'"
                  v-bind:error-messages="errors.collect('loop')"
                  data-vv-name="loop"
                  box
                  label="选择循环周期"
                  readonly
                  clearable
                  prepend-icon="repeat"
                  v-model="parseCron"
                  v-on:click.native="openCronForm"
                ></v-text-field>
                <v-dialog
                  full-width
                  lazy
                  max-width="600px"
                  v-model="cronPicker"
                >
                  <v-card flat>
                    <v-toolbar dark color="green">
                      <v-btn icon flat v-on:click="cronPicker = !cronPicker"><v-icon>close</v-icon></v-btn>
                      <v-toolbar-title>日期选择器</v-toolbar-title>
                    </v-toolbar>
                    <cronPickerIndex v-on:cron-expression="getCronExpression"></cronPickerIndex>
                  </v-card>
                </v-dialog>
              </v-list-tile>

              <v-list-tile v-bind:disabled="TASK.TASK_IS_DONE">
                <v-text-field
                  clearable
                  label="选择时间"
                  box
                  readonly
                  v-model="TASK.TASK_REMIND_AT"
                  prepend-icon="access_time"
                  v-bind:disabled="TASK.TASK_IS_DONE"
                  v-on:click.native="timePicker = true"
                ></v-text-field>
                <v-dialog
                  v-model="timePicker"
                  v-bind:return-value="TASK.TASK_REMIND_AT"
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
                  v-bind:disabled="TASK.TASK_IS_DONE"
                ></v-autocomplete>
              </v-list-tile>
            </v-list>
          </v-form>
          <template v-if="TASK.TASK_IS_DONE">
            <v-subheader>备注</v-subheader>
            <v-list-tile>
              <v-text-field
                v-model="TASK.TASK_REMARK"
                placeholder="填写必要的说明，特别是没有按期完成的时候"
                box
                label="备注"
                prepend-icon="comment"
                clearable
              ></v-text-field>
            </v-list-tile>
          </template>
        </v-card-text>
        <v-snackbar
          v-model="snackbarDialog"
          color="info"
          :timeout="1000"
          top
        >
          更新成功
          <v-btn
            dark
            flat
            @click="snackbarDialog = false"
          >
            Close
          </v-btn>
        </v-snackbar>
        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-content>
  </div>
</template>

<script>
import cronstrue from 'cronstrue'
import cronPickerIndex from '../utils/cronPicker/cronPickerIndex'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  name: 'AppTaskContent',
  components: { cronPickerIndex },
  data () {
    return {
      TASK: {
        TASK_TITLE: null,
        TASK_DESCRIPTION: null,
        TASK_CRON_EXPRESSION: null,
        TASK_CRON_EXPRESSION_DESCRIPTION: null,
        TASK_REMIND_AT: null,
        TASK_TAGS: [],
        TASK_REMARK: null,
        TASK_IS_DONE: null
      },
      cron: null,
      taskDialog: null,
      snackbarDialog: null,
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
    TASK: {
      handler: function () {
        if (!this.TASK.TASK_IS_DONE) {
          let _cron = this.TASK.TASK_CRON_EXPRESSION.split(' ')
          _cron[1] = this.TASK.TASK_REMIND_AT.split(':')[1]
          _cron[2] = this.TASK.TASK_REMIND_AT.split(':')[0]
          this.TASK.TASK_CRON_EXPRESSION = _cron.join(' ')
        }
      },
      deep: true
    }
  },
  computed: {
    getTags: function () {
      return this.$store.state.TASK_TAGS
    },
    parseCron: function () {
      if (this.TASK.TASK_CRON_EXPRESSION) {
        return cronstrue.toString(this.TASK.TASK_CRON_EXPRESSION)
      }
    }
  },
  methods: {
    updateForm: function () {
      this.$validator.validateAll().then(data => {
        if (data) {
          let _form = {
            taskTitle: this.TASK.TASK_TITLE,
            taskDescription: this.TASK.TASK_DESCRIPTION,
            taskRepeatInterval: this.TASK.TASK_CRON_EXPRESSION.substr(3),
            freqDescription: this.TASK.CRON_EXPRESSION_DESCRIPTION,
            taskTags: this.TASK.TASK_TAGS.toString(),
            remindAt: this.TASK.TASK_REMIND_AT,
            remark: this.TASK.TASK_REMARK
          }

          let _id = this.$router.currentRoute.params.taskId
          this.$store.dispatch('UPDATE_ONE_TASK', [_id, _form]).then(() => {
            this.snackbarDialog = true
          })
        }
      })
    },
    back: function () {
      this.$router.back()
    },
    openCronForm: function () {
      this.cronPicker = true
    },
    closeCronForm: function () {
      this.cronPicker = false
    },
    settingCron: function () {
      this.cronPicker = false
    },
    getCronExpression: function (cron) {
      this.cron = cron
      let _ = []
      for (let i in cron) {
        _.push(cron[i])
      }
      this.TASK.TASK_CRON_EXPRESSION = _.join(' ').toString()
      this.TASK.TASK_REMIND_AT = [cron.HOUR, cron.MINUTE].join(':')
    }
  },
  mounted: function () {
    let _task = this.$store.getters.GET_TASK_BY_ID(this.$route.params.taskId)
    this.TASK.TASK_IS_DONE = _task.isDone
    this.TASK.TASK_TITLE = _task.taskTitle
    this.TASK.TASK_DESCRIPTION = _task.taskDescription
    this.TASK.TASK_CRON_EXPRESSION = '00 ' + _task.frequency // 从后端转来需加上秒位
    this.TASK.CRON_EXPRESSION_DESCRIPTION = cronstrue.toString(this.TASK.TASK_CRON_EXPRESSION)
    this.TASK.TASK_TAGS = _task.taskTags ? _task.taskTags.split(',') : []
    this.TASK.TASK_REMIND_AT = _task.remindAt
    this.TASK.TASK_REMARK = _task.remark
  }
}
</script>

<style scoped>

</style>
