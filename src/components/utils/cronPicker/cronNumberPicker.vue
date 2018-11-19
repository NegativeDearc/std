<template>
  <v-container>
    <v-layout align-center justify-center column fill-height>
      <div>
        <v-btn icon flat v-bind:disabled="number === numberMax" color="blue" v-on:click="increase">
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
      </div>
      <div>
        <span class="body-1 grey--text">{{ number + 1 }}</span>
        <div class="display-2" style="border: 2px solid grey; border-radius: 5px; width: 80px;">{{ number }}</div>
        <span class="body-1 grey--text" color="grey--lighten">{{ number - 1 }}</span>
      </div>
      <div>
        <v-btn icon flat v-bind:disabled="number === numberMin" color="blue" v-on:click="decrease">
          <v-icon>keyboard_arrow_down</v-icon>
        </v-btn>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'cronNumberPicker',
  data () {
    return {
      numberMin: 1,
      number: 1,
      numberMax: 24
    }
  },
  methods: {
    increase: function () {
      this.number++
      this.$emit('number-change', this.number)// 注意顺序不要搞错
    },
    decrease: function () {
      this.number--
      this.$emit('number-change', this.number)
    }
  },
  mounted: function () {
    this.$emit('number-change', this.number)
  }
}
</script>

<style scoped>

</style>
