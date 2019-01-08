<template>
  <v-card>
    <v-toolbar
      dense
      card
    >
      <v-toolbar-title>
        <span class="subheading">Recurrence Rules Picker(RRP)</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-card flat>
      <v-card flat>
        <v-container fluid>
          <v-layout align-center justify-start row fill-height>
            <v-flex sm2>
              <div class="font-weight-black">Repeat</div>
            </v-flex>
            <v-flex sm10>
              <v-list>
                <v-list-tile>
                  <v-select
                    v-bind:menu-props="{transition:'slide-y-transition'}"
                    hide-details
                    solo
                    flat
                    single-line
                    label="select frequency"
                    v-bind:items="$store.state.RRULE.frequency"
                    v-model="frequency"
                  >
                  </v-select>
                </v-list-tile>
              </v-list>
            </v-flex>
          </v-layout>

          <component v-bind:is="currentView"></component>
        </v-container>
      </v-card>
      <v-divider></v-divider>
      <v-card flat class="font-weight-bold">
        <v-container fluid>
          <v-layout align-center justify-start row fill-height>
            <v-flex sm2>
              <div class="font-weight-black">End</div>
            </v-flex>
            <v-flex sm4>
              <v-list-tile>
                <v-select
                  hide-details
                  solo
                  flat
                  single-line
                  v-bind:menu-props="{transition:'slide-y-transition'}"
                  v-bind:items="['Never', 'After', 'On Date']"
                  v-on:change="end"
                  v-model="until"
                ></v-select>
              </v-list-tile>
            </v-flex>
            <transition>
              <v-flex sm4 v-if="until === 'After'">
                <v-text-field
                  v-on:input="end"
                  label="executions"
                  outline
                  v-model="count"
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex sm4 v-if="until === 'On Date'">
                <v-menu
                  ref="date_pick_menu"
                  :close-on-content-click="false"
                  v-model="date_pick_menu"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    v-model="date"
                    slot="activator"
                    hint="select end date"
                    persistent-hint
                    prepend-icon="event"
                  ></v-text-field>
                  <v-date-picker
                    v-model="date"
                    no-title @input="date_pick_menu = false"
                    v-on:change="end"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </transition>
          </v-layout>
        </v-container>
      </v-card>
      <v-divider></v-divider>
      <v-card flat>
        <v-toolbar card dense>
          <v-toolbar-title>
            <span class="subheading">Rules</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
          <v-layout>
            <v-flex>
              <div>{{ $store.state.RRULE_STRING }}</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-card>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat outline>Confirm</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import rruleByDay from './rrlueByDay'
import rruleByWeek from './rruleByWeek'
import rruleByMonth from './rruleByMonth'
import rrlueByYear from './rrlueByYear'

export default {
  name: 'rrluePicker',
  computed: {
    currentView: function () {
      switch (this.frequency) {
        case '1':
          return rruleByDay
        case '2':
          return rruleByWeek
        case '3':
          return rruleByMonth
        case '4':
          return rrlueByYear
      }
    }
  },
  data () {
    return {
      date_pick_menu: false,
      date: null,
      count: null,
      frequency: '2',
      until: 'Never'
    }
  },
  methods: {
    end: function () {
      switch (this.until) {
        case 'Never':
          this.$store.commit('REMOVE_RRULE_END')
          break
        case 'After':
          this.$store.commit('ADD_RRULE_END', { type: 'count', value: this.count })
          break
        case 'On Date':
          if (this.date) {
            this.$store.commit('ADD_RRULE_END', { type: 'until', value: new Date(this.date).toISOString() })
          }
      }
    }
  }
}
</script>

<style scoped>

</style>
