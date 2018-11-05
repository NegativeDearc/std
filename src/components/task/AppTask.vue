<template>
  <v-app>
    <AppTaskToolbar/>
    <AppTaskContent/>
    <AppTaskFooter/>
  </v-app>
</template>

<script>
import AppTaskToolbar from '../task/AppTaskToolbar'
import AppTaskContent from '../task/AppTaskContent'
import AppTaskFooter from '../task/AppTaskFooter'

export default {
  name: 'AppTask',
  components: { AppTaskToolbar, AppTaskContent, AppTaskFooter },
  mounted: function () {
    console.log('=> CURRENT ROTE IS /task/' + this.$router.currentRoute.params.taskId)
  }
}
</script>

<style scoped>

</style>
