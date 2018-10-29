<template>
  <v-content app>
    <v-container fluid grid-list-lg>
      <v-layout>
        <v-flex xs12 sm12 md6 offset-md3>
          <p style="font-family: 'American Typewriter',monospace">Just Do It</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm12 md6 offset-md3>
          <v-card>
            <v-subheader>To do</v-subheader>
            <v-card-text class="grey lighten-5">
              <v-list
                subheader
                two-line
                dense
              >
                <template v-for="todo in $store.getters.GET_TASK">
                  <v-hover v-bind:key="todo.id">
                    <v-list-tile
                      slot-scope="{ hover }"
                      :class="`elevation-${hover ? 12 : 0}`"
                      v-bind:key="todo.id"
                      v-bind:style="[isDelay(todo.dueDate, todo.isDone)?dueDateTaskStyleDelay:'']"
                    >
                      <v-list-tile-action>
                        <v-checkbox
                          v-bind:key="todo.id"
                          v-on:click.stop="$store.dispatch('CHANGE_DONE_STATUS', todo.id)"
                          v-model="todo.isDone"
                          off-icon="panorama_fish_eye"
                          on-icon="check_circle_outline"
                        ></v-checkbox>
                      </v-list-tile-action>
                      <v-list-tile-content
                        v-bind:style="[todo.isDone?completedTaskStyle:'']"
                        v-on:click="goToTask(todo.id)"
                      >
                        <v-list-tile-title>{{ todo.taskTitle }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ todo.taskDescription }}</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-list-tile-action-text>{{ todo.nextLoopAt| moment('YYYY/MM/DD') }} {{ todo.dueDate | moment('from') }}</v-list-tile-action-text>
                        <div style="display: inline-block">
                          <v-icon v-if="todo.frequency" color="blue">restore</v-icon>
                          <span v-if="todo.remindAt">
                          <!--<v-icon>notifications_active</v-icon>-->
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
      dueDateTaskStyleDelay: {
        'background-color': '#EEEEEE',
        'border': 'solid #FF5722'
      },
      toDos: [],
      online: ''
    }
  },
  methods: {
    isDelay: function (dueDate, taskStatus) {
      if (!taskStatus) return new Date(dueDate) <= new Date()
    },
    goToTask: function (_id) {
      console.log('=> DIRECT TO LINK /task/' + _id)
      this.$router.push({name: 'task', params: { taskId: _id }})
    }
  },
  mounted: function () {
    this.$store.dispatch('GET_TASKS_OF_ALL')
    this.toDos = this.$store.state.TASKS
  },
  sockets: {
    oneLineCounter: function (data) {
      this.online = data.online
    }
  }
}
</script>

<style scoped>

</style>
