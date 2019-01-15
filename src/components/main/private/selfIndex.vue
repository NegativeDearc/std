<template>
  <div>
    <v-content app>
      <self-calendar></self-calendar>
      <self-task-items v-bind:date="date"></self-task-items>
    </v-content>
  </div>
</template>

<script>
import { eventBus } from '../../../main'
import SelfCalendar from './selfCalendar'
import SelfTaskItems from './selfTaskItems'

export default {
  name: 'VSelfIndex',
  components: { SelfTaskItems, SelfCalendar },
  data () {
    return {
      date: null
    }
  },
  created: function () {
    eventBus.$on('show-task-item', (date) => {
      this.date = date
      // console.log('show selected items of', this.date)
    })
  }
}
</script>

<style scoped>

</style>
