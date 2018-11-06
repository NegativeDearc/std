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
      <span>任务卡</span>
      <v-icon>touch_app</v-icon>
    </v-btn>

    <v-btn
      color="teal"
      flat
      value="future"
      disabled
    >
      <span>暂未开发</span>
      <v-icon>next_week</v-icon>
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
      bottomNav: 'today'
    }
  },
  watch: {
    bottomNav: function () {
      this.$router.push('/' + this.bottomNav)
    }
  }
}
</script>

<style scoped>

</style>
