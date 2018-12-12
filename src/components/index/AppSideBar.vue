<template>
  <v-navigation-drawer
    app
    v-model="$store.state.IF_DRAWER"
    left
    temporary
  >
    <v-list>
      <v-card flat>
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
      <v-list-tile to="/">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>{{ $t('home') }}</v-list-tile-title>
      </v-list-tile>
      <v-list-group
        prepend-icon="account_circle"
        value="true"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>{{ $t('users') }}</v-list-tile-title>
        </v-list-tile>

        <v-list>
          <v-list-tile
            v-for="item in admins"
            v-bind:key="item.id"
            v-bind:to="item.link"
          >
            <v-list-tile-action>
              <v-icon></v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-list-group>

      <v-list-group
        prepend-icon="mdi-bug"
        value="true"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>{{ $t('lab') }}<sup><span class="red--text">beta</span></sup></v-list-tile-title>
        </v-list-tile>

        <v-list>
          <v-list-tile
            v-for="item in labs"
            v-bind:key="item.id"
            v-bind:to="item.link"
          >
            <v-list-tile-action>
              <v-icon></v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppSideBar',
  data: () => ({
    admins: [
      { name: '修改密码', icon: 'people_outline', link: '/password' },
      { name: '工厂仪表盘', icon: 'dashboard', link: '/dashboard' }
    ],
    labs: [
      { name: '日历', icon: '', link: '/lab/picker' }
    ]
  })
}
</script>

<style scoped>

</style>
