<template>
  <v-layout>
    <v-btn flat icon color="purple red--after" v-on:click.stop="getUserDash">
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
            <v-layout>
              <v-flex xs4>
                <v-avatar>
                  <v-img
                  ></v-img>
                </v-avatar>
              </v-flex>
              <v-flex xs8>
                <div class="body-1">{{ $store.getters.GET_USER_ID }}</div>
              </v-flex>
            </v-layout>
          </v-container>
          <v-divider
            class="mx-3"
          ></v-divider>
          <v-subheader>你的成就</v-subheader>
          <v-container row wrap>
            <v-layout>
              <v-flex xs4>
                <v-card flat>
                  <div>
                    <div class="display-3 font-weight-black"><span class="green--text">{{ this.$store.state.USER_DASH.OTF }}</span></div>
                    <div class="body-2"><span class="black--text">及时清除</span></div>
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
                    <div class="display-3 font-weight-black"><span class="blue--text">{{ this.$store.state.USER_DASH.IP }}</span></div>
                    <div class="body-2"><span class="black--text">进展之中</span></div>
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
                    <div class="body-2"><span class="black--text">延迟达成</span></div>
                  </div>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <v-divider
            class="mx-3"
          ></v-divider>
          <v-subheader>你的团队</v-subheader>
          <v-container>
            <v-layout>
              <v-flex>
                <UserPunchCard/>
              </v-flex>
            </v-layout>
          </v-container>
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
import UserPunchCard from '../utils/UserPunchCard'

export default {
  name: 'AppHeaderDash',
  components: { UserPunchCard },
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
      this.$store.dispatch('GET_USER_DASH')
      this.dialog = true
    }
  }
}
</script>

<style scoped>
</style>
