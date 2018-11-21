<template>
  <v-dialog v-model="dialog" persistent width="400px">
    <v-btn slot="activator" icon>
      <v-icon color="red">close</v-icon>
    </v-btn>
    <v-card>
      <v-card-title class="headline"><v-icon color="red" class="pr-3">warning</v-icon><span class="red--text">当心！</span></v-card-title>
      <v-card-text>你正在危险领域!&nbsp;删除任务将无法恢复！</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" outline @click.native="dialog = false">取消</v-btn>
        <v-btn color="red darken-1" outline @click.native="isDelete">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AppTaskDelete',
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    isDelete: function () {
      this.$store.dispatch('UPDATE_AFTER_DELETE', this.$router.currentRoute.params.taskId)
      this.dialog = false
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
