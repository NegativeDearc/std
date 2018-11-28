<template>
  <v-app v-bind:dark="$store.state.IS_DARK">
    <router-view name="header"></router-view>
    <router-view name="sidebar"></router-view>
    <router-view></router-view>
    <router-view name="footer"></router-view>
  </v-app>
</template>

<script>
import AppHeader from './headerForToday/AppHeader'
import AppSideBar from '../index/AppSideBar'

export default {
  name: 'AppIndex',
  components: { AppSideBar, AppHeader }
}
</script>

<style scoped>

</style>
