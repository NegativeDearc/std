<template>
  <v-footer app>
    <v-layout row wrap>
      <v-spacer></v-spacer>
      <v-subheader>{{ taskFinishStatus }}</v-subheader>
      <v-spacer></v-spacer>
      <AppTaskDelete/>
    </v-layout>
  </v-footer>
</template>

<script>
import AppTaskDelete from '../task/AppTaskDelete'

export default {
  name: 'AppTaskFooter',
  components: { AppTaskDelete },
  computed: {
    taskFinishStatus: function () {
      let _result = null
      let _task = this.$store.getters.GET_TASK_BY_ID(this.$route.params.taskId)
      console.log(_task)
      if (_task.punchTime) {
        _result = '完成于 ' + _task.punchTime
      } else {
        _result = '到期于 ' + this.$moment(_task.nextLoopAt).fromNow()
      }
      return _result
    }
  }
}
</script>

<style scoped>

</style>
