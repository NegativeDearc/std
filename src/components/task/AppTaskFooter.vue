<template>
  <v-footer height="auto">
    <v-layout row wrap>
      <v-subheader>1111</v-subheader>
      <v-spacer></v-spacer>
      <AppTaskDelete/>
    </v-layout>
  </v-footer>
</template>

<script>
import AppTaskDelete from '@/components/task/AppTaskDelete'

export default {
  name: 'AppTaskFooter',
  components: {AppTaskDelete}
}
</script>

<style scoped>

</style>
