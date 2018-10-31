<template>
  <v-bottom-nav
    :active.sync="bottomNav"
    :value="true"
    absolute
    color="transparent"
  >
    <v-btn
      color="teal"
      flat
      value="today"
    >
      <span>今日</span>
      <v-icon>touch_app</v-icon>
    </v-btn>

    <v-btn
      color="teal"
      flat
      value="future"
    >
      <span>未来</span>
      <v-icon>next_week</v-icon>
    </v-btn>

    <v-btn
      color="teal"
      flat
      value="archive"
    >
      <span>存档</span>
      <v-icon>archive</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  name: 'AppBottomNav',
  data () {
    return {
      bottomNav: 'today'
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
