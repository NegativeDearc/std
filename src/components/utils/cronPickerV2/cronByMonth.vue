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
              v-model="monthly.DAY_OF_MONTH"
              v-bind:items="$store.state.CRON_RULE.day"
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
              v-model="monthly.WEEK"
              v-bind:items="$store.state.CRON_RULE.week"
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
              v-model="monthly.DAY_OF_WEEK"
              v-bind:items="$store.state.CRON_RULE.weekday.slice(0, 7)"
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
          v-model="interval"
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
export default {
  name: 'cronByMonth',
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
      interval: '1',
      default_select: false,
      monthly: {
        'DAY_OF_MONTH': '1',
        'WEEK': '1',
        'DAY_OF_WEEK': 'MON'
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
    },
    interval: function () {
      this.emitMonthlyRules()
    }
  },
  methods: {
    emitMonthlyRules: function () {
      let _dict

      let monthInterval
      this.interval === ''
        ? monthInterval = '*'
        : monthInterval = '*/' + this.interval

      if (!this.default_select) {
        _dict = {
          'DAY_OF_MONTH': this.monthly.DAY_OF_MONTH,
          'MONTH': monthInterval,
          'DAY_OF_WEEK': '*'
        }
      } else {
        _dict = {
          'DAY_OF_MONTH': '*',
          'MONTH': monthInterval,
          'DAY_OF_WEEK': this.monthly.DAY_OF_WEEK + '#' + this.monthly.WEEK
        }
      }
      this.$store.commit('CHANGE_CRON_DICT', _dict)
    }
  }
}
</script>

<style scoped>

</style>
