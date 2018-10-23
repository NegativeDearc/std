<template>
  <v-layout>
    <v-btn flat icon color="purple red--after" v-on:click.stop="dialog = true">
      <v-icon>perm_identity</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card>
        <v-toolbar dark color="purple red--after">
          <v-btn icon dark v-on:click.native="dialog = false">
            <v-icon dark>close</v-icon>
          </v-btn>
          <v-toolbar-title>仪表盘</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <span class="display-1">Welcome {{ $store.getters.GET_USER_ID }}</span>

          </v-container>
          <v-divider></v-divider>
          <v-container>
            <v-progress-circular
            :rotate="360"
            :size="150"
            :width="15"
            :value="75"
            color="red"
          >On Time Finished
          </v-progress-circular>
            <v-progress-circular
              :rotate="360"
              :size="150"
              :width="15"
              :value="50"
              color="teal"
            >Weekly Progress
            </v-progress-circular>
            <v-progress-circular
              :rotate="360"
              :size="150"
              :width="15"
              :value="40"
              color="blue"
            >On-going Rate
            </v-progress-circular>
          </v-container>
          <v-divider></v-divider>
          <v-container></v-container>
          <v-card-actions>
            <v-btn block depressed color="real" dark v-on:click="logout">
              <v-icon>power_settings_new</v-icon>
              &nbsp;LOG OUT
            </v-btn>
          </v-card-actions>
        </v-card-text>
        <div style="flex: 1 1 auto;"></div>
        <v-footer></v-footer>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'AppHeaderDash',
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('LOGOUT')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
</style>
