<template>
  <v-app v-bind:dark="$store.state.IS_DARK">
    <router-view name="header"></router-view>
    <router-view name="sidebar"></router-view>
    <router-view></router-view>
    <router-view name="footer"></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'AppIndex'
}
</script>

<style scoped>

</style>
