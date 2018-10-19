<template>
  <v-toolbar
    app
  >
    <v-toolbar-side-icon v-on:click.stop="$store.commit('unDrawer') "></v-toolbar-side-icon>
    <v-autocomplete
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      v-model="select"
      cache-items
      class="mx-3"
      flat
      hide-no-data
      hide-details
      label="Searching Your To Do"
      solo-inverted
    ></v-autocomplete>
    <v-toolbar-items>
      <AppHeaderLogin/>
      <AppHeaderSettings/>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import AppHeaderLogin from '@/components/index/AppHeaderLogin'
import AppHeaderSettings from '@/components/index/AppHeaderSettings'

export default {
  name: 'AppHeader',
  components: {
    AppHeaderLogin,
    AppHeaderSettings
  }
}
</script>

<style scoped>

</style>
