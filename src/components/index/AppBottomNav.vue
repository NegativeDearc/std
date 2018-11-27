<template>
  <v-bottom-nav
    v-bind:active.sync="bottomNav"
    v-bind:value="true"
    absolute
    color="transparent"
  >
    <v-btn
      color="teal"
      flat
      value="today"
    >
      <span>{{ $t('punchCard')}}</span>
      <v-icon>touch_app</v-icon>
    </v-btn>

    <v-btn
      color="teal"
      flat
      value="personal"
    >
      <span>{{ $t('personalTask') }}</span>
      <v-icon>person</v-icon>
    </v-btn>

    <v-btn
      color="teal"
      flat
      value="archive"
      disabled
    >
      <span>暂未开发</span>
      <v-icon>archive</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  name: 'AppBottomNav',
  data () {
    return {
      bottomNav: this.$route.path.substr(1) || 'today'
    }
  },
  watch: {
    bottomNav: function () {
      this.$router.push('/' + this.bottomNav)
      console.log(this.bottomNav)
    }
  }
}
</script>

<style scoped>

</style>
