<template>
  <div>
    <v-layout align-end justify-start row fill-height wrap>
      <v-flex sm1 offset-sm1>
        <span>Every</span>
      </v-flex>
      <v-flex sm2>
        <v-text-field
          mask="##"
          hide-details
          single-line
          v-model="interval"
        ></v-text-field>
      </v-flex>
      <v-flex sm1>
        <span>
          day(s)
        </span>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'cronByDay',
  data () {
    return {
      interval: '1'
    }
  },
  watch: {
    interval: {
      handler: function () {
        this.emitDailyRules()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    emitDailyRules: function () {
      let dayInterval
      this.interval === ''
        ? dayInterval = '*'
        : dayInterval = '*/' + this.interval
      let _dict = {
        'DAY_OF_MONTH': dayInterval,
        'MONTH': '*',
        'DAY_OF_WEEK': '*'
      }
      this.$store.commit('CHANGE_CRON_DICT', _dict)
    }
  }
}
</script>

<style scoped>

</style>
