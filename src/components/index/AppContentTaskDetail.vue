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
            <v-form ref="newTask">
              <v-list two-line>
                <v-subheader>任务描述</v-subheader>
                <v-list-tile>
                  <v-text-field
                    label="任务"
                    prepend-icon="assignment"
                    v-model="taskName"
                    required
                    outline
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
                <v-list-tile style="border: 2px solid grey; border-radius: 4px;margin-left: 50px;margin-right: 15px">
                  <v-checkbox label="周一" value="1" off-icon="close" on-icon="check" v-model="week" color="red"></v-checkbox>
                    <v-checkbox label="周二" value="2" off-icon="close" on-icon="check" v-model="week" color="red"></v-checkbox>
                    <v-checkbox label="周三" value="3" off-icon="close" on-icon="check" v-model="week" color="red"></v-checkbox>
                    <v-checkbox label="周四" value="4" off-icon="close" on-icon="check" v-model="week" color="red"></v-checkbox>
                    <v-checkbox label="周五" value="5" off-icon="close" on-icon="check" v-model="week" color="red"></v-checkbox>
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
                            color="blue"
                            format="24hr"
                            min="8:30"
                            max="20:00"
                            :allowed-minutes="allowedStep"
                            @change="$refs.menu.save(taskTimeSlot)"
                          ></v-time-picker>
                        </v-menu>
                      </v-layout>
                    </v-list-tile>
                  </v-flex>
                  <v-flex sm6 md6 sx6>
                    <v-subheader>任务标签</v-subheader>
                    <v-list-tile>
                      <v-icon color="red">bookmarks</v-icon>
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
                      ></v-autocomplete>
                    </v-list-tile>
                  </v-flex>
                </v-layout>
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
      week: [],
      taskName: null,
      taskDescription: null,
      taskTags: null,
      taskRepeatInterval: null,
      taskTimeSlot: null,
      date: null,

      tags: this.$store.state.TASK_TAGS,
      task: false,
      menu2: false
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
          taskRepeatInterval: this.week,
          taskTimeSlot: this.taskTimeSlot,
          createBy: this.$store.getters.GET_USER_ID
        }
      )
      this.$store.dispatch('CREATE_NEW_TASK', _formData)
      this.$refs.newTask.reset()
      this.task = false
    }
  }
}
</script>

<style scoped>
</style>
