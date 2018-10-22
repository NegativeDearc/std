<template>
  <v-dialog v-model="isDelete" persistent max-width="290">
    <v-btn slot="activator" icon>
      <v-icon color="red">delete_sweep</v-icon>
    </v-btn>
    <v-card>
      <v-card-title class="headline"><span>当心！你正在危险领域</span></v-card-title>
      <v-card-text>删除任务将不能使你重新来过，放弃总比坚持容易！</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click.native="isDelete = false">不确定</v-btn>
        <v-btn color="red darken-1" flat @click.native="isDelete = false">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AppTaskDelete',
  data () {
    return {
      isDelete: false
    }
  }
}
</script>

<style scoped>

</style>
