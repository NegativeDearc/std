<template>
  <div ref="wrapper" class="wrapper">
    <v-card class="content">
      <v-card-text>
        <v-list subheader two-line dense>
          <transition-group name="todo-list">
            <template v-for="todo in $store.getters.GET_TASK_ALL">
              <v-hover v-bind:key="todo.id">
                <v-list-tile
                  slot-scope="{ hover }"
                  v-bind:class="`elevation-${hover ? 4 : 0}`"
                  v-on:click="show_task_panel(todo.id)"
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

</template>

<script>
import { eventBus } from '../../../main'

export default {
  name: 'mainItems',
  data () {
    return {
      completedTaskStyle: {
        'color': 'grey',
        'text-decoration': 'line-through'
      }
    }
  },
  methods: {
    show_task_panel: function (id) {
      console.log(id)
      eventBus.$emit('show_task_panel', id)
    }
  },
  mounted: function () {
    this.$store.dispatch('GET_TASKS_OF_ALL')
  }
}
</script>

<style scoped>
  .todo-list-move {
    transition: transform 1s;
  }
</style>
