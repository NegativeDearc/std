<template>
  <div>
    <v-layout align-center row fill-height wrap>
      <v-flex sm2 offset-sm1>
        <div>
          <v-checkbox
            v-model="select_by_week"
            label="On"
          ></v-checkbox>
        </div>
      </v-flex>
      <v-flex sm4>
        <v-list>
          <v-list-tile>
            <v-select
              v-bind:disabled="!select_by_week"
              v-bind:menu-props="{transition:'slide-y-transition'}"
              v-model="year.BYMONTH"
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
            v-model="year.BYMONTHDAY"
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
          ></v-checkbox>
        </div>
      </v-flex>
      <v-flex sm2>
        <v-list-tile>
          <v-select
            v-bind:disabled="!select_by_day"
            v-bind:menu-props="{transition:'slide-y-transition'}"
            v-model="year.BYSETPOS"
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
            v-model="year.BYDAY"
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
            v-model="year.BYMONTH"
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
export default {
  name: 'rrlueByYear',
  data () {
    return {
      'default_select': false,
      'year': {
        'BYSETPOS': '1',
        'BYDAY': 'MO',
        'BYMONTH': '1',
        'BYMONTHDAY': '1'
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
    year: {
      handler: function () {
        if (this.default_select) {} else {}
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
