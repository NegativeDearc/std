<template>
  <v-layout>
    <v-card flat>
      <v-card-title>
        <cronNumberSelector/>
        <v-item-group align="left" v-model="selectedDate">
          <v-btn icon v-for="n in 31" v-bind:key="n" v-on:click="selectDate">{{ n }}</v-btn>
        </v-item-group>
      </v-card-title>
    </v-card>
  </v-layout>
</template>

<script>
import cronNumberSelector from './cronNumberSelector'

export default {
  name: 'cronPickerIndex',
  components: { cronNumberSelector },
  data () {
    return {
      selectDateClass: false,
      selectedDate: []
    }
  },
  methods: {
    goBack: function () {
      this.$router.back()
    },
    selectDate: function () {
    }
  }
}
</script>

<style scoped>

</style>
