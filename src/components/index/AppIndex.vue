<template>
  <v-app v-bind:dark="$store.state.IS_DARK">
    <AppHeader/>
    <AppSideBar/>
    <router-view></router-view>
    <router-view name="footer"></router-view>
  </v-app>
</template>

<script>
import AppHeader from '../index/AppHeader'
import AppSideBar from '../index/AppSideBar'

export default {
  name: 'AppIndex',
  components: { AppSideBar, AppHeader }
}
</script>

<style scoped>

</style>
