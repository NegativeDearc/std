<template>
  <v-container>
    <!--<v-layout align-center justify-center row fill-height v-if="index >= 2">-->
      <!--<v-checkbox-->
      <!--v-for="item in month"-->
      <!--v-bind:key="item.itemValue"-->
      <!--v-bind:label="item.itemText"-->
      <!--v-bind:value="item.itemValue"-->
      <!--v-model="month_index"-->
      <!--v-on:change="pickDate"-->
      <!--on-icon="check_circle_outline"-->
      <!--off-icon="panorama_fish_eye"-->
    <!--&gt;-->
      <!--</v-checkbox>-->
    <!--</v-layout>-->
    <!--<v-divider v-if="index >= 2"></v-divider>-->
    <v-layout v-if="index >=1" align-center justify-left row fill-height>
      <v-flex>
        <v-switch
          v-model="week_or_day"
          v-bind:label="week_or_day ? $t('week'): $t('date')"
          v-on:change="changeWeekOrDay"
        >
        </v-switch>
      </v-flex>
    </v-layout>

    <v-layout v-if="index >= 1 && !week_or_day">
      <v-flex>
        <v-autocomplete
          v-bind:label="$t('select_date')"
          box
          v-bind:items="new Array(31).fill('').map( (item, index) => index+1)"
          v-model="day"
          v-on:change="pickDate"
        ></v-autocomplete>
      </v-flex>
    </v-layout>

    <v-layout align-center justify-center row fill-height v-if="index >= 1">
      <v-checkbox
        v-if="week_or_day"
        v-for="item in week"
        v-bind:key="item.itemValue"
        v-bind:label="item.itemText"
        v-bind:value="item.itemValue"
        v-model="week_index"
        v-on:change="pickDate"
        on-icon="check_circle_outline"
        off-icon="panorama_fish_eye"
      ></v-checkbox>
    </v-layout>
    <v-divider v-if="index >= 1 && week_or_day"></v-divider>

    <v-layout align-center justify-center row fill-height v-if="index >= 0">
      <v-checkbox
        v-if="week_or_day"
        v-for="item in workday"
        v-bind:key="item.itemValue"
        v-bind:label="item.itemText"
        v-bind:value="item.itemValue"
        v-model="workday_index"
        v-on:change="pickDate"
        on-icon="check_circle_outline"
        off-icon="panorama_fish_eye"
      ></v-checkbox>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    index: { type: Number, required: true }
  },
  name: 'cronDayPicker',
  watch: {
    index: function () {
      // to fix week_index still show when change from month to week
      if (this.index === 0) {
        this.week_index = null
        let _week = this.week_index || ''
        let _form = {
          workday: (this.workday_index.sort().toString() || '1,2,3,4,5') + _week // 注意计算的优先级
        }
        this.week_or_day = true
        this.$emit('date-picked', _form)
      }
    }
  },
  data () {
    return {
      day: null,
      week_or_day: true,
      workday_index: [],
      week_index: '',
      // month_index: '',
      workday: [
        { 'itemValue': '1', 'itemText': '星期一', 'itemIcon': 'mdi-numeric-1-box' },
        { 'itemValue': '2', 'itemText': '星期二', 'itemIcon': 'mdi-numeric-2-box' },
        { 'itemValue': '3', 'itemText': '星期三', 'itemIcon': 'mdi-numeric-3-box' },
        { 'itemValue': '4', 'itemText': '星期四', 'itemIcon': 'mdi-numeric-4-box' },
        { 'itemValue': '5', 'itemText': '星期五', 'itemIcon': 'mdi-numeric-5-box' }
      ],
      week: [
        { 'itemValue': '#1', 'itemText': '第一个', 'itemIcon': 'mdi-numeric-1-box' },
        { 'itemValue': '#2', 'itemText': '第二个', 'itemIcon': 'mdi-numeric-2-box' },
        { 'itemValue': '#3', 'itemText': '第三个', 'itemIcon': 'mdi-numeric-3-box' },
        { 'itemValue': '#4', 'itemText': '第四个', 'itemIcon': 'mdi-numeric-4-box' }
      ],
      month: [
        { 'itemValue': '*/1', 'itemText': '每个月', 'itemIcon': 'mdi-numeric-1-box' },
        { 'itemValue': '*/2', 'itemText': '每二个月', 'itemIcon': 'mdi-numeric-2-box' },
        { 'itemValue': '*/3', 'itemText': '每季度', 'itemIcon': 'mdi-numeric-3-box' },
        { 'itemValue': '*/6', 'itemText': '每半年', 'itemIcon': 'mdi-numeric-4-box' }
      ]
    }
  },
  methods: {
    changeWeekOrDay: function () {
      console.log(this.week_or_day)
      if (this.week_or_day) {
        this.day = null
      } else {
        this.workday_index = []
        this.week_index = ''
      }
    },
    pickDate: function () {
      let _form
      let _week
      if (this.week_or_day === false) {
        _form = {
          workday: '*', // 注意计算的优先级
          // month: this.month_index || '*'
          day: this.day
        }
      } else {
        _week = this.week_index || ''
        _form = {
          workday: (this.workday_index.sort().toString() || '1,2,3,4,5') + _week // 注意计算的优先级
          // month: this.month_index || '*'
        }
      }
      console.log(_form)
      this.$emit('date-picked', _form)
    }
  },
  mounted: function () {
    this.pickDate()
  }
}
</script>

<style scoped>

</style>
