<template>
  <v-layout row justify-center>
    <v-btn
      large
      block
      dark
      color="green"
      v-on:click.stop="task = true"
    >
      <v-icon>add</v-icon>
      新的任务
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
            <v-form ref="newTask">
              <v-list two-line>
                <v-subheader>任务描述</v-subheader>
                <v-list-tile>
                  <v-text-field
                    label="任务"
                    prepend-icon="assignment"
                    v-model="taskName"
                  >
                  </v-text-field>
                </v-list-tile>

                <v-list-tile>
                  <v-text-field
                    label="任务的描述"
                    prepend-icon="subject"
                    v-model="taskDescription"
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
                      >
                        <v-text-field
                          slot="activator"
                          v-model="taskDueDate"
                          hint="MM/DD/YYYY format"
                          persistent-hint
                          prepend-icon="event"
                          header-color="green lighten-1"
                        ></v-text-field>
                        <v-date-picker v-model="date" locale="zh-cn" @input="menu1 = false"></v-date-picker>
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
                    clearable
                    hide-details
                    full-width
                    hide-no-data
                    hide-selected
                    multiple
                    single-line
                    v-model="taskTags"
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
// todo some validate for the form
export default {
  name: 'AppContentTaskDetail',
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

      tags: ['Quality', 'Cost', 'Safety', 'People'],
      task: false,
      menu1: false,
      menu2: false
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
    submitForm () {
      let _formData = new URLSearchParams(
        {
          taskName: this.taskName ? this.taskName : null,
          taskDescription: this.taskDescription,
          taskTags: this.taskTags ? this.taskTags.toString() : null,
          taskRepeatInterval: this.taskRepeatInterval ? this.taskRepeatInterval.itemId : this.taskRepeatInterval,
          taskTimeSlot: this.taskTimeSlot,
          taskDueDateParsed: this.date,
          createBy: this.$store.getters.GET_USER_ID
        }
      )
      this.$store.dispatch('CREATE_NEW_TASK', _formData)
      this.task = false
    }
  }
}
</script>

<style scoped>
</style>
