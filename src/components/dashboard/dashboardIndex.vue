<template>
  <v-app app v-bind:dark="$store.state.IS_DARK">
    <v-toolbar
      color="green"
      dark
      tabs
      app
    >
      <v-btn icon v-on:click="goBack">
        <v-icon>chevron_left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ $t('plant_dashboard') }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon v-on:click="refresh">
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-tabs
        fixed-tabs
        slot="extension"
        v-model="model"
        centered
        color="green"
        slider-color="yellow"
      >
        <v-tab v-bind:href="`#tab-1`">{{ $t('mu_1') }}</v-tab>
        <v-tab v-bind:href="`#tab-2`">{{ $t('mu_2') }}</v-tab>
        <v-tab v-bind:href="`#tab-3`">{{ $t('central') }}</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-content app>
      <v-tabs-items v-model="model">
        <v-tab-item v-bind:value="`tab-1`">
          <v-card flat height="100%">
            <v-container grid-list-md text-xs-center fluid>
              <v-layout row wrap>
                <v-flex sm3 md3 xs3 v-for="(segment, i) in mu1" v-bind:key="i">
                  <dashCard v-bind:segment="segment" v-on:show-segment-detail="getSegmentDetail"></dashCard>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item v-bind:value="`tab-2`">
          <v-card flat height="100%">
            <v-container grid-list-md text-xs-center fluid>
              <v-layout row wrap>
                <v-flex sm3 md3 xs3 v-for="(segment, i) in mu2" v-bind:key="i">
                  <dashCard v-bind:segment="segment" v-on:show-segment-detail="getSegmentDetail"></dashCard>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item v-bind:value="`tab-3`">
          <v-card flat height="100%">
            <v-container grid-list-md text-xs-center fluid>
              <v-layout row wrap>
                <v-flex sm3 md3 xs3 v-for="(segment, i) in central" v-bind:key="i">
                  <dashCard v-bind:segment="segment" v-on:show-segment-detail="getSegmentDetail"></dashCard>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-tab-item>
      </v-tabs-items>

      <dash-list v-bind:segment="this.segment" v-bind:task_detail="segment_detail"></dash-list>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import dashCard from './dashCard'
import dashList from './dashList'

export default {
  name: 'dashboardIndex',
  data () {
    return {
      model: 'tab-1',
      mu1: ['P11', 'P12', 'P14', 'P15'],
      mu2: ['P21', 'P22', 'P23', 'P24'],
      central: ['PV', 'PQ', 'PI', 'PL'],
      segment: '',
      segment_detail: {}
    }
  },
  components: { dashCard, dashList },
  watch: {
    segment: function () {
      if (this.segment !== '') {
        console.log('==> FETCHING DATA DETAIL OF', this.segment)
        this.axios.get('/dash/plant/detail/' + this.segment).then(data => {
          console.log(data.data)
          this.segment_detail = data.data
        })
      }
    }
  },
  methods: {
    getSegmentDetail: function (event) {
      console.log('==> GET SEGMENT DETAIL', event)
      this.segment = event
    },
    refresh: function () {
      console.log('refreshing this page')
    },
    goBack: function () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
