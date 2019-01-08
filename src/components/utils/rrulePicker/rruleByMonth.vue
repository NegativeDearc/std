<template>
  <div>
    <v-layout align-center row fill-height>
      <v-flex sm2 offset-sm1>
        <div>
          <v-checkbox
            label="On day"
            v-model="select_by_day"
            v-on:change="emitMonthlyRules"
          ></v-checkbox>
        </div>
      </v-flex>
      <v-flex sm4>
        <v-list>
          <v-list-tile>
            <v-select
              v-bind:menu-props="{transition:'slide-y-transition'}"
              label="select day of month"
              hide-details
              solo
              flat
              single-line
              v-model="monthly.BYMONTHDAY"
              v-bind:items="$store.state.RRULE.day"
              v-on:change="emitMonthlyRules"
              v-bind:disabled="select_by_weekday"
            ></v-select>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout align-center row fill-height>
      <v-flex sm2 offset-sm1>
        <div>
          <v-checkbox
            label="On the"
            v-model="select_by_weekday"
            v-on:change="emitMonthlyRules"
          ></v-checkbox>
        </div>
      </v-flex>
      <v-flex sm4>
        <v-list>
          <v-list-tile>
            <v-select
              v-bind:menu-props="{transition:'slide-y-transition'}"
              label="select nth"
              hide-details
              solo
              flat
              single-line
              v-model="monthly.BYSETPOS"
              v-bind:items="$store.state.RRULE.week"
              v-on:change="emitMonthlyRules"
              v-bind:disabled="select_by_day"
            ></v-select>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex sm5>
        <v-list>
          <v-list-tile>
            <v-select
              v-bind:menu-props="{transition:'slide-y-transition'}"
              label="select weekday"
              hide-details
              solo
              flat
              single-line
              v-model="monthly.BYDAY"
              v-bind:items="$store.state.RRULE.weekday"
              v-on:change="emitMonthlyRules"
              v-bind:disabled="select_by_day"
            ></v-select>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>

    <v-layout align-end row fill-height wrap>
      <v-flex offset-sm1 sm1>
        <span>every</span>
      </v-flex>
      <v-flex sm2>
        <v-text-field
          v-model="monthly.INTERVAL"
          mask="##"
          hide-details
          single-line
          v-on:input="emitMonthlyRules"
        ></v-text-field>
      </v-flex>
      <v-flex sm1>
        <span>
          month(s)
        </span>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'rruleByMonth',
  computed: {
    select_by_day: {
      get: function () {
        return !this.default_select
      },
      set: function () {
        this.default_select = !this.default_select
      }
    },
    select_by_weekday: {
      get: function () {
        return this.default_select
      },
      set: function () {
        this.default_select = !this.default_select
      }
    }
  },
  data () {
    return {
      default_select: false,
      monthly: {
        FREQ: 'MONTHLY',
        INTERVAL: '1',
        BYSETPOS: '1',
        BYDAY: 'MO',
        BYMONTHDAY: '1'
      }
    }
  },
  watch: {
    monthly: {
      handler: function () {
        this.emitMonthlyRules()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    emitMonthlyRules: function () {
      let monthlyRule
      if (!this.default_select) {
        monthlyRule = _.pick(this.monthly, ['FREQ', 'INTERVAL', 'BYMONTHDAY'])
      } else {
        monthlyRule = _.pick(this.monthly, ['FREQ', 'INTERVAL', 'BYSETPOS', 'BYDAY'])
      }
      this.$store.commit('CHANGE_RRULE_STRINGS', monthlyRule)
    }
  }
}
</script>

<style scoped>

</style>
