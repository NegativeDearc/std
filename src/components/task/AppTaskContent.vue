<template>
  <v-content app>
    <v-card flat>
      <v-card-text>
        <v-form>
          <v-list two-line>
            <v-subheader>任务描述</v-subheader>
            <v-list-tile>
              <v-text-field
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
                label="任务的描述"
                prepend-icon="subject"
                v-model="taskDescription"
                :disabled="taskIsDone"
                v-on:input="onChangeUpdate('taskDescription', $event)"
              >
              </v-text-field>
            </v-list-tile>
            <v-subheader>重复</v-subheader>
            <v-list-tile>
              <v-select
                v-bind:items="loopOptions"
                item-text="itemText"
                item-value="itemId"
                persistent-hint
                prepend-icon="repeat"
                return-object
                v-model="taskRepeatInterval"
                :disabled="taskIsDone"
                v-on:input="onChangeUpdate('frequency', $event)"
              >
                <template
                  slot="item"
                  slot-scope="data"
                >
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item.itemText"></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-avatar>
                      <v-icon v-text="data.item.itemAvatar"></v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="data.item.itemText"></v-list-tile-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-select>
            </v-list-tile>

            <v-layout>
              <v-flex sm6 md6 xs6>
                <v-subheader>提醒我</v-subheader>
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
                        max="21:00"
                        :allowed-minutes="allowedStep"
                        @change="$refs.menu.save(taskTimeSlot)"
                        v-on:input="onChangeUpdate('remindAt', $event)"
                      ></v-time-picker>
                    </v-menu>
                  </v-layout>
                </v-list-tile>
              </v-flex>
              <v-flex sm6 md6 xs6>
                <v-subheader>截止日期</v-subheader>
                <v-list-tile>
                  <v-menu
                    ref="menu1"
                    :close-on-content-click="false"
                    v-model="menu1"
                    lazy
                    transition="scale-transition"
                    offset-y
                    :disabled="taskIsDone"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="taskDueDate"
                      prepend-icon="event"
                      header-color="green lighten-1"
                    ></v-text-field>
                    <v-date-picker
                      v-model="date"
                      locale="zh-cn"
                      @input="menu1 = false"
                      v-on:input="onChangeUpdate('dueDate', $event)"
                    ></v-date-picker>
                  </v-menu>
                </v-list-tile>
              </v-flex>
            </v-layout>
            <v-subheader>任务标签</v-subheader>
            <v-list-tile>
              <v-icon>bookmarks</v-icon>
              <v-autocomplete
                :items="tags"
                chips
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
      loopOptions: [
        {itemId: 0, itemText: '不重复', itemAvatar: 'block'},
        {itemId: 1, itemText: '每天', itemAvatar: 'access_alarms'},
        {itemId: 2, itemText: '每个工作日', itemAvatar: 'notifications_active'},
        {itemId: 3, itemText: '每周', itemAvatar: 'notifications'}
      ],
      taskName: null,
      taskDescription: null,
      taskTags: null,
      taskRepeatInterval: null,
      taskTimeSlot: null,
      taskDueDate: null,
      date: null,
      taskIsDone: null,

      tags: ['Quality', 'Cost', 'Safety', 'People'],
      task: false,
      menu1: false,
      menu2: false,
      snackbar: null
    }
  },
  watch: {
    date () {
      this.taskDueDate = this.formatDate(this.date)
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
        case 'frequency':
          _updateValue = { frequency: event.itemId }
          break
        case 'remindAt':
          _updateValue = { remindAt: event }
          break
        case 'dueDate':
          _updateValue = { dueDate: event }
          break
        case 'taskTags':
          _updateValue = { taskTags: event ? event.toString() : null }
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
        this.taskDescription = _data.taskDescription
        this.taskTags = _data.taskTags ? _data.taskTags.split(',') : null
        this.taskRepeatInterval = _data.frequency
        this.taskTimeSlot = _data.remindAt
        this.taskDueDate = this.$moment(_data.dueDate).format('DD/MM/YYYY')
      })
  }
}
</script>

<style scoped>

</style>
