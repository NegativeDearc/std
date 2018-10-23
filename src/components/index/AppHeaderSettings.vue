<template>
  <v-layout>
    <v-btn flat icon dark color="indigo" v-on:click.stop="settings = true">
      <v-icon>settings</v-icon>
    </v-btn>

    <v-dialog
      v-model="settings"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar dark color="indigo">
          <v-btn icon dark v-on:click.native="settings = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat v-on:click.native="settings = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container fluid>
            <v-layout row wrap
                      align-baseline="true"
            >
              <v-flex xs10 sm10 md10>
                <v-subheader>APPLY FOR DARK MODEL</v-subheader>
              </v-flex>
              <v-flex xs2 sm2 md2>
                <v-switch
                  v-model="$store.state.IFDARK"
                  color="red"
                  hide-details
                ></v-switch>
              </v-flex>
              <v-flex xs10 sm10 md10>
                <v-subheader>SHOW ITEMS HAD DONE</v-subheader>
              </v-flex>
              <v-flex xs2 sm2 md2>
                <v-switch
                  color="green"
                  hide-details
                  v-model="$store.state.SHOWALL"
                  v-on:click="$store.commit('HIDE_NOT_DONE_TASK')"
                ></v-switch>
              </v-flex>

              <v-flex xs10 sm10 md10>
                <v-subheader>SORT BY</v-subheader>
              </v-flex>
              <v-flex xs2 sm2 md2>
              </v-flex>
            </v-layout>

          </v-container>
        </v-card-text>
        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'AppHeaderSettings',
  data () {
    return {
      settings: false
    }
  }
}
</script>

<style scoped>

</style>
