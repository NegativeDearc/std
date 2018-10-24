<template>
  <v-dialog v-model="dialog" persistent>
    <v-btn slot="activator" icon>
      <v-icon color="red">delete_sweep</v-icon>
    </v-btn>
    <v-card>
      <v-card-title class="headline"><span>当心！你正在危险领域</span></v-card-title>
      <v-card-text>删除任务将无法恢复！</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click.native="dialog = false">不确定</v-btn>
        <v-btn color="red darken-1" flat @click.native="isDelete">确定</v-btn>
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
