<template>
  <v-snackbar
    v-bind:timeout=0
    color="red"
    right
    top
    vertical
    v-bind:value="!$store.state.CONNECTION_STATUS"
  >
    <v-icon
      dark
      size="40">perm_scan_wifi
    </v-icon>
    <div class="body-2">{{ $t('connection_error') }}</div>
  </v-snackbar>
</template>

<script>
export default {
  name: 'ConnectionStatus'
}
</script>

<style scoped>

</style>
