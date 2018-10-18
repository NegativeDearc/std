<template>
  <v-app>
    <AppHeader/>
    <AppSideBar/>
    <router-view></router-view>
    <AppFooter/>
  </v-app>
</template>

<script>
import AppHeader from '@/components/index/AppHeader'
import AppFooter from '@/components/index/AppFooter'
import AppSideBar from '@/components/index/AppSideBar'

export default {
  name: 'AppIndex',
  components: {AppSideBar, AppFooter, AppHeader}
}
</script>

<style scoped>

</style>
