<template>
  <v-toolbar app color="transparent">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-spacer></v-spacer>
    <v-btn flat depress v-on:click="showToday">TODAY</v-btn>
  </v-toolbar>
</template>

<script>
import { eventBus } from '../../../main'

export default {
  name: 'selfToolbar',
  methods: {
    showToday: function () {
      eventBus.$emit('show-today')
    }
  }
}
</script>

<style scoped>

</style>
