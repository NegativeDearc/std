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
            <v-subheader>正在进行中</v-subheader>
            <v-card-text class="grey lighten-5">
              <v-list
                subheader
                two-line
                dense
              >
                <template v-for="todo in testToDo">
                  <v-list-tile
                    v-bind:key="todo.id"
                    v-bind:style="[isDelay(todo.dueDate, todo.status)?dueDateTaskStyleDelay:'']"
                    v-bind:to="{ name: 'task', params: { id: todo.id }}"
                  >
                    <v-list-tile-action>
                      <v-checkbox
                        v-model="todo.status"
                        on-icon="panorama_fish_eye"
                        off-icon="check_circle_outline"
                      ></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content
                      v-bind:style="[!todo.status?completedTaskStyle:'']"
                    >
                      <v-list-tile-title>{{ todo.title }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ todo.description }}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-list-tile-action-text>{{ todo.dueDate|moment('from') }}</v-list-tile-action-text>
                      <div style="display: inline-block">
                        <v-icon v-if="todo.loop" color="#F44336">restore</v-icon>
                        <span v-if="todo.reminderMeAt">
                          <v-icon color="#2196F3">notifications_active</v-icon>
                          <span>{{ todo.reminderMeAt}}</span>
                        </span>
                      </div>
                    </v-list-tile-action>
                  </v-list-tile>
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
      testToDo: [
        {id: 1, title: 'to do 1', loop: true, description: 'to do 1 description', status: true, reminderMeAt: '13:45', dueDate: '2018-10-01'},
        {id: 2, title: 'to do 2', loop: false, description: 'to do 2 description', status: true, reminderMeAt: null, dueDate: '2018-11-11'},
        {id: 3, title: 'to do 3', loop: true, description: 'to do 3 description', status: false, reminderMeAt: '9:00', dueDate: '2018-10-16'}
      ],
      completedTaskStyle: {
        'font-style': 'italic',
        'text-decoration': 'line-through'
      },
      dueDateTaskStyleDelay: {
        'background-color': '#EEEEEE',
        'border': 'solid #FF5722'
      }
    }
  },
  methods: {
    isDelay: function (dueDate, taskStatus) {
      if (taskStatus) return new Date(dueDate) <= new Date()
    }
  }
}
</script>

<style scoped>

</style>
