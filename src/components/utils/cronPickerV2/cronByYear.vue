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
              v-model="yearly.MONTH"
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
            v-model="yearly.DAY_OF_MONTH"
            hide-details
            solo
            flat
            single-line
            label="select day"
            v-bind:items="$store.state.CRON_RULE.day"
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
            v-model="yearly.WEEK_INDEX"
            label="nth"
            hide-details
            solo
            flat
            single-line
            v-bind:items="$store.state.CRON_RULE.week"
          ></v-select>
        </v-list-tile>
      </v-flex>
      <v-flex sm3>
        <v-list-tile>
          <v-select
            v-bind:disabled="!select_by_day"
            v-bind:menu-props="{transition:'slide-y-transition'}"
            v-model="yearly.DAY_OF_WEEK"
            label="select weekday"
            hide-details
            solo
            flat
            single-line
            v-bind:items="$store.state.CRON_RULE.weekday.slice(0, 7)"
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
            v-model="yearly.MONTH"
            label="which month"
            hide-details
            solo
            flat
            single-line
            v-bind:items="$store.state.CRON_RULE.month"
          ></v-select>
        </v-list-tile>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'cronByYear',
  data () {
    return {
      default_select: false,
      yearly: {
        'DAY_OF_MONTH': '1',
        'MONTH': '1',
        'DAY_OF_WEEK': 'MON',
        'WEEK_INDEX': '1'
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
      let _dict
      if (this.default_select) {
        _dict = {
          'DAY_OF_MONTH': this.yearly.DAY_OF_MONTH,
          'MONTH': this.yearly.MONTH,
          'DAY_OF_WEEK': '*'
        }
      } else {
        _dict = {
          'DAY_OF_MONTH': '*',
          'MONTH': this.yearly.MONTH,
          'DAY_OF_WEEK': this.yearly.DAY_OF_WEEK + '#' + this.yearly.WEEK_INDEX
        }
      }
      this.$store.commit('CHANGE_CRON_DICT', _dict)
    }
  }
}
</script>

<style scoped>

</style>
