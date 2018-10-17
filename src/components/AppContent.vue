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
              >
                <template v-for="todo in testToDo">
                  <v-list-tile
                    v-bind:key="todo.id"
                    v-bind:style="[isDelay(todo.dueDate, todo.status)?dueDateTaskStyleDelay:'']"
                    v-bind:to="'/#/' + todo.id"
                  >
                    <v-list-tile-action>
                      <v-checkbox
                        v-model="todo.status"
                        on-icon="panorama_fish_eye"
                        off-icon="check_circle_outline"
                      ></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content v-bind:style="[!todo.status?completedTaskStyle:'']">
                      <v-list-tile-title>{{ todo.title }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ todo.description }}</v-list-tile-sub-title>
                    </v-list-tile-content>
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
        {id: 1, title: 'to do 1', description: 'to do 1 description', status: true, dueDate: '2018-10-01'},
        {id: 2, title: 'to do 2', description: 'to do 2 description', status: true, dueDate: '2018-11-11'},
        {id: 3, title: 'to do 3', description: 'to do 3 description', status: false, dueDate: '2018-10-17'}
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
      if (taskStatus) return new Date(dueDate) >= new Date()
    }
  }
}
</script>

<style scoped>

</style>
