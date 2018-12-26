<template>
  <v-app id="main" v-bind:dark="$store.state.IS_DARK">
    <v-toolbar
      app
      flat
      prominent
    >
      <v-toolbar-side-icon
        v-on:click="$store.commit('UNDRAWER_LEFT')"
      ></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-menu v-bind:nudge-width="100">
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="item in [1,2,3,4]"
            :key="item"
            @click=""
          >
            <v-list-tile-title v-text="item"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <main-left-drawer></main-left-drawer>
    <mail-right-drawer></mail-right-drawer>
    <v-content app>
      <div ref="wrapper" class="wrapper">
        <v-card class="content">
          <v-card-text>
            <v-list subheader two-line dense>
              <transition-group name="todo-list">
                <template v-for="todo in $store.getters.GET_TASK_TODAY">
                  <v-hover v-bind:key="todo.id">
                    <v-list-tile
                      slot-scope="{ hover }"
                      v-bind:class="`elevation-${hover ? 4 : 0}`"
                      v-on:click.self=""
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
                  <v-divider v-bind:key="todo.uid + todo.id"></v-divider>
                </template>
              </transition-group>
            </v-list>
          </v-card-text>
        </v-card>
      </div>
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
            {{ $t('generating_new_task') }}
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script>
import MainLeftDrawer from './mainLeftDrawer'
import MailRightDrawer from './mailRightDrawer'

export default {
  name: 'mainContent',
  components: {MailRightDrawer, MainLeftDrawer},
  data () {
    return {
      TASK: {},
      completedTaskStyle: {
        'font-style': 'italic',
        'text-decoration': 'line-through red'
      },
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
  mounted: function () {
    this.$store.dispatch('GET_TASKS_OF_ALL')
    this.todos = this.$store.state.TASKS
    window.onresize = () => {
      console.log(document.documentElement.clientHeight)
    }
  }
}
</script>

<style scoped>
  .todo-list-move {
    transition: transform 1s;
  }
</style>
