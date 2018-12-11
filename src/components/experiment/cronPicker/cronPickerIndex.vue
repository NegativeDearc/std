<template>
  <v-container grid-list-sm grid-list-md grid-list-lg>
    <v-layout>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">频率</div>
          <v-container>
            <v-select
              outline
              label="频率"
              v-bind:items="frequency"
            ></v-select>
          </v-container>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <div slot="header">每</div>
          <v-container>
            <v-select
              outline
              label="频率"
              v-bind:items="frequency"
            ></v-select>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-layout>
    <v-layout>
      <v-flex sm6>
        <v-select
          solo
          label="频率"
          v-bind:items="frequency"
        ></v-select>
      </v-flex>
      <v-flex sm6>
        <v-select
          solo
          label="每"
          v-bind:items="frequency"
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'cronPickerIndex',
  data () {
    return {
      selectDateClass: false,
      selectedDate: [],
      frequency: [
        { text: '每天', value: 'day' },
        { text: '每周', value: 'week' },
        { text: '每月', value: 'month' },
        { text: '每年', value: 'year' }
      ]
    }
  },
  methods: {
    goBack: function () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
