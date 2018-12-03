<template>
   <v-card>
      <v-toolbar extended flat v-bind:color="selected_color || 'primary'" dark>
        <v-toolbar-title>
          New Task
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn flat icon dark>
          <v-icon v-on:click="close_modal">close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-layout>
          <v-flex sm12 md12 xs12>
            <v-list>
              <v-list-tile>
                <v-list-tile-avatar>
                  <v-icon>text_fields</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-text-field
                    single-line hide-details solo flat autofocus
                    placeholder="Task title"
                    v-model="self_task_title"
                    v-bind:style="{ width: '100%' }"
                  ></v-text-field>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider insert></v-divider>
              <v-list-tile>
                <v-list-tile-avatar>
                  <v-icon>schedule</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-text-field
                    v-bind:style="{ width: '100%' }"
                    placeholder="enter description"
                    solo
                    flat
                    full-width
                    v-bind:value="date"
                    readonly
                    disabled
                  ></v-text-field>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile>
                <v-list-tile-avatar>
                  <v-icon>description</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-text-field
                    v-bind:style="{ width: '100%' }"
                    placeholder="enter description"
                    v-model="self_task_description"
                    solo
                    flat
                    single-line
                    full-width
                  ></v-text-field>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile>
                <v-list-tile-avatar>
                  <v-icon>invert_colors</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-select
                    single-line hide-details solo flat full-width
                    v-bind:style="{ width: '100%' }"
                    placeholder="select color"
                    v-bind:items="colors"
                    v-model="selected_color"
                  >
                    <template slot="item" slot-scope="{ item }">
                      <v-list-tile-content>
                        <div v-bind:style="{ backgroundColor: item.value, width: '100%', color: 'white', fontSize: '18px' }" v-text="item.text"></div>
                      </v-list-tile-content>
                    </template>
                  </v-select>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions>
       <v-spacer></v-spacer>
       <v-btn
         flat dark
         v-bind:color="selected_color || 'primary'"
         v-bind:disabled="!self_task_title"
         v-on:click="save"
       >
         save
       </v-btn>
     </v-card-actions>
   </v-card>
</template>

<script>
import { eventBus } from '../../../main'
import uuid4 from 'uuid'
import localForge from 'localforage'

export default {
  props: {
    date: { type: String }
  },
  data () {
    return {
      selected_color: null,
      self_task_title: null,
      self_task_description: null,
      colors: [
        { value: 'red', text: 'red' },
        { value: 'pink', text: 'pink' },
        { value: 'purple', text: 'purple' },
        { value: 'indigo', text: 'indigo' },
        { value: 'blue', text: 'blue' },
        { value: 'blue', text: 'blue' },
        { value: 'cyan', text: 'cyan' },
        { value: 'teal', text: 'teal' },
        { value: 'yellow', text: 'yellow' },
        { value: 'orange', text: 'orange' },
        { value: 'orange', text: 'orange' },
        { value: 'grey', text: 'grey' }
      ]
    }
  },
  name: 'selfNewTask',
  methods: {
    close_modal: function () {
      console.log('closing modal')
      eventBus.$emit('close-modal')
    },
    init_item: function () {
      // close modal and init data()
      this.selected_color = null
      this.self_task_title = null
      this.self_task_description = null
      eventBus.$emit('close-modal')
      eventBus.$emit('update-events')
    },
    save: function () {
      // save to localstorage by localforage
      let _id = [this.date, uuid4()].join(':')
      let _taskItem = {
        id: _id,
        date: this.date,
        title: this.self_task_title,
        description: this.self_task_description,
        color: this.selected_color,
        author: this.$store.state.USER.USER_ID,
        isDone: false,
        createAt: new Date().toISOString()
      }
      localForge.setItem(_id, _taskItem)
        .then(data => {
          console.log(data)
          eventBus.$emit('show-task-item', this.date)
          this.init_item()
        })
        .then(() => {
          eventBus.$emit('refresh-item')
        })
        .catch(err => { console.log(err) })
    }
  }
}
</script>

<style scoped>
  .v-list-tile {
    height: 60px
  }
</style>
