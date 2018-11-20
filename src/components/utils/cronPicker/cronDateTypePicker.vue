<template>
  <v-container>
    <v-layout align-center justify-center column fill-height>
      <div>
        <v-btn icon flat v-bind:disabled="index >= dateType.length - 1" color="blue" v-on:click="increase">
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
      </div>
      <div>
        <span class="body-1 grey--text">{{ dateType[index + 1] || '无' }}</span>
        <div class="display-2" style="border: 2px solid grey; border-radius: 5px; width: 80px">{{ dateType[index] }}</div>
        <span class="body-1 grey--text" color="grey--lighten">{{ dateType[index - 1] || '无'  }}</span>
      </div>
      <div>
        <v-btn icon flat v-bind:disabled="index <= 0" color="blue" v-on:click="decrease">
          <v-icon>keyboard_arrow_down</v-icon>
        </v-btn>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import CronDayPicker from './cronDayPicker'

export default {
  name: 'cronDateTypePicker',
  components: { CronDayPicker },
  data () {
    return {
      // dateType: ['周', '月', '年'],
      dateType: ['周', '月'],
      index: 0,
      numberMax: 24
    }
  },
  methods: {
    increase: function () {
      this.index++
      this.$emit('date-type-change', this.index)// 顺序不要搞错
    },
    decrease: function () {
      this.index--
      this.$emit('date-type-change', this.index)
    }
  }
}
</script>

<style scoped>

</style>
