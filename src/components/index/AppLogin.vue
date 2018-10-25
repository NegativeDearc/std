<template>
  <v-app>
    <v-toolbar dark color="purple red--after" app>
      <v-toolbar-title>登陆</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container>
      <v-layout align-space-between justify-center column fill-height>
        <v-card tile>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            aspect-ratio="2.75"
          ></v-img>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="userId"
                :counter="8"
                label="工号"
                hint="输入您的工号"
                :rules="[v => v.length <= 8 || 'Max 8 characters']"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                type="password"
                label="密码"
                hint="输入您的密码"
                required
              ></v-text-field>
              <v-btn block depressed color="primary" v-on:click="login">登陆</v-btn>
            </v-form>
          </v-card-text>
          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-layout>
    </v-container>
    <v-footer class="pa-3">
      <div>CHENXEI@SCN MOVE</div>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }} STD Version V</div>
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
      let _data = { userId: this.userId, password: this.password }
      if (!localStorage.getItem('userId')) {
        this.axios.post('http://localhost:4000/api/auth/login', _data)
          .then(res => {
            if (res.status === 200) {
              this.$store.commit('SET_USER_ID', res.data.loginUserId)
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
