<template>
  <v-app>
    <AppTaskToolbar/>
    <AppTaskContent/>
    <AppTaskFooter/>
  </v-app>
</template>

<script>
import AppTaskToolbar from '@/components/task/AppTaskToolbar'
import AppTaskContent from '@/components/task/AppTaskContent'
import AppTaskFooter from '@/components/task/AppTaskFooter'

export default {
  name: 'AppTask',
  components: {AppTaskToolbar, AppTaskContent, AppTaskFooter},
  mounted: function () {
    console.log(this.$router.currentRoute.params)
  }
}
</script>

<style scoped>

</style>
