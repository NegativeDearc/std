<template>
  <v-dialog
    v-model="$store.state.NEW_TASK_DIALOG"
    max-width="400px"
    lazy
    persistent
  >
    <v-card flat>
      <v-toolbar card>
        <v-toolbar-title v-text="$t('new_task') + ': ' + taskTitle"></v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-list>
          <v-list-tile>
            <v-list-tile-action><v-icon color="primary">settings</v-icon></v-list-tile-action>
            <v-list-tile-title>{{ taskType ? $t('recurrence_task') : $t('one_time_task') }}</v-list-tile-title>
            <v-list-tile-action>
              <v-switch v-model="taskType"></v-switch>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider inset></v-divider>

          <template v-if="taskType">
            <v-list-tile>
              <v-list-tile-action><v-icon color="green">repeat</v-icon></v-list-tile-action>
              <v-list-tile-title
                v-on:click="show_rrlue_dialog"
                v-text="cron ? cronDescription : $t('choose_loop')"
              >
              </v-list-tile-title>
            </v-list-tile>
            <v-divider inset></v-divider>
          </template>

          <template v-else>
            <v-list-tile>
              <v-list-tile-action><v-icon color="green">date_range</v-icon></v-list-tile-action>
              <v-list-tile-title
                v-on:click="show_date_dialog"
                v-text="date ? date: $t('choose_end_time')">
              </v-list-tile-title>
            </v-list-tile>
            <v-divider inset></v-divider>
          </template>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="red" @click="close">{{ $t('close') }}</v-btn>
        <v-btn flat color="green" @click="confirm" v-bind:disabled="checkValidation">{{ $t('confirm') }}</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog
      ref="date_dialog"
      v-model="date_dialog"
      :return-value.sync="date"
      persistent
      lazy
      full-width
      width="290px"
    >
      <v-date-picker v-model="date" scrollable>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="date_dialog = false">Cancel</v-btn>
        <v-btn flat color="primary" @click="$refs.date_dialog.save(date)">OK</v-btn>
      </v-date-picker>
    </v-dialog>
    <v-dialog
      lazy
      full-width
      v-model="rrule_dialog"
      max-width="800px"
    >
      <cronPicker
        v-on:onClose="rrule_dialog = false"
        v-on:cronChange="cron_expression"
      ></cronPicker>
    </v-dialog>
  </v-dialog>
</template>

<script>
import cronPicker from '../utils/cronPickerV2/cronPicker'
import cronstrue from 'cronstrue'

export default {
  props: {
    taskTitle: { type: String }
  },

  components: {cronPicker},

  data () {
    return {
      taskType: true,
      date_dialog: false,
      rrule_dialog: false,
      date: null,
      cron: null
    }
  },

  computed: {
    cronDescription () {
      let wholeCronString = cronstrue.toString(this.cron).split(',')
      return wholeCronString.splice(1, wholeCronString.length).toString()
    },

    checkValidation () {
      if (this.taskType) {
        return !this.cron
      } else {
        return !this.date
      }
    }
  },

  methods: {
    close () {
      Object.assign(this.$data, this.$options.data())
      this.$store.commit('CHANGE_NEW_TASK_DIALOG')
    },

    async confirm () {
      if (this.taskType) {
        await this.$store.dispatch('CREATE_NEW_TASK', {
          taskTitle: this.taskTitle,
          taskRepeatInterval: this.cron,
          taskRemindAt: '17:00:00'
        })
      } else {
        await this.$store.dispatch('CREATE_NEW_TASK_ONCE', {
          taskTitle: this.taskTitle,
          taskDueDate: this.date,
          taskRemindAt: '17:00:00'
        })
      }
      this.$store.commit('CHANGE_NEW_TASK_DIALOG')
      this.$emit('clear-input')
      await Object.assign(this.$data, this.$options.data())
    },

    show_date_dialog () {
      this.date_dialog = true
    },

    show_rrlue_dialog () {
      this.rrule_dialog = true
    },

    cron_expression (cron) {
      this.cron = cron
    }
  },

  name: 'mainNewTask'
}
</script>

<style scoped>

</style>
