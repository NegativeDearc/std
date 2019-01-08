<template>
  <div>
    <v-layout align-center row fill-height wrap>
      <v-flex sm2 offset-sm1>
        <div>
          <v-checkbox
            v-model="select_by_week"
            label="On"
            v-on:change="emitYearlyRules"
          ></v-checkbox>
        </div>
      </v-flex>
      <v-flex sm4>
        <v-list>
          <v-list-tile>
            <v-select
              v-bind:disabled="!select_by_week"
              v-bind:menu-props="{transition:'slide-y-transition'}"
              v-model="yearly.BYMONTH"
              hide-details
              solo
              flat
              single-line
              label="select month"
              v-bind:items="$store.state.RRULE.month"
            >
            </v-select>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex sm4>
        <v-list-tile>
          <v-select
            v-bind:disabled="!select_by_week"
            v-bind:menu-props="{transition:'slide-y-transition'}"
            v-model="yearly.BYMONTHDAY"
            hide-details
            solo
            flat
            single-line
            label="select day"
            v-bind:items="$store.state.RRULE.day"
          ></v-select>
        </v-list-tile>
      </v-flex>
    </v-layout>

    <v-layout align-center row fill-height wrap>
      <v-flex sm2 offset-sm1>
        <div>
          <v-checkbox
            v-model="select_by_day"
            label="On the"
            v-on:change="emitYearlyRules"
          ></v-checkbox>
        </div>
      </v-flex>
      <v-flex sm2>
        <v-list-tile>
          <v-select
            v-bind:disabled="!select_by_day"
            v-bind:menu-props="{transition:'slide-y-transition'}"
            v-model="yearly.BYSETPOS"
            label="nth"
            hide-details
            solo
            flat
            single-line
            v-bind:items="$store.state.RRULE.week"
          ></v-select>
        </v-list-tile>
      </v-flex>
      <v-flex sm3>
        <v-list-tile>
          <v-select
            v-bind:disabled="!select_by_day"
            v-bind:menu-props="{transition:'slide-y-transition'}"
            v-model="yearly.BYDAY"
            label="select weekday"
            hide-details
            solo
            flat
            single-line
            v-bind:items="$store.state.RRULE.weekday"
          ></v-select>
        </v-list-tile>
      </v-flex>
      <v-flex sm1>
        <div class="font-weight-black">of</div>
      </v-flex>
      <v-flex sm3>
        <v-list-tile>
          <v-select
            v-bind:disabled="!select_by_day"
            v-bind:menu-props="{transition:'slide-y-transition'}"
            v-model="yearly.BYMONTH"
            label="which month"
            hide-details
            solo
            flat
            single-line
            v-bind:items="$store.state.RRULE.month"
          ></v-select>
        </v-list-tile>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'rrlueByYear',
  data () {
    return {
      default_select: false,
      yearly: {
        FREQ: 'YEARLY',
        BYSETPOS: '1',
        BYDAY: 'MO',
        BYMONTH: '1',
        BYMONTHDAY: '1'
      }
    }
  },
  computed: {
    select_by_day: {
      get: function () {
        return !this.default_select
      },
      set: function () {
        this.default_select = !this.default_select
      }
    },
    select_by_week: {
      get: function () {
        return this.default_select
      },
      set: function () {
        this.default_select = !this.default_select
      }
    }
  },
  watch: {
    yearly: {
      handler: function () {
        this.emitYearlyRules()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    emitYearlyRules: function () {
      let yearlyRule
      if (this.default_select) {
        yearlyRule = _.pick(this.yearly, ['FREQ', 'BYMONTH', 'BYMONTHDAY'])
      } else {
        yearlyRule = _.pick(this.yearly, ['FREQ', 'BYMONTH', 'BYSETPOS', 'BYDAY'])
      }
      this.$store.commit('CHANGE_RRULE_STRINGS', yearlyRule)
    }
  }
}
</script>

<style scoped>

</style>
