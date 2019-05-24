<template>
  <v-card flat>
    <div class="font-weight-bold" v-if="segment">TASK DETAIL OF {{ segment }}</div>
    <v-container fluid>
      <v-layout align-start justify-start column fill-height>
        <v-flex v-for="(v, k) in task_detail" v-bind:key="v.id" v-if="task_detail" sm12 md12 xs12>
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
                        <v-list-tile-action-text v-if="item.needFinishBefore">{{ $t('expired_at') }}{{ transferUTCTime(item.needFinishBefore) | moment('YYYY/MM/DD HH:mm:ss') }}</v-list-tile-action-text>
                        <v-list-tile-action-text v-if="item.punchTime">{{ $t('finished_at') }}{{ transferUTCTime(item.punchTime) | moment('YYYY/MM/DD HH:mm:ss') }}</v-list-tile-action-text>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="menu = false" outline disabled>{{ $t('notify') }}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-item-group>
          </v-list-tile>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    segment: { type: String },
    task_detail: { type: Object }
  },
  name: 'dashList',

  methods: {
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
