<template>
  <v-card>
    <v-card-text>
      <v-layout align-center justify-space-around row fill-height>
        <v-btn icon class="green--text font-weight-black">{{ segment }}</v-btn>
        <div class="font-weight-thin">{{ new Date().toDateString() }}</div>
        <v-btn icon><v-icon color="red">trending_up</v-icon></v-btn>
      </v-layout>
      <v-divider></v-divider>
      <v-layout align-center justify-center fill-height>
        <div class="display-3 font-weight-thin">{{ finish_rate }}</div>
        <sup class="body-2 font-weight-black">%</sup>
      </v-layout>
      <div class="font-weight-thin">{{ $t('pass_seven_days_finish_rate') }}</div>
    </v-card-text>
    <v-footer align-center>
      <v-btn block flat v-on:click="getFinishRate(segment)">
        <v-icon>arrow_drop_down</v-icon>
      </v-btn>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  name: 'dashCard',
  props: {
    color: { type: String }, // to sync with segment value stream color
    segment: { type: String },
    trend: { type: String }
  },
  data () {
    return {
      finish_rate: '--'
    }
  },
  methods: {
    getFinishRate: function (segment) {
      console.log(segment)
      this.$emit('show-segment-detail', segment)
    }
  },
  mounted: function () {
    this.axios.get('/dash/plant/' + this.segment).then(data => {
      console.log(this.segment, data.data.finishRate)
      if (data.data.finishRate === null) {
        return false
      } else {
        this.finish_rate = data.data.finishRate
      }
    })
  }
}
</script>

<style scoped>

</style>
