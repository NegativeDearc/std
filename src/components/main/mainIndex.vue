<template>
  <v-app
    id="main"
    v-bind:dark="$store.state.IS_DARK"
  >
    <v-toolbar
      app
      flat
      prominent
    >
      <v-toolbar-side-icon
        v-on:click="$store.commit('UNDRAWER_LEFT')"
      ></v-toolbar-side-icon>
      <v-text-field
        class="pl-2 pr-3"
        append-icon="keyboard_return"
        solo
        flat
        single-line
        hide-details
        v-model="taskTitle"
        placeholder="Type anything to do..."
        v-on:keyup.enter="newTask"
        v-on:keyup.esc="emptyTask"
        v-if="this.$route.name in {favorite: '', thisWeek: '', expired: '', later: '', finished: ''}"
      >
      </v-text-field>
      <v-spacer v-else></v-spacer>
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
    <router-view name="left"></router-view>
    <router-view name="main"></router-view>
    <router-view name="right"></router-view>
  </v-app>
</template>

<script>
import MainLeftDrawer from './tasks/mainLeftDrawer'
import MailRightDrawer from './tasks/mainRightDrawer'
import MainItems from './tasks/mainItems'

export default {
  name: 'mainContent',
  components: {MainItems, MailRightDrawer, MainLeftDrawer},
  data () {
    return {
      taskTitle: null
    }
  },
  methods: {
    newTask: function () {
      this.$store.dispatch('CREATE_NEW_TASK', { taskTitle: this.taskTitle })
        .then(() => Object.assign(this.$data, this.$options.data()))
    },
    emptyTask: function () {
      this.taskTitle = null
    }
  }
}
</script>

<style>
  #main {
    font-family:  "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;  }
</style>
