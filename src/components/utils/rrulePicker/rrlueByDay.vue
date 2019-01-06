<template>
  <div>
    <v-layout align-end row fill-height wrap>
      <v-flex offset-sm1 sm1>
        <span>every</span>
      </v-flex>
      <v-flex sm2>
        <v-text-field
          mask="##"
          hide-details
          single-line
        ></v-text-field>
      </v-flex>
      <v-flex sm1>
        <span>
          day(s)
        </span>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'rrlueByDay'
}
</script>

<style scoped>

</style>
