<template>
  <div>
    <v-layout align-end row fill-height>
      <v-flex sm1 offset-sm1>
        <span>every</span>
      </v-flex>
      <v-flex sm2>
        <v-text-field
          v-model="weekly.INTERVAL"
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
        sm1
        v-for="(item, index) in $store.state.RRULE.weekday.slice(0,5)"
        v-bind:key="item.value"
        v-bind:offset-sm1="index === 0"
      >
        <v-checkbox
          v-bind:label="item.text"
          v-bind:value="item.value"
          v-model="weekly.BYDAY"
          on-icon="check_circle_outline"
          off-icon="panorama_fish_eye"
        ></v-checkbox>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'rruleByWeek',
  data () {
    return {
      weekly: {
        'FREQ': 'WEEKLY',
        'INTERVAL': '1',
        'BYDAY': []
      }
    }
  },
  computed: {

  },
  watch: {
    weekly: {
      handler: function () {
        this.emitWeeklyRules()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    emitWeeklyRules: function () {
      let weeklyRules = _.pick(this.weekly, ['FREQ', 'INTERVAL'])
      // todo: sort by weekday order
      weeklyRules.BYDAY = this.weekly.BYDAY.toString()
      this.$store.commit('CHANGE_RRULE_STRINGS', weeklyRules)
    }
  }
}
</script>

<style scoped>

</style>
