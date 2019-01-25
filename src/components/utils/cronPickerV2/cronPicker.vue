<template>
  <div>
    <v-toolbar
      extended
      color="primary"
      dark
    >
      <v-toolbar-title>
        <span>Recurrence Rules Picker(RRP)</span>
      </v-toolbar-title>
      <v-tabs
        slot="extension"
        centered
        color="primary"
        slider-color="yellow"
        v-model="frequency"
      >
        <v-tab
          v-for="item in tabNames"
          v-bind:key="item.id"
          v-bind:value="`#tab-${item.id}`"
        >
          By {{ item.name }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items
      v-model="frequency"
    >
      <v-tab-item
        v-bind:value="frequency"
        v-bind:key="frequency"
      >
        <v-card flat tile>
          <v-container>
            <component v-bind:is="currentView"></component>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-card flat>
      <v-card flat>
        <v-toolbar
          dark
          card
          dense
          tile
          color="primary"
        >
          <v-toolbar-title>
            <span>Rules</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
          <v-layout>
            <v-flex>
              <!--<div>{{ $store.state.CRON_EXPRESSION }}</div>-->
              <div>{{ $store.getters.CRON_TO_STRING }}</div>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-on:click="emitRules"
            color="primary"
            flat
            outline
            round
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import cronByDay from './cronByDay'
import cronByWeek from './cronByWeek'
import cronByMonth from './cronByMonth'
import cronByYear from './cronByYear'

export default {
  name: 'cronPickerV2',
  computed: {
    currentView: function () {
      switch (this.frequency) {
        case 0:
          return cronByDay
        case 1:
          return cronByWeek
        case 2:
          return cronByMonth
        case 3:
          return cronByYear
      }
    }
  },
  data () {
    return {
      tabNames: [
        {id: '1', name: 'Day'},
        {id: '2', name: 'Week'},
        {id: '3', name: 'Month'},
        {id: '4', name: 'Year'}
      ],
      date_pick_menu: false,
      date: null,
      count: null,
      frequency: 1,
      until: null
    }
  },
  watch: {},
  methods: {
    emitRules: function () {
      // console.log('emitting cron changing', this.$store.getters.CRON_TO_STRING)
      this.$emit('cronChange', this.$store.getters.CRON_TO_STRING)
      // console.log('emitting closing')
      this.$emit('onClose')
    }
  },
  mounted: function () {}
}
</script>

<style scoped>

</style>
