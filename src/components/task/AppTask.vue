<template>
  <v-app v-bind:dark="$store.state.IS_DARK">
    <AppTaskContent/>
    <AppTaskFooter/>
  </v-app>
</template>

<script>
import AppTaskContent from '../task/AppTaskContent'
import AppTaskFooter from '../task/AppTaskFooter'

export default {
  name: 'AppTask',
  components: { AppTaskContent, AppTaskFooter },
  mounted: function () {
    console.log('=> CURRENT ROTE IS /task/' + this.$router.currentRoute.params.taskId)
  }
}
</script>

<style scoped>

</style>
