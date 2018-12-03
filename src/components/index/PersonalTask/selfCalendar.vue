<template>
  <div>
    <v-date-picker
      full-width
      no-title
      v-on:input="select_dates"
      v-model="selected_date"
      reactive
      color="primary"
      v-bind:events="custom_events"
      v-bind:event-color="custom_events_colors"
    >
      <v-btn
        absolute
        dark
        fab
        bottom
        right
        color="pink"
        v-on:click="insertNewTask"
      >
        <v-icon v-if="!show_modal">add</v-icon>
        <v-icon v-else>close</v-icon>
      </v-btn>
    </v-date-picker>

    <v-snackbar
      v-model="snackbar"
      color="red"
      top
      v-bind:timeout="3000"
    >
      必需先指定日期
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <v-dialog
      v-model="show_modal"
      max-width="480px"
    >
      <SelfNewTask v-bind:date="selected_date"></SelfNewTask>
    </v-dialog>
  </div>
</template>

<script>
import { eventBus } from '../../../main'
import SelfNewTask from './selfNewTask'
import localForge from 'localforage'

export default {
  name: 'selfCalendar',
  components: { SelfNewTask },
  data () {
    return {
      show_modal: false,
      show_dates: false,
      selected_date: '',
      snackbar: false,
      o_keys: [],
      keys: []
    }
  },
  watch: {
    selected_date: function (oldVal) {
      if (oldVal !== '') {
        eventBus.$emit('show-task-item', this.selected_date)
      }
    }
  },
  methods: {
    select_dates: function () {
      console.log(this.selected_date)
    },
    insertNewTask: function () {
      if (this.selected_date === '') {
        this.snackbar = true
        return true
      } else {
        this.show_modal = true
        console.log(this.selected_date)
      }
    },
    db_keys: function () {
      localForge.keys().then(keys => {
        this.o_keys = keys
        this.keys = keys.map(key => key.split(':')[0])
      })
    },
    custom_events: function (date) {
      // console.log(date)
      return this.keys.includes(date)
    },
    custom_events_colors: function (date) {
      // function taking date as a parameter and returning color for that date
      for (let i of this.o_keys) {
        if (i.split(':')[0] === date) {
          localForge.getItem(i).then(item => {
            // console.log(item.color || 'primary')
            // todo: generate correct color
            return item.color || 'primary'
          })
        }
      }
    }
  },
  mounted: function () {
    this.db_keys()
  },
  created: function () {
    eventBus.$on('show-today', () => {
      let _today = this.$moment(new Date()).format('YYYY-MM-DD')
      this.selected_date = _today
    })
    eventBus.$on('close-modal', () => {
      this.show_modal = false
    })
    eventBus.$on('update-events', () => {
      this.db_keys()
    })
  }
}
</script>

<style scoped>

</style>
