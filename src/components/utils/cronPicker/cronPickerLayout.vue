<template>
  <v-container>
    <v-card flat v-bind:dark="$store.state.IS_DARK">
      <v-card-text>
        <v-layout align-center justify-center column fill-height>
          <slot name="1"></slot>
        </v-layout>
        <v-layout align-center justify-center column fill-height v-bind:style="ifShowBorder">
          <slot name="2"></slot>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    showBorder: { type: Boolean }
  },
  computed: {
    ifShowBorder: function () {
      if (this.showBorder) {
        return 'border: 3px solid grey; border-radius: 10px'
      }
    }
  },
  name: 'cronPickerLayout'
}
</script>

<style scoped>

</style>
