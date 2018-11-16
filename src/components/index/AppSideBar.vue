<template>
  <v-navigation-drawer
    app
    v-model="$store.state.IF_DRAWER"
    left
    temporary
  >
    <v-list>
      <v-list-tile to="/">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>主页</v-list-tile-title>
      </v-list-tile>

      <v-list-group
        prepend-icon="account_circle"
        value="true"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>用户</v-list-tile-title>
        </v-list-tile>

        <v-list-group
          no-action
          sub-group
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>管理</v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            v-for="item in admins"
            v-bind:key="item.id"
            v-bind:to="item.link"
          >
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-list-group
          sub-group
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Actions</v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            v-for="(crud, i) in cruds"
            :key="i"
          >
            <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="crud[1]"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
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
      { name: '工厂仪表盘', icon: 'dashboard', link: '/dash' }
    ],
    cruds: [
      ['Create', 'add'],
      ['Read', 'insert_drive_file'],
      ['Update', 'update'],
      ['Delete', 'delete']
    ]
  })
}
</script>

<style scoped>

</style>
