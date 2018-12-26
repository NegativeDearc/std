<template>
  <v-navigation-drawer
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
          <v-avatar size="60">
            <v-img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairBun&accessoriesType=Wayfarers&hairColor=Red&facialHairType=MoustacheFancy&facialHairColor=BlondeGolden&clotheType=ShirtCrewNeck&clotheColor=PastelYellow&eyeType=Squint&eyebrowType=UnibrowNatural&mouthType=Grimace&skinColor=Tanned"></v-img>
          </v-avatar>
          <div class="body-1 pt-1"><p>{{ $store.state.USER.USER_NAME }}</p></div>
        </v-container>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="yellow">wb_sunny</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ $t('today') }}</v-list-tile-title>
          <v-list-tile-action>
            <v-subheader>11</v-subheader>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="orange">watch_later</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ $t('further') }}</v-list-tile-title>
          <v-list-tile-action>
            <v-subheader>22</v-subheader>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="grey">lock</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>私人空间</v-list-tile-title>
          <v-list-tile-action>
            <v-subheader>22</v-subheader>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile v-on:click="console.log(111)">
          <v-list-tile-action>
            <v-icon color="pink">favorite</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>我的收藏</v-list-tile-title>
          <v-list-tile-action>
            <v-subheader>33</v-subheader>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile v-on:click="console.log(111)">
          <v-list-tile-action>
            <v-icon color="green">dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ $t('dashboard') }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-on:click="console.log(111)">
          <v-list-tile-action>
            <v-icon color="purple">mdi-account-multiple</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ $t('team_status') }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-on:click="console.log(111)">
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

</style>
