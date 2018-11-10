<template>
  <v-content app>
    <v-container>
      <v-layout align-center justify-center row wrap fill-height>
        <v-flex sm6>
          <v-form ref="reset_password" v-model="valid">
            <v-card>
              <v-responsive>
                <v-img src="http://upload.site.cnhubei.com/2016/1102/thumb_940__1478048009510.jpg"></v-img>
              </v-responsive>
              <v-divider></v-divider>
              <v-card-text>
                <v-list>
                  <v-subheader>原始密码</v-subheader>
                  <v-list-tile>
                    <v-text-field
                      type="password"
                      outline
                      v-model="form.original"
                      v-bind:rules="[ v => !!v || 'Password is required' ]"
                      required
                      clearable
                    ></v-text-field>
                  </v-list-tile>
                  <v-subheader>新密码</v-subheader>
                  <v-list-tile>
                    <v-text-field
                      type="password"
                      outline
                      v-model="form.new"
                      required
                      v-bind:rules="[v => v.length >= 6 || 'Min 6 characters']"
                      clearable
                    ></v-text-field>
                  </v-list-tile>
                  <v-subheader>重复新密码</v-subheader>
                  <v-list-tile>
                    <v-text-field
                      type="password"
                      outline
                      v-model="form.again"
                      required
                      v-bind:rules="[ (v => v.length >= 6 && v === this.form.new) || 'Password Must Be Same']"
                      clearable
                    ></v-text-field>
                  </v-list-tile>
                </v-list>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outline color="green" v-on:click="resetPassword" :disabled="!valid">重设</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'ResetPassword',
  data () {
    return {
      form: {
        original: '',
        new: '',
        again: ''
      },
      isSame: {
        name: []
      },
      valid: false
    }
  },
  methods: {
    resetPassword: function () {
      if (this.$refs.reset_password.validate()) {
        let _form = new URLSearchParams(this.form)
        this.axios.post('/reset_password/' + localStorage.getItem('userId'), _form)
          .then(data => {
            if (data.status === 200) {
              this.$store.commit('LOG_OUT')
              this.$router.push('/')
            }
          })
      }
    }
  }
}
</script>
<style scoped>

</style>
