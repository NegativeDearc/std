<template>
  <v-content app>
    <v-container fluid grid-list-lg>
      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-alert
            v-model="alert"
            type="error"
          >
            处于开发阶段，数据丢失概不负责
          </v-alert>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'AppContentSelf',
  data () {
    return {
      alert: 'true'
    }
  }
}
</script>

<style scoped>

</style>
