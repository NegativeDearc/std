<template>
  <v-content app>
    <v-container fluid>
      <v-list two-line class="transparent">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="purple">g_translate</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ $t('translate') }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ $t('translate_description') }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-menu offset-x left>
              <v-btn slot="activator" flat outline color="purple">
                {{ this.$store.getters.GET_DEFAULT_LANG }}
              </v-btn>
              <v-list>
                <template v-for="lang in $store.state.LANGUAGE_MENU">
                  <v-list-tile v-bind:key="lang.id" v-bind:locale="lang.locale" v-on:click="changeLanguage(lang.locale)">
                    <v-list-tile-action>
                      <span v-bind:class="lang.icon"></span>
                    </v-list-tile-action>
                    <v-list-tile-content v-bind:key="lang.locale">
                      <v-list-tile-title>{{ lang.description }}</v-list-tile-title>
                    </v-list-tile-content></v-list-tile>
                </template>
              </v-list>
            </v-menu>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider flat></v-divider>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="grey">brightness_4</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ $t('dark_model') }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ $t('dark_model_description') }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-switch
              v-bind:input-value="$store.state.IS_DARK"
              color="grey"
              v-on:change="changeDarkModel"
              hide-details
            ></v-switch>
          </v-list-tile-action>

        </v-list-tile>
        <v-divider flat></v-divider>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="blue">looks_one</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ $t('sort_by') }}<sup><span class="red--text">beta</span></sup></v-list-tile-title>
            <v-list-tile-sub-title>{{ $t('sort_by_description') }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-menu offset-x left>
              <v-btn
                slot="activator"
                color="primary"
                outline
                flat
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
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="red">mdi-airplane</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ $t('holiday_model') }}<sup><span class="red--text">beta</span></sup></v-list-tile-title>
            <v-list-tile-sub-title>{{ $t('holiday_modal_description') }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-switch
              color="red"
              v-model="holidayModel"
              v-on:change="changeHolidayModel"
            >
            </v-switch>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'mainSettings',
  data () {
    return {
      holidayModel: false
    }
  },
  methods: {
    showAll: function () {
      this.$store.commit('HIDE_NOT_DONE_TASK')
    },
    changeDarkModel: function () {
      this.$store.commit('SET_DARK_MODEL')
    },
    changeLanguage: function (locale) {
      this.$store.commit('CHANGE_DEFAULT_LANG', locale)
      this.$i18n.locale = locale
    },
    changeHolidayModel: function () {}
  }
}
</script>

<style scoped>

</style>
