<template>
  <v-card>
    <v-layout>
      <v-flex offset-xs4 xs2>
        <v-layout align-center justify-center column fill-height>
          <v-btn block flat color="red"><v-icon>keyboard_arrow_up</v-icon></v-btn>
          <div>
            <span outline class="display-4 grey--text">11</span>
          </div>
          <v-btn block flat><v-icon>keyboard_arrow_down</v-icon></v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs2>
        <v-layout align-center justify-center column fill-height>
          <v-btn block flat color="red"><v-icon>keyboard_arrow_up</v-icon></v-btn>
          <div><span outline class="display-4 grey--text">周</span></div>
          <v-btn block flat><v-icon>keyboard_arrow_down</v-icon></v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'cronNumberSelector'
}
</script>

<style scoped>

</style>
