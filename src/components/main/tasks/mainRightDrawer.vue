<template>
  <v-navigation-drawer
    mobile-break-point="1100"
    right
    fixed
    app
    width="360"
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
        outline
        color="green"
        depressed
      >
        {{ $t('update') }}
      </v-btn>
    </v-toolbar>
    <div>
      <v-form ref="newTask" v-on:submit.prevent>
        <v-list>
          <v-subheader>{{ $t('task') }}</v-subheader>
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
                color="yellow"
                on-icon="star"
                off-icon="star_border"
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
              v-model="rrule"
              v-on:click.native="loopPicker = true"
            ></v-text-field>
            <v-dialog
              full-width
              lazy
              max-width="1024px"
              v-model="loopPicker"
            >
              <loop-picker v-model="rrule"></loop-picker>
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
import LoopPicker from '../../utils/rrulePicker/rrulePicker'
import { eventBus } from '../../../main'

export default {
  name: 'mainRightDrawer',
  components: {LoopPicker},
  data () {
    return {
      rrule: {},
      TASK: {},
      timePicker: null,
      loopPicker: false
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
    }
  },
  mounted: function () {
    eventBus.$on('show_task_panel', id => {
      if (this.$store.state.RIGHT_DRAWER === false) {
        this.$store.commit('DRAWER_RIGHT')
      }
      this.get_task(id)
    })
  }
}
</script>

<style scoped>

</style>
