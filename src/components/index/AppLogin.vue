<template>
  <v-app>
    <v-container>
      <v-layout align-center justify-end column fill-height>
        <div class="display-3 grey--text">
          SCN to-do
        </div>
        <v-flex xs8 md8 sm8>
          <v-card flat color="transparent" width="400px">
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-text-field
                  v-model="userId"
                  :counter="8"
                  label="工号"
                  :rules="[v => v.length <= 8 || 'Max 8 characters']"
                  required
                  outline
                  clearable
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  type="password"
                  label="密码"
                  outline
                  required
                  clearable
                ></v-text-field>
                <v-btn block depressed big round color="info" v-on:click="login" large>登陆</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-footer class="pa-3" app>
      <div class="body-2">CHENXEI@SCN MOVE</div>
      <v-spacer></v-spacer>
      <div class="body-2">&copy; {{ new Date().getFullYear() }} STD Version V0.2.24</div>
    </v-footer>
  </v-app>

</template>

<script>
export default {
  name: 'AppLogin',
  data () {
    return {
      userId: '',
      password: null
    }
  },
  methods: {
    login: function () {
      let _data = new URLSearchParams({ userId: this.userId, password: this.password })
      if (!localStorage.getItem('userId')) {
        this.axios.post('/auth/login', _data)
          .then(res => {
            if (res.status === 200) {
              this.$store.commit('SET_USER_ID', res.data.userId)
              console.log('=> LOG IN SUCCESS OF USER: ' + localStorage.getItem('userId'))
              let _path = this.$route.query.redirect || '/'
              this.$router.push({ path: _path })
            }
          }).catch(err => {
            console.log('=> LOGIN FAILED WITH ERROR: ' + err)
            alert(err)
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
