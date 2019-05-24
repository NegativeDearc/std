<template>
  <v-app v-bind:dark="$store.state.IS_DARK">
    <v-container>
      <v-layout align-center justify-end column fill-height>
        <div class="display-3 grey--text">
          <span class="green--text">STD</span>
        </div>
        <span class="grey--text body-1">Standard Work App</span>
        <v-flex xs8 md8 sm8>
          <v-card flat color="transparent" width="400px">
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-text-field
                  v-model="userId"
                  :counter="8"
                  v-bind:label="$t('employee_id')"
                  :rules="[v => v.length <= 8 || 'Max 8 characters']"
                  required
                  flat
                  solo
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  v-bind:type="show ? 'text': 'password'"
                  v-bind:label="$t('password')"
                  flat
                  solo
                  required
                  v-on:keypress.enter="login"
                  v-bind:append-icon="show ? 'visibility' : 'visibility_off'"
                  v-on:click:append="showPassword"
                ></v-text-field>

                <div>
                  <v-btn flat small color="green" v-on:click="changeLang('EN')">EN</v-btn>
                  <v-btn flat small color="green" v-on:click="changeLang('CN')">中文</v-btn>
                </div>

                <v-btn block depressed big round color="info" v-on:click="login" large>
                  {{ $t('login') }}
                  <v-icon>trending_flat</v-icon>
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-footer class="pa-3" app>
      <div class="body-2">CHENXEI@SCN MOVE</div>
      <v-spacer></v-spacer>
      <div class="body-2">&copy; 2018 - {{ new Date().getFullYear() }} STD Version V0.6.1</div>
    </v-footer>
  </v-app>

</template>

<script>
export default {
  name: 'AppLogin',
  data () {
    return {
      userId: '',
      password: null,
      show: false
    }
  },

  methods: {
    login: function () {
      let _data = new URLSearchParams({ userId: this.userId, password: this.password })
      if (!localStorage.getItem('userId')) {
        this.axios.post('/auth/login', _data)
          .then(res => {
            if (res.status === 200) {
              this.$store.commit('SET_USER', res.data)
              console.log('=> LOG IN SUCCESS OF USER: ' + localStorage.getItem('userId'))
              let _path = this.$route.query.redirect || '/'
              this.$router.push({ path: _path })
            }
          }).catch(err => {
            console.log('=> LOGIN FAILED WITH ERROR: ' + err)
            alert(err)
          })
      }
    },

    showPassword () {
      this.show = !this.show
    },

    changeLang (locale) {
      this.$store.commit('CHANGE_DEFAULT_LANG', locale)
      this.$i18n.locale = locale
    }
  },
  mounted: function () {
    if (localStorage.getItem('userId')) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
