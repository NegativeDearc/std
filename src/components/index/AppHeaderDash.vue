<template>
  <v-layout>
    <v-btn flat icon color="purple red--after" v-on:click.stop="getUserDash">
      <v-icon>insert_chart</v-icon>
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
          <v-toolbar-title>{{ $t('dashboard') }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text class="mb-4">
          <v-container>
            <v-layout>
              <v-flex xs2 md2>
                <v-avatar size="100">
                  <v-img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairBun&accessoriesType=Wayfarers&hairColor=Red&facialHairType=MoustacheFancy&facialHairColor=BlondeGolden&clotheType=ShirtCrewNeck&clotheColor=PastelYellow&eyeType=Squint&eyebrowType=UnibrowNatural&mouthType=Grimace&skinColor=Tanned"></v-img>
                </v-avatar>
                <div class="body-1 pt-4">{{ $store.getters.GET_USER_ID }}</div>
              </v-flex>
              <v-flex xs10 md10>
                <v-container row wrap>
                  <v-layout>
                    <v-flex xs4>
                      <v-card flat>
                        <div>
                          <div class="display-3 font-weight-black"><span class="green--text">{{ this.$store.state.USER_DASH.OTF }}</span></div>
                          <div class="body-2"><span class="grey--text">{{ $t('finish_on_time') }}</span></div>
                        </div>
                      </v-card>
                    </v-flex>
                    <v-divider
                      class="mx-3"
                      inset
                      vertical
                    ></v-divider>
                    <v-flex xs4>
                      <v-card flat>
                        <div>
                          <div class="display-3 font-weight-black"><span class="yellow--text">{{ this.$store.state.USER_DASH.IP }}</span></div>
                          <div class="body-2"><span class="grey--text">{{ $t('in_progress') }}</span></div>
                        </div>
                      </v-card>
                    </v-flex>
                    <v-divider
                      class="mx-3"
                      inset
                      vertical
                    ></v-divider>
                    <v-flex xs4>
                      <v-card flat>
                        <div>
                          <div class="display-3 font-weight-black"><span class="red--text">{{ this.$store.state.USER_DASH.D }}</span></div>
                          <div class="body-2"><span class="grey--text">{{ $t('finish_overdue') }}</span></div>
                        </div>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-container>
          <v-divider class="mx-3"></v-divider>

          <v-subheader>{{ $t('team_status') }}</v-subheader>
          <v-layout align-start justify-start column fill-height>
            <v-flex v-for="(v, k) in $store.state.EMPLOYEE_DASH" v-bind:key="v.id" v-if="$store.state.EMPLOYEE_DASH" sm12 md12 xs12>
              <v-subheader>{{ k }}</v-subheader>
              <v-list-tile class="text-lg-left text-sm-left text-xs-left">
                <v-item-group>
                  <v-menu v-for="item in v" v-bind:key="item.id" top>
                    <v-btn flat icon slot="activator">
                      <v-icon color="red" v-if="item.isDone === false && item.isDelay === true">mdi-circle-slice-1</v-icon>
                      <v-icon color="blue" v-else-if="item.isDone === false && item.isDelay === false">mdi-circle-slice-1</v-icon>
                      <v-icon color="yellow" v-else-if="item.isDone === true && item.isDelay === true">mdi-check-circle-outline</v-icon>
                      <v-icon color="green" v-else-if="item.isDone === true && item.isDelay === false">mdi-check-circle-outline</v-icon>
                      <v-icon color="yellow" v-else>mdi-eye-outline</v-icon>
                    </v-btn>
                    <v-card width="420px">
                      <v-list two-line>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>{{ k }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ item.group }}</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                      <v-divider></v-divider>
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>{{ item.taskTitle }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ item.taskDescription }}</v-list-tile-sub-title>
                          </v-list-tile-content>
                          <v-list-tile-action>
                            <v-list-tile-action-text v-if="item.needFinishBefore">于{{ transferUTCTime(item.needFinishBefore)| moment('from') }}过期</v-list-tile-action-text>
                            <v-list-tile-action-text v-if="item.punchTime">完成于{{ transferUTCTime(item.punchTime) | moment('YYYY/MM/DD HH:mm:ss') }}</v-list-tile-action-text>
                          </v-list-tile-action>
                        </v-list-tile>
                      </v-list>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click="menu = false" outline disabled>通知他</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </v-item-group>
              </v-list-tile>
            </v-flex>
          </v-layout>
        </v-card-text>
        <div style="flex: 1 1 auto;"></div>
        <v-footer app><!-- why use app? -->
          <v-btn block depressed dark v-on:click="logout">
            <v-icon>power_settings_new</v-icon>
            &nbsp;登出
          </v-btn>
        </v-footer>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'AppHeaderDash',
  data () {
    return {
      dialog: false,
      online: null,
      selfStatus: { OTF: '', IP: '', D: '' },
      employeeStatus: []
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('LOGOUT')
      this.$router.push('/login')
    },
    getUserDash: function () {
      this.dialog = true
      this.$store.dispatch('GET_USER_DASH')
      this.$store.dispatch('GET_EMPLOYEE_DASH')
    },
    transferUTCTime: function (date) {
      if (!date) { return null } else {
        return new Date(date).getTime() - 480 * 60000
      }
    }
  }
}
</script>

<style scoped>
</style>
