<template>
  <v-app v-bind:dark="$store.state.IS_DARK">
    <AppHeader/>
    <AppSideBar/>
    <router-view></router-view>
    <AppFooter/>
  </v-app>
</template>

<script>
import AppHeader from '../index/AppHeader'
import AppFooter from '../index/AppFooter'
import AppSideBar from '../index/AppSideBar'

export default {
  name: 'AppIndex',
  components: {AppSideBar, AppFooter, AppHeader}
}
</script>

<style scoped>

</style>
