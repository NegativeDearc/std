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
      <v-card>
        <v-toolbar dark color="indigo">
          <v-btn icon dark v-on:click.native="settings = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>设置</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat v-on:click.native="settings = false">保存</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container fluid>
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="black">brightness_4</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>应用深黑模式</v-list-tile-title>
                  <v-list-tile-sub-title>使你变得更酷</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-switch
                    v-model="$store.state.IFDARK"
                    color="red"
                    hide-details
                  ></v-switch>
                </v-list-tile-action>

              </v-list-tile>
              <v-divider></v-divider>

              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="green">visibility</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>显示已完成项</v-list-tile-title>
                  <v-list-tile-sub-title>使画面更加简洁</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-switch
                    color="green"
                    model="$store.state.SHOW_ALL"
                    v-on:change="showAll"
                  ></v-switch>
                </v-list-tile-action>

              </v-list-tile>
              <v-divider></v-divider>

              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="blue">looks_one</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>项目排序原则</v-list-tile-title>
                  <v-list-tile-sub-title>使顺序更贴近习惯</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-menu offset-y left>
                    <v-btn
                      slot="activator"
                      color="primary"
                    >
                      截止日期
                    </v-btn>
                    <v-list tile>
                      <v-list-tile>
                        <v-list-tile-title>截止日期</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-list-tile-action>

              </v-list-tile>
              <v-divider></v-divider>
            </v-list>
          </v-container>
        <div style="flex: 1 1 auto;"></div>
        <v-footer></v-footer>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'AppHeaderSettings',
  data () {
    return {
      settings: false,
      sortBy: [
        { text: 'list', callback: () => console.log('list') },
        { text: 'favorite', callback: () => console.log('favorite') },
        { text: 'delete', callback: () => console.log('delete') }
      ]
    }
  },
  methods: {
    showAll: function () {
      this.$store.commit('HIDE_NOT_DONE_TASK')
      console.log('=> ', this.$store.state.SHOW_ALL)
    }
  }
}
</script>

<style scoped>

</style>
