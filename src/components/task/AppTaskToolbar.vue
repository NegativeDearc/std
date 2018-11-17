<template>
  <v-toolbar app>
    <v-toolbar-side-icon v-on:click="back">
      <v-icon>chevron_left</v-icon>
    </v-toolbar-side-icon>
    <span>返回</span>
    <v-spacer></v-spacer>
    <v-toolbar-title>任务详情</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AppTaskToolbar',
  methods: {
    back: function () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
