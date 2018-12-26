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
      <v-btn icon v-on:click="">
        <v-icon color="grey">keyboard_arrow_right</v-icon>
      </v-btn>
    </v-toolbar>
    <div>
      <v-form ref="newTask" v-on:submit.prevent>
        <v-list>
          <v-subheader>{{ $t('task') }}</v-subheader>
          <v-list-tile>
            <v-list-tile-action>
              <v-checkbox
                on-icon="check_circle_outline"
                off-icon="panorama_fish_eye"
              ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-text-field
                v-model="TASK.TASK_TITLE"
                solo
                flat
                hide-details
                required
                v-bind:disabled="TASK.TASK_IS_DONE"
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
          <v-divider></v-divider>
          <v-subheader>{{ $t('loop') }}</v-subheader>
          <v-list-tile v-bind:disabled="TASK.TASK_IS_DONE">
            <v-text-field
              v-bind:disabled="TASK.TASK_IS_DONE"
              required
              v-validate="'required'"
              v-bind:error-messages="errors.collect('loop')"
              data-vv-name="loop"
              solo
              flat
              hide-details
              readonly
              clearable
              prepend-icon="repeat"
              v-model="parseCron"
              v-on:click.native="openCronForm"
            ></v-text-field>
            <v-dialog
              full-width
              lazy
              max-width="600px"
              v-model="cronPicker"
              persistent
            >
              <v-card flat>
                <v-toolbar dark color="green">
                  <v-btn icon flat v-on:click="cronPicker = !cronPicker"><v-icon>close</v-icon></v-btn>
                  <v-toolbar-title>{{ $t('choose_date') }}</v-toolbar-title>
                </v-toolbar>
                <cronPickerIndex v-on:cron-expression="getCronExpression"></cronPickerIndex>
              </v-card>
            </v-dialog>
          </v-list-tile>

          <v-list-tile v-bind:disabled="TASK.TASK_IS_DONE">
            <v-text-field
              clearable
              solo
              flat
              hide-details
              readonly
              v-model="TASK.TASK_REMIND_AT"
              prepend-icon="access_time"
              v-bind:disabled="TASK.TASK_IS_DONE"
              v-on:click.native="timePicker = true"
            ></v-text-field>
            <v-dialog
              v-model="timePicker"
              v-bind:return-value="TASK.TASK_REMIND_AT"
              full-width
              lazy
              width="470px"
            >
              <v-time-picker
                v-model="TASK.TASK_REMIND_AT"
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
              v-model="TASK.TASK_REMARK"
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
      <v-btn flat depressed round color="error">
        {{ $t('delete') }}
      </v-btn>
      <v-spacer></v-spacer>
    </v-footer>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'mailRightDrawer',
  data () {
    return {
      TASK: {},
      timePicker: null
    }
  }
}
</script>

<style scoped>

</style>
