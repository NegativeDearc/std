<template>
  <div>
    <v-layout align-end justify-start row fill-height>
      <v-flex sm1 offset-sm1>
        <span>Every</span>
      </v-flex>
      <v-flex sm2>
        <v-text-field
          v-model="interval"
          mask="##"
          single-line
          hide-details
          v-on:input="emitWeeklyRules"
        ></v-text-field>
      </v-flex>
      <v-flex sm1>
        <span>week(s)</span>
      </v-flex>
    </v-layout>
    <v-layout align-end fill-height wrap row>
      <v-flex
        v-for="(item, index) in $store.state.CRON_RULE.weekday.slice(0,5)"
        v-bind:key="item.value"
        v-bind:offset-sm1="index === 0"
      >
        <v-checkbox
          v-bind:label="item.text"
          v-bind:value="item.value"
          v-model="weekly.DAY_OF_WEEK"
          on-icon="check_circle_outline"
          off-icon="panorama_fish_eye"
        ></v-checkbox>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'cronByWeek',
  data () {
    return {
      interval: '1',
      weekly: {
        'DAY_OF_MONTH': '*',
        'MONTH': '*',
        'DAY_OF_WEEK': ['MON']
      }
    }
  },
  watch: {
    weekly: {
      handler: function () {
        this.emitWeeklyRules()
      },
      immediate: true,
      deep: true
    },
    interval: function () {
      this.emitWeeklyRules()
    }
  },
  methods: {
    emitWeeklyRules: function () {
      let dayOfMonth
      this.interval === ''
        ? dayOfMonth = '*'
        : dayOfMonth = '*/' + this.interval

      let _dict = {
        'DAY_OF_MONTH': dayOfMonth,
        'MONTH': '*',
        'DAY_OF_WEEK': this.weekly.DAY_OF_WEEK.toString()
      }
      this.$store.commit('CHANGE_CRON_DICT', _dict)
    }
  }
}
</script>

<style scoped>

</style>
