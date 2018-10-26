<template>
  <v-toolbar
    app
  >
    <v-toolbar-side-icon v-on:click.stop="$store.commit('UNDRAWER') "></v-toolbar-side-icon>
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
      label="任意搜索"
      solo-inverted
    ></v-autocomplete>
    <v-toolbar-items>
      <AppHeaderDash/>
      <AppHeaderSettings/>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import AppHeaderDash from '../index/AppHeaderDash'
import AppHeaderSettings from '../index/AppHeaderSettings'

export default {
  name: 'AppHeader',
  data () {
    return {
      select: '',
      loading: '',
      search: '',
      items: []
    }
  },
  components: {
    AppHeaderDash,
    AppHeaderSettings
  }
}
</script>

<style scoped>

</style>
