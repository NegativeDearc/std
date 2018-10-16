<template>
  <div id="app">
    <v-app>
      <AppSideBar/>
      <AppHeader></AppHeader>
      <AppContent/>
      <AppFooter/>
    </v-app>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
import AppContent from '@/components/AppContent'
import AppSideBar from '@/components/AppSideBar'

export default {
  name: 'App',
  components: {
    AppSideBar,
    AppHeader,
    AppFooter,
    AppContent
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
