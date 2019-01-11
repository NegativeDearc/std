<template>
  <v-app v-bind:dark="$store.state.IS_DARK">
    <AppTaskContent/>
    <AppTaskFooter/>
  </v-app>
</template>

<script>
import AppTaskContent from './AppTaskContent'
import AppTaskFooter from './AppTaskFooter'

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
