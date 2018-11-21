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
            <v-toolbar-title>{{ $t('new_task') }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat v-on:click.native="createNewTask">{{ $t('save') }}</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-form ref="newTask" v-on:submit.prevent>
              <v-list three-line>
                <v-subheader>{{ $t('task') }}</v-subheader>
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

                <v-subheader>{{ $t('loop') }}</v-subheader>
                <v-list-tile>
                  <v-text-field
                    required
                    v-validate="'required'"
                    v-bind:error-messages="errors.collect('loop')"
                    data-vv-name="loop"
                    box
                    label="选择循环周期"
                    clearable
                    readonly
                    v-model="parseCron"
                    prepend-icon="repeat"
                    v-on:click.native="cronPicker = true"
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
                        <v-toolbar-title>{{ $t('choose_date') }}</v-toolbar-title>
                      </v-toolbar>
                      <cronPickerIndex v-on:cron-expression="getCronExpression"></cronPickerIndex>
                    </v-card>
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
                    lazy
                    width="470px"
                    full-width
                  >
                    <v-time-picker
                      v-model="TASK.TASK_REMIND_AT"
                      color="green"
                      scrollable
                      full-width
                      landscape
                    ></v-time-picker>
                  </v-dialog>
                </v-list-tile>
                <v-subheader>{{ $t('tags') }}</v-subheader>
                <v-list-tile>
                  <v-autocomplete
                    prepend-icon="bookmark"
                    box
                    v-bind:items="$store.state.TASK_TAGS"
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
import cronPickerIndex from '../utils/cronPicker/cronPickerIndex'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  components: { cronPickerIndex },
  name: 'AppContentTaskDetail',
  data () {
    return {
      TASK: {
        TASK_TITLE: null,
        TASK_DESCRIPTION: null,
        TASK_CRON_EXPRESSION: null,
        TASK_CRON_EXPRESSION_DESCRIPTION: null,
        TASK_REMIND_AT: null,
        TASK_TAGS: []
      },
      cron: null,
      cronExpression: null,
      taskDialog: null,
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
  computed: {
    parseCron: function () {
      if (this.cron) {
        return cronstrue.toString(this.cronExpression)
      }
    }
  },
  watch: {
    TASK: {
      handler: function () {
        if (this.TASK.TASK_REMIND_AT) {
          let _cron = this.cronExpression.split(' ')
          _cron[1] = this.TASK.TASK_REMIND_AT.split(':')[1]
          _cron[2] = this.TASK.TASK_REMIND_AT.split(':')[0]
          this.cronExpression = _cron.join(' ')
          // console.log(_cron)
        }
      },
      deep: true
    }
  },
  methods: {
    createNewTask () {
      this.$validator.validateAll().then(data => {
        if (data) {
          let _formData = {
            taskTitle: this.TASK.TASK_TITLE,
            taskDescription: this.TASK.TASK_DESCRIPTION,
            taskTags: this.TASK.TASK_TAGS ? this.TASK.TASK_TAGS.toString() : null,
            taskRemindAt: this.TASK.TASK_REMIND_AT,
            taskRepeatInterval: this.cronExpression.substr(3) || null, // 需要移除秒位置以供后端解析
            createBy: this.$store.getters.GET_USER_ID
          }

          this.taskDialog = false
          this.$store.dispatch('CREATE_NEW_TASK', _formData)
          this.$store.commit('CLEAR_CRON_DESCRIPTION')
          this.$refs.newTask.reset()
        }
      }).then(() => {
      })
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
      this.cronExpression = _.join(' ').toString()
      this.TASK.TASK_REMIND_AT = [cron.HOUR, cron.MINUTE].join(':')
      console.log(cron)
      console.log(cronstrue.toString(this.cronExpression))
    }
  }
}
</script>

<style scoped>
</style>
