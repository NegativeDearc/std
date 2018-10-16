<template>
  <v-content app>
    <v-container fluid grid-list-lg>
      <v-layout>
        <v-flex xs12 sm12 md6 offset-md3>
          <p style="font-family: 'American Typewriter',monospace">Just Do It</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm12 md6 offset-md3>
          <v-card>
            <v-subheader>正在进行中</v-subheader>

            <v-card-text class="grey lighten-5">
              <v-list
                subheader
                two-line
              >

                <v-list-tile v-on:click="a">
                  <v-list-tile-action>
                    <v-checkbox v-model="notifications"></v-checkbox>
                  </v-list-tile-action>

                  <v-list-tile-content v-on:click="notifications = !notifications">
                    <v-list-tile-title>Notifications</v-list-tile-title>
                    <v-list-tile-sub-title>Allow notifications</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>

                <v-list-tile v-on:click="a">
                  <v-list-tile-action>
                    <v-checkbox v-model="sound"></v-checkbox>
                  </v-list-tile-action>

                  <v-list-tile-content v-on:click="sound = !sound">
                    <v-list-tile-title>Sound</v-list-tile-title>
                    <v-list-tile-sub-title>Hangouts message</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>

                <v-list-tile v-on:click="a">
                  <v-list-tile-action>
                    <v-checkbox v-model="video"></v-checkbox>
                  </v-list-tile-action>

                  <v-list-tile-content v-on:click="video = !video">
                    <v-list-tile-title>Video sounds</v-list-tile-title>
                    <v-list-tile-sub-title>Hangouts video call</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>

                <v-list-tile v-on:click="a">
                  <v-list-tile-action>
                    <v-checkbox v-model="video"></v-checkbox>
                  </v-list-tile-action>

                  <v-list-tile-content v-on:click="video = !video">
                    <v-list-tile-title>Video sounds</v-list-tile-title>
                    <v-list-tile-sub-title>Hangouts video call</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>

                <v-list-tile v-on:click="a">
                  <v-list-tile-action>
                    <v-checkbox v-model="video"></v-checkbox>
                  </v-list-tile-action>

                  <v-list-tile-content v-on:click="video = !video">
                    <v-list-tile-title>Video sounds</v-list-tile-title>
                    <v-list-tile-sub-title>Hangouts video call</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>

                <v-list-tile v-on:click="a">
                  <v-list-tile-action>
                    <v-checkbox v-model="video"></v-checkbox>
                  </v-list-tile-action>

                  <v-list-tile-content v-on:click="video = !video">
                    <v-list-tile-title>Video sounds</v-list-tile-title>
                    <v-list-tile-sub-title>Hangouts video call</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>

                <v-list-tile v-on:click="a">
                  <v-list-tile-action>
                    <v-checkbox v-model="invites"></v-checkbox>
                  </v-list-tile-action>

                  <v-list-tile-content v-on:click="invites = !invites">
                    <v-list-tile-title>Invites</v-list-tile-title>
                    <v-list-tile-sub-title>Notify when receiving invites</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-list>
            </v-card-text>
            <v-card-text style="height: 10px; position: relative">
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'AppContent'
}
</script>

<style scoped>

</style>
