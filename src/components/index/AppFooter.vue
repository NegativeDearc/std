<template>
  <v-footer app
            height="56px">
    <AppBottomNav/>
  </v-footer>
</template>
<script>
import AppBottomNav from '../index/AppBottomNav'

export default {
  name: 'AppFooter',
  components: {
    AppBottomNav
  }
}
</script>

<style scoped>
</style>
