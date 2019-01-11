<template>
  <v-content app>
    <div ref="wrapper" class="wrapper">
      <v-card class="content transparent" flat>
        <v-card-text>
          <v-list subheader two-line dense class="transparent">
            <transition-group name="todo-list">
              <template v-for="todo in getTasks">
                <v-list-tile
                  v-on:click.self.prevent="show_task_panel(todo.id)"
                  v-bind:key="todo.id"
                >
                  <v-list-tile-action>
                    <v-checkbox
                      color="green"
                      v-bind:key="todo.id"
                      v-on:change="changeTaskStatus(todo.id)"
                      v-bind:input-value="todo.isDone"
                      on-icon="check_circle_outline"
                      off-icon="panorama_fish_eye"
                    ></v-checkbox>
                  </v-list-tile-action>
                  <v-list-tile-content
                    v-on:click="show_task_panel(todo.id)"
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
                <v-divider v-bind:key="todo.uid + todo.id"></v-divider>
              </template>
            </transition-group>
          </v-list>
        </v-card-text>
      </v-card>
    </div>
  </v-content>
</template>

<script>
import { eventBus } from '../../../main'
import { mapGetters } from 'vuex'

export default {
  name: 'mainItems',
  data () {
    return {
      task: [],
      completedTaskStyle: {
        'color': 'grey',
        'text-decoration': 'line-through'
      }
    }
  },
  watch: {
    $route: {
      handler: function (from, to) {
        if (this.$store.state.RIGHT_DRAWER) {
          this.$store.commit('DRAWER_RIGHT')
        }
        return this.getTasks
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters({
      thisWeek: 'GET_THIS_WEEK_TASKS',
      later: 'GET_TASKS_LATER',
      finished: 'GET_TASKS_FINISHED',
      expired: 'GET_EXPIRED_TASKS'
    }),
    getTasks: function () {
      switch (this.$route.name) {
        case 'thisWeek':
          return this.thisWeek
        case 'later':
          return this.later
        case 'finished':
          return this.finished
        case 'expired':
          return this.expired
      }
    }
  },
  methods: {
    show_task_panel: function (id) {
      eventBus.$emit('show_task_panel', id)
    },
    changeTaskStatus: function (_id) {
      this.$store.dispatch('CHANGE_DONE_STATUS', _id)
        .then(() => {
          if (this.$store.state.RIGHT_DRAWER === true) {
            this.$store.commit('DRAWER_RIGHT')
          }
        })
    }
  },
  created: function () {
    this.$store.dispatch('GET_TASKS_OF_ALL')
    return this.getTasks
  }
}
</script>

<style scoped>

</style>
