<template>
  <v-content app>
    <v-toolbar></v-toolbar>
    <v-date-picker
      no-title
      full-width
    ></v-date-picker>
    <v-container>
      <v-layout>
        <v-flex xs12 sm12 md6 offset-md3>
          <h1 class="primary--text display-3 font-weight-medium my-3">STD</h1>
          <v-card>
            <v-list class="pa-0">
              <v-list-tile>
                <v-list-tile-action>
                  <!--<v-checkbox-->
                    <!--v-on:change=""-->
                    <!--color="primary"-->
                    <!--v-if="todos.length > 0"-->
                  <!--&gt;</v-checkbox>-->
                  <!--<v-icon-->
                    <!--color="primary"-->
                    <!--v-else-->
                  <!--&gt;check</v-icon>-->
                </v-list-tile-action>
                <v-text-field
                  v-on:keydown.enter="addTodo"
                  autofocus
                  browser-autocomplete="off"
                  clearable
                  color="primary"
                  flat
                  hide-details
                  maxlength="1023"
                  placeholder="Type and ENTER for New Task"
                  solo
                ></v-text-field>
              </v-list-tile>
            </v-list>
          </v-card>

          <v-card class="mt-3">
            <v-progress-linear value="59" class="my-0"></v-progress-linear>
            <v-card-actions class="px-3">
              <span class="primary--text">
                 left
              </span>
              <v-spacer></v-spacer>
              <v-btn-toggle
                class="elevation-0"
                mandatory
                v-model="visibility"
              >
                <v-btn
                  v-bind:key="k"
                  v-bind:value="k"
                  class="mx-0"
                  color="primary"
                  flat
                  small
                  v-for="(v, k) in filters"
                >
                  {{ k }}
                </v-btn>
              </v-btn-toggle>
            </v-card-actions>
          </v-card>
          <v-btn
            block
            class="mt-3"
            color="primary"
            depressed
          >
            Clear completed
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

export default {
  name: 'AppContentSelf',
  data () {
    return {
      alert: 'true',
      filters: filters,
      visibility: this.filter
    }
  },
  computed: {
    todos: function () {
      return this.$store.state.SELF_TODOS
    }
  },
  methods: {
    addTodo: function () {
      console.log('keyboard entered')
    }
  }
}
</script>

<style scoped>

</style>
