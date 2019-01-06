<template>
  <v-app id="main" v-bind:dark="$store.state.IS_DARK">
    <v-toolbar
      app
      flat
      prominent
    >
      <v-toolbar-side-icon
        v-on:click="$store.commit('UNDRAWER_LEFT')"
      ></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-menu v-bind:nudge-width="100">
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="item in [1,2,3,4]"
            :key="item"
          >
            <v-list-tile-title v-text="item"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <main-left-drawer></main-left-drawer>
    <mail-right-drawer></mail-right-drawer>
    <v-content app>
      <main-items></main-items>
    </v-content>
  </v-app>
</template>

<script>
import MainLeftDrawer from './mainLeftDrawer'
import MailRightDrawer from './mainRightDrawer'
import MainItems from './mainItems'

export default {
  name: 'mainContent',
  components: {MainItems, MailRightDrawer, MainLeftDrawer}
}
</script>

<style scoped>

</style>
