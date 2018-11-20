<template>
  <v-toolbar
    app
  >
    <v-toolbar-side-icon v-on:click.stop="$store.commit('UNDRAWER')"></v-toolbar-side-icon>
    <v-autocomplete
      :loading="loading"
      :items="items"
      :search-input.sync="input"
      v-model="select"
      label="Search for anything..."
      class="mx-3"
      flat
      hide-no-data
      hide-details
      solo-inverted
      clearable
    ></v-autocomplete>
    <v-toolbar-items>
      <AppContentTaskDetail></AppContentTaskDetail>
      <AppHeaderDash/>
      <AppHeaderSettings/>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import AppHeaderDash from '../index/AppHeaderDash'
import AppHeaderSettings from '../index/AppHeaderSettings'
import AppContentTaskDetail from './AppHeaderNew'

export default {
  name: 'AppHeader',
  data () {
    return {
      select: '',
      loading: false,
      items: [],
      input: null
    }
  },
  components: {
    AppContentTaskDetail,
    AppHeaderDash,
    AppHeaderSettings
  },
  watch: {
    input () {
      this.loading = true
      this.axios.post('/search', {
        userId: localStorage.getItem('userId'),
        queryString: this.input
      })
        .then(data => {
          this.items = data.data
          console.log(this.items)
        })
        .catch(err => { console.error('==> SEARCH ERR', err) })
        .finally(() => { this.loading = false })
    }
  }
}
</script>

<style scoped>

</style>
