<template>
  <v-navigation-drawer
    id="right"
    mobile-break-point="1100"
    right
    fixed
    app
    v-bind:width="$vuetify.breakpoint.xl ? 480 : 360"
    v-bind:value="$store.state.RIGHT_DRAWER"
    v-model="$store.state.RIGHT_DRAWER"
  >
    <v-toolbar flat>
      <v-btn icon>
        <v-icon
          v-on:click="$store.commit('DRAWER_RIGHT')"
        >keyboard_arrow_right</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        flat
        color="green"
        depressed
        v-on:click="updateTask"
      >
        {{ $t('update') }}
      </v-btn>
    </v-toolbar>
    <div>
      <v-form ref="newTask" v-on:submit.prevent>
        <v-list>
          <v-subheader
            v-if="TASK.punchTime">
            {{ $t('task') }}
            <span class="red--text">({{ $t('finished_at') }}{{ TASK.punchTime }})</span>
          </v-subheader>
          <v-subheader
            v-else>
            {{ $t('task') }}
            <span class="blue--text">({{ $t('expired_at') }}{{ TASK.nextLoopAt }})</span>
          </v-subheader>
          <v-list-tile>
            <v-list-tile-content>
              <v-text-field
                v-model="TASK.taskTitle"
                v-bind:placeholder="$t('task')"
                solo
                flat
                hide-details
                required
                v-bind:disabled="TASK.isDone"
              >
              </v-text-field>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-checkbox
                v-bind:key="TASK.id"
                v-bind:input-value="TASK.isFavorite"
                color="yellow"
                on-icon="star"
                off-icon="star_border"
                v-on:change="favoriteIt"
              >
              </v-checkbox>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-text-field
                v-model="TASK.taskDescription"
                v-bind:placeholder="$t('task_description')"
                solo
                flat
                hide-details
                required
                v-bind:disabled="TASK.isDone"
              >
              </v-text-field>
            </v-list-tile-content>
            <v-list-tile-action>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
          <v-subheader>{{ $t('loop') }}</v-subheader>
          <v-list-tile v-bind:disabled="TASK.isDone">
            <v-text-field
              v-bind:disabled="TASK.isDone"
              required
              solo
              flat
              hide-details
              readonly
              clearable
              prepend-icon="repeat"
              v-model="cronToText"
              v-on:click.native="loopPicker = true"
            ></v-text-field>
            <v-dialog
              full-width
              lazy
              max-width="1024px"
              v-model="loopPicker"
            >
              <cronPickerV2 v-on:cronChange="getRRules" v-on:onClose="loopPicker = false"></cronPickerV2>
            </v-dialog>
          </v-list-tile>

          <v-list-tile v-bind:disabled="TASK.isDone"
          >
            <v-text-field
              type="time-with-seconds"
              clearable
              solo
              flat
              hide-details
              readonly
              v-model="TASK.remindAt"
              prepend-icon="access_time"
              v-bind:disabled="TASK.isDone"
              v-on:click.native="timePicker = true"
            ></v-text-field>
            <v-dialog
              v-model="timePicker"
              v-bind:return-value="TASK.remindAt"
              full-width
              lazy
              width="470px"
            >
              <v-time-picker
                v-model="TASK.remindAt"
                color="green"
                scrollable
                full-width
                landscape
              ></v-time-picker>
            </v-dialog>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list>
            <v-textarea
              v-bind:placeholder="$t('remark')"
              v-model="TASK.remark"
              auto-grow
              solo
              flat
              clearable
            ></v-textarea>
          </v-list>
        </v-list>
      </v-form>
    </div>
    <v-footer
      class="transparent"
      inset
      fixed
      height="auto"
    >
      <v-spacer></v-spacer>
      <v-btn
        flat
        depressed
        round
        color="error"
        v-on:click="deleteTask"
      >
        {{ $t('delete') }}
      </v-btn>
      <v-spacer></v-spacer>
    </v-footer>
  </v-navigation-drawer>
</template>

<script>
import cronPickerV2 from '../../utils/cronPickerV2/cronPicker'
import cronstrue from 'cronstrue'
import { eventBus } from '../../../main'

export default {
  name: 'mainRightDrawer',
  components: {cronPickerV2},
  data () {
    return {
      TASK: {},
      timePicker: null,
      loopPicker: false,
      enableUpdate: true
    }
  },
  computed: {
    cronToText: function () {
      if (this.TASK.frequency !== undefined && this.TASK.frequency !== '' && this.TASK.frequency !== null) {
        let wholeCronString = cronstrue.toString(this.TASK.frequency).split(',')
        return wholeCronString.splice(1, wholeCronString.length)
      }
    }
  },
  methods: {
    get_task: function (id) {
      this.TASK = this.$store.getters.GET_TASK_BY_ID(id)
    },
    deleteTask: function () {
      this.$store.dispatch('UPDATE_AFTER_DELETE', this.TASK.id)
        .then(() => {
          if (this.$store.state.RIGHT_DRAWER === true) {
            this.$store.commit('DRAWER_RIGHT')
          }
        })
    },
    getRRules: function (rules) {
      this.TASK.frequency = rules
    },
    updateTask: function () {
      this.$store.dispatch('UPDATE_AFTER_UPDATE', [this.TASK.id, this.TASK])
        .then(() => { this.$store.commit('DRAWER_RIGHT') })
    },
    favoriteIt: async function () {
      await this.$store.dispatch('UPDATE_AFTER_UPDATE', [this.TASK.id, { 'isFavorite': !this.TASK.isFavorite }])
        .then(() => {
          if (this.$store.state.RIGHT_DRAWER === true) {
            this.$store.commit('DRAWER_RIGHT')
          }
        })
    }
  },
  mounted: function () {
    eventBus.$on('show_task_panel', id => {
      if (this.$store.state.RIGHT_DRAWER === false) {
        this.$store.commit('DRAWER_RIGHT')
      }
      this.get_task(id)
    })
  },
  created: function () {
    console.log('created')
  }
}
</script>

<style scoped>
#right {
  font-family:  "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
}
</style>
