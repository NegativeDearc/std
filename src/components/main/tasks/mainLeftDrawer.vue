<template>
  <v-navigation-drawer
    id="left"
    mobile-break-point="960"
    left
    fixed
    app
    width="260"
    v-bind:value="$store.state.LEFT_DRAWER"
    v-model="$store.state.LEFT_DRAWER"
  >
    <v-card-text>
      <v-list>
        <v-card flat class="transparent">
          <v-layout align-center justify-end column fill-height>
            <div class="display-2 grey--text">
              <span class="green--text">STD</span>
            </div>
            <div class="body-2 grey--text">
              build with <v-icon color="red" size="14">mdi-heart</v-icon>
              made by <span><v-icon size="14" color="yellow">mdi-language-javascript</v-icon></span> + <span><v-icon size="14" color="blue">mdi-language-python</v-icon></span>
            </div>
            <v-card-actions>
            </v-card-actions>
          </v-layout>
        </v-card>
        <v-divider></v-divider>
        <v-container>
          <v-layout column>
            <v-flex>
              <div class="grey--text subheading font-weight-thin">{{ new Date() | moment('YYYY') }}</div>
            </v-flex>
            <v-flex>
              <div class="blue--text display-3 font-weight-black">{{ new Date()| moment('DD') }}</div>
            </v-flex>
            <v-flex>
              <div class="grey--text body-2">{{ new Date()| moment('MMMM, ddd, WW') }}</div>
            </v-flex>
          </v-layout>
        </v-container>
        <v-list-tile
          to="/v2/expired"
        >
          <v-list-tile-action>
            <v-icon color="red">info</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ $t('expired_task') }}</v-list-tile-title>
          <v-list-tile-action>
            <v-subheader>{{ $store.getters.GET_EXPIRED_TASKS_COUNT }}</v-subheader>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile
          to="/v2/this_week"
        >
          <v-list-tile-action>
            <v-icon color="yellow">wb_sunny</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ $t('this_week') }}</v-list-tile-title>
          <v-list-tile-action>
            <v-subheader>{{ $store.getters.GET_THIS_WEEK_TASKS_COUNT }}</v-subheader>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile to="/v2/later">
          <v-list-tile-action>
            <v-icon color="orange">watch_later</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ $t('further') }}</v-list-tile-title>
          <v-list-tile-action>
            <v-subheader>{{ $store.getters.GET_TASKS_LATER_COUNT }}</v-subheader>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile to="/v2/finished">
          <v-list-tile-action>
            <v-icon color="cyan">assignment_turned_in</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ $t('finished') }}</v-list-tile-title>
          <v-list-tile-action>
            <v-subheader>{{ $store.getters.GET_TASKS_FINISHED_COUNT > 5000 ? '5000+' : $store.getters.GET_TASKS_FINISHED_COUNT }}</v-subheader>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile to="/v2/private">
          <v-list-tile-action>
            <v-icon color="grey">lock</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ $t('personalTask') }}</v-list-tile-title>
          <v-list-tile-action>
            <v-subheader></v-subheader>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile to="/v2/favorite">
          <v-list-tile-action>
            <v-icon color="pink">favorite</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ $t('favorite') }}</v-list-tile-title>
          <v-list-tile-action>
            <v-subheader>{{ $store.getters.GET_TASKS_FAVORITE_COUNT }}</v-subheader>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile to="/v2/teams">
          <v-list-tile-action>
            <v-icon color="purple">mdi-account-multiple</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ $t('team_status') }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile to="/v2/dashboard">
          <v-list-tile-action>
            <v-icon color="green">dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ $t('dashboard') }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile to="/v2/settings">
          <v-list-tile-action>
            <v-icon color="indigo">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ $t('setting') }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-card-text>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'mainLeftDrawer'
}
</script>

<style scoped>
#left {
  font-family:  "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
}
</style>
