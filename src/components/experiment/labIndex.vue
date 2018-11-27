<template>
  <v-app app>
    <v-toolbar app>
      <v-btn flat icon v-on:click="goBack">
        <v-icon>chevron_left</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content app>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'labIndex',
  methods: {
    goBack: function () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
