<template>
  <v-app app>
    <self-toolbar></self-toolbar>
    <v-content app>
      <self-calendar></self-calendar>
    </v-content>
  </v-app>
</template>

<script>
import selfToolbar from './selfToolbar'
import SelfCalendar from './selfCalendar'

export default {
  name: 'selfIndex',
  components: { SelfCalendar, selfToolbar }
}
</script>

<style scoped>

</style>
