<template>
  <v-content app>
    <v-container fluid grid-list-md>
      <v-layout>
        <v-flex xs12 sm12 md12>
          <div class="align-center display-1 font-weight-light grey--text"><span>Go GEMBA && Just Do It</span></div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-card>
            <v-progress-linear v-bind:value="$store.getters.GET_TODAY_FINISH_RATE" height="3" color="red"></v-progress-linear>
            <v-subheader><v-chip label color="red lighten-4">今日摘要</v-chip></v-subheader>
            <v-divider insert></v-divider>
            <v-card-text>
              <v-list subheader two-line dense>
                <template v-for="todo in $store.getters.GET_TASK_TODAY">
                  <v-hover v-bind:key="todo.id">
                    <v-list-tile
                      slot-scope="{ hover }"
                      :class="`elevation-${hover ? 8 : 0}`"
                    >
                      <v-list-tile-action>
                        <v-checkbox
                          v-bind:key="todo.id"
                          v-on:change="changeTaskStatus(todo.id, todo.isLoop)"
                          v-bind:input-value="todo.isDone"
                          on-icon="check_circle_outline"
                          off-icon="panorama_fish_eye"
                        ></v-checkbox>
                      </v-list-tile-action>
                      <v-list-tile-content
                        v-bind:style="[todo.isDone ? completedTaskStyle : null]"
                        v-on:click.stop="goToTask(todo.id)"
                      >
                        <v-list-tile-title>{{ todo.taskTitle }}</v-list-tile-title>
                        <v-list-tile-sub-title>
                          {{ todo.taskDescription }}
                        </v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-list-tile-action-text>{{ todo.nextLoopAt| moment('YYYY/MM/DD') }}</v-list-tile-action-text>
                        <div style="display: inline-block">
                          <v-tooltip v-if="todo.remark" top>
                            <v-btn icon slot="activator"><v-icon color="yellow">comment</v-icon></v-btn>
                            <span>{{ '备注:' + todo.remark}}</span>
                          </v-tooltip>
                          <v-btn icon v-if="todo.frequency"><v-icon color="blue">restore</v-icon></v-btn>
                          <span v-if="todo.remindAt">
                          <span>{{ todo.remindAt}}</span>
                        </span>
                        </div>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-hover>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-card>
            <v-progress-linear v-bind:value="$store.getters.GET_LATER_FINISH_RATE" height="3" color="blue"></v-progress-linear>
            <v-subheader><v-chip label color="blue lighten-4">晚些时候</v-chip></v-subheader>
            <v-divider insert></v-divider>
            <v-card-text>
              <v-list subheader two-line dense>
                <template v-for="todo in $store.getters.GET_TASK_LATER">
                  <v-hover v-bind:key="todo.id">
                    <v-list-tile
                      slot-scope="{ hover }"
                      :class="`elevation-${hover ? 8 : 0}`"
                    >
                      <v-list-tile-action>
                        <v-checkbox
                          v-bind:key="todo.id"
                          v-on:change="changeTaskStatus(todo.id, todo.isLoop)"
                          v-bind:input-value="todo.isDone"
                          on-icon="check_circle_outline"
                          off-icon="panorama_fish_eye"
                        ></v-checkbox>
                      </v-list-tile-action>
                      <v-list-tile-content
                        v-bind:style="[todo.isDone?completedTaskStyle:null]"
                        v-on:click.stop="goToTask(todo.id)"
                      >
                        <v-list-tile-title>{{ todo.taskTitle }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ todo.taskDescription }}</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-list-tile-action-text>{{ todo.nextLoopAt | moment('YYYY/MM/DD') }}</v-list-tile-action-text>
                        <div style="display: inline-block">
                          <v-tooltip v-if="todo.remark" top>
                            <v-btn icon slot="activator"><v-icon color="yellow">comment</v-icon></v-btn>
                            <span>{{ '备注:' + todo.remark}}</span>
                          </v-tooltip>
                          <v-btn icon v-if="todo.frequency"><v-icon color="blue">restore</v-icon></v-btn>
                          <span v-if="todo.remindAt">
                          <span>{{ todo.remindAt}}</span>
                        </span>
                        </div>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-hover>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog
      v-model="dialog"
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          正在生成新的任务
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
export default {
  name: 'AppContent',
  data () {
    return {
      completedTaskStyle: {
        'font-style': 'italic',
        'text-decoration': 'line-through'
      },
      panel: [true],
      todos: [],
      dialog: false
    }
  },
  watch: {
    dialog (val) {
      if (!val) return
      setTimeout(() => (this.dialog = false), 1500)
    }
  },
  methods: {
    goToTask: function (_id) {
      console.log('=> DIRECT TO LINK /task/' + _id)
      this.$router.push({name: 'task', params: { taskId: _id }})
    },
    changeTaskStatus: function (_id, _isLoop) {
      if (!_isLoop) { this.dialog = true }
      this.$store.dispatch('CHANGE_DONE_STATUS', _id)
    }
  },
  beforeMount: function () {
    this.$store.dispatch('GET_TASKS_OF_ALL')
    this.todos = this.$store.state.TASKS
  }
}
</script>

<style scoped>

</style>
