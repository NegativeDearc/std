<template>
  <v-content
    app
  >
    <v-card
      flat
    >
      <v-card-text>
        <v-form>
          <v-list two-line>
            <v-subheader>任务描述</v-subheader>
            <v-list-tile>
              <v-text-field
                outline
                label="任务"
                prepend-icon="assignment"
                v-model="taskName"
                :disabled="taskIsDone"
                v-on:input="onChangeUpdate('taskTitle', $event)"
              >
              </v-text-field>
            </v-list-tile>

            <v-list-tile>
              <v-text-field
                outline
                label="任务的描述"
                prepend-icon="subject"
                v-model="taskDescription"
                :disabled="taskIsDone"
                v-on:input="onChangeUpdate('taskDescription', $event)"
              >
              </v-text-field>
            </v-list-tile>
            <v-subheader>重复</v-subheader>
            <v-list-tile style="border: 2px solid grey; border-radius: 4px;margin-left: 50px;margin-right: 15px">
              <v-checkbox color="red" label="周一" value="1" off-icon="close" on-icon="check" v-model="week" v-on:change="onChangeUpdate('week', $event)" :disabled="taskIsDone"></v-checkbox>
              <v-checkbox color="red" label="周二" value="2" off-icon="close" on-icon="check" v-model="week" v-on:change="onChangeUpdate('week', $event)" :disabled="taskIsDone" ></v-checkbox>
              <v-checkbox color="red" label="周三" value="3" off-icon="close" on-icon="check" v-model="week" v-on:change="onChangeUpdate('week', $event)" :disabled="taskIsDone"></v-checkbox>
              <v-checkbox color="red" label="周四" value="4" off-icon="close" on-icon="check" v-model="week" v-on:change="onChangeUpdate('week', $event)" :disabled="taskIsDone"></v-checkbox>
              <v-checkbox color="red" label="周五" value="5" off-icon="close" on-icon="check" v-model="week" v-on:change="onChangeUpdate('week', $event)" :disabled="taskIsDone"></v-checkbox>
            </v-list-tile>

            <v-layout>
              <v-flex sm6 md6 xs6>
                <v-subheader>完成时间</v-subheader>
                <v-list-tile>
                  <v-layout>
                    <v-menu
                      ref="menu"
                      :close-on-content-click="false"
                      v-model="menu2"
                      :return-value.sync="taskTimeSlot"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      :disabled="taskIsDone"
                    >
                      <v-text-field
                        outline
                        slot="activator"
                        v-model="taskTimeSlot"
                        prepend-icon="access_time"
                        readonly
                      ></v-text-field>
                      <v-time-picker
                        v-if="menu2"
                        v-model="taskTimeSlot"
                        color="green lighten-1"
                        format="24hr"
                        min="8:30"
                        max="20:00"
                        :allowed-minutes="allowedStep"
                        @change="$refs.menu.save(taskTimeSlot)"
                        v-on:input="onChangeUpdate('remindAt', $event)"
                      ></v-time-picker>
                    </v-menu>
                  </v-layout>
                </v-list-tile>
              </v-flex>
              <v-flex sm6 md6 xs6>
                <v-subheader>任务标签</v-subheader>
                <v-list-tile>
                  <v-icon>bookmarks</v-icon>
                  <v-autocomplete
                    outline
                    :items="tags"
                    chips
                    clearable
                    hide-details
                    full-width
                    hide-no-data
                    hide-selected
                    multiple
                    single-line
                    v-model="taskTags"
                    :disabled="taskIsDone"
                    v-on:input="onChangeUpdate('taskTags', $event)"
                  ></v-autocomplete>
                </v-list-tile>
              </v-flex>
            </v-layout>

            <template v-if="taskIsDone">
              <v-subheader>备注</v-subheader>
              <v-list-tile>
                <v-text-field
                  v-model="remark"
                  placeholder="填写必要的说明，特别是没有按期完成的时候"
                  v-on:input="onChangeUpdate('remark', $event)"
                  outline
                  label="备注"
                  prepend-icon="comment"
                  clearable
                ></v-text-field>
              </v-list-tile>
            </template>
          </v-list>
        </v-form>
      </v-card-text>

      <v-snackbar
        v-model="snackbar"
        color="info"
        multi-line
        :timeout="1000"
      >
        更新成功
        <v-btn
          dark
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-card>
  </v-content>
</template>

<script>
export default {
  name: 'AppTaskContent',

  data () {
    return {
      taskName: null,
      taskDescription: null,
      taskTags: null,
      taskRepeatInterval: null,
      taskTimeSlot: null,
      date: null,
      taskIsDone: null,
      tags: this.$store.state.TASK_TAGS,
      menu2: false,
      snackbar: null,
      remark: null,
      week: null
    }
  },
  methods: {
    allowedStep: (m) => m % 10 === 0,
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    onChangeUpdate: function (key, event) {
      let _id = this.$router.currentRoute.params.taskId
      let _updateValue
      switch (key) {
        case 'taskTitle':
          _updateValue = { taskTitle: event }
          break
        case 'taskDescription':
          _updateValue = { taskDescription: event }
          break
        case 'remindAt':
          _updateValue = { remindAt: event }
          break
        case 'taskTags':
          _updateValue = { taskTags: event ? event.toString() : null }
          break
        case 'week':
          _updateValue = { frequency: event }
          break
        case 'remark':
          _updateValue = { remark: event }
      }
      console.log('=> CHANGING', key, 'TO', _updateValue)
      this.$store.dispatch('UPDATE_ONE_TASK', [_id, _updateValue])
      this.snackbar = true
    }
  },
  mounted: function () {
    this.axios.get('/task/' + this.$router.currentRoute.params.taskId)
      .then(data => {
        let _data = data.data
        this.taskIsDone = _data.isDone
        this.taskName = _data.taskTitle
        this.week = _data.frequency ? _data.frequency.split(',') : []
        this.taskDescription = _data.taskDescription
        this.taskTags = _data.taskTags ? _data.taskTags.split(',') : null
        this.taskRepeatInterval = _data.frequency
        this.taskTimeSlot = _data.remindAt
        this.remark = _data.remark
      })
  }
}
</script>

<style scoped>

</style>
