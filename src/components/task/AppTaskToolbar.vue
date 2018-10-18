<template>
  <v-toolbar app>
    <v-toolbar-side-icon v-on:click="back">
      <v-icon>chevron_left</v-icon>
    </v-toolbar-side-icon>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Link One</v-btn>
      <v-btn flat>Link Two</v-btn>
      <v-btn flat>Link Three</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AppTaskToolbar',
  methods: {
    back: function () {
      window.history.back()
    }
  }
}
</script>

<style scoped>

</style>
