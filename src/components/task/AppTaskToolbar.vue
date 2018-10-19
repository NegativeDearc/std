<template>
  <v-toolbar app>
    <v-toolbar-side-icon v-on:click="back">
      <v-icon>chevron_left</v-icon>
    </v-toolbar-side-icon>
    <v-toolbar-title>{{}}</v-toolbar-title>
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
