<template>
  <v-content app>
    <v-card flat height="100%">
      <v-card-text class="mb-4">
        <v-container>
          <v-layout>
            <v-flex xs2 md2>
              <v-avatar size="90">
                <v-img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairBun&accessoriesType=Wayfarers&hairColor=Red&facialHairType=MoustacheFancy&facialHairColor=BlondeGolden&clotheType=ShirtCrewNeck&clotheColor=PastelYellow&eyeType=Squint&eyebrowType=UnibrowNatural&mouthType=Grimace&skinColor=Tanned"></v-img>
              </v-avatar>
              <div class="body-1 pt-4"><v-chip>{{ $store.state.USER.USER_NAME }}</v-chip></div>
            </v-flex>
            <v-flex xs10 md10>
              <v-container row wrap>
                <v-layout>
                  <v-flex xs4>
                    <v-card flat>
                      <div>
                        <div class="display-3 font-weight-black"><span>{{ this.$store.state.USER_DASH.OTF }}</span></div>
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
                        <div class="display-3 font-weight-black"><span>{{ this.$store.state.USER_DASH.IP }}</span></div>
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
                        <div class="display-3 font-weight-black"><span>{{ this.$store.state.USER_DASH.D }}</span></div>
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
                  <v-card width="600px">
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
                          <v-list-tile-action-text v-if="item.needFinishBefore">{{ $t('expired_at') }}{{ transferUTCTime(item.needFinishBefore)| moment('YYYY/MM/DD HH:mm:ss') }}</v-list-tile-action-text>
                          <v-list-tile-action-text v-if="item.punchTime">{{ $t('finished_at') }}{{ transferUTCTime(item.punchTime) | moment('YYYY/MM/DD HH:mm:ss') }}</v-list-tile-action-text>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" flat @click="menu = false" outline disabled>{{ $t('notify') }}</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </v-item-group>
            </v-list-tile>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-content>
</template>

<script>
export default {
  name: 'mainTeams',
  data () {
    return {
      dialog: false,
      online: null,
      selfStatus: { OTF: '', IP: '', D: '' },
      employeeStatus: []
    }
  },
  methods: {
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
  },
  mounted: function () {
    this.getUserDash()
  }
}
</script>

<style scoped>

</style>
