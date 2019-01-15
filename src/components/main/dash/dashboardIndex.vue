<template>
  <v-content app>
    <v-card height="100%" flat>
      <v-tabs
        color="transparent"
        fixed-tabs
        v-model="model"
        centered
        slider-color="yellow"
      >
        <v-tab v-bind:href="`#tab-1`">{{ $t('mu_1') }}</v-tab>
        <v-tab v-bind:href="`#tab-2`">{{ $t('mu_2') }}</v-tab>
        <v-tab v-bind:href="`#tab-3`">{{ $t('central') }}</v-tab>
      </v-tabs>
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
    </v-card>
  </v-content>
</template>

<script>
import dashCard from './dashCard'
import dashList from './dashList'

export default {
  name: 'V2Dashboard',
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
      this.$router.go(0)
    },
    goBack: function () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
