<template>
  <v-dialog v-model="dialog" persistent>
    <v-btn slot="activator" icon>
      <v-icon color="yellow">call_missed_outgoing</v-icon>
    </v-btn>
    <v-card>
      <v-card-title class="headline"><v-icon color="yellow" class="pr-3">warning</v-icon><span class="yellow--text">跳过本次任务</span></v-card-title>
      <v-card-text>跳过本次任务将被标记为未完成，新的周期会重新生成</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" outline @click.native="dialog = false">取消</v-btn>
        <v-btn color="red darken-1" outline @click.native="skipOneTime">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AppTaskSkip',
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    skipOneTime: function () {
      this.dialog = false
      return false
    }
  }
}
</script>

<style scoped>

</style>
