<template>
  <v-layout>
    <v-btn flat icon color="purple red--after" v-on:click.stop="dialog = true">
      <v-icon>perm_identity</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar dark color="purple red--after">
          <v-btn icon dark v-on:click.native="dialog = false">
            <v-icon dark>close</v-icon>
          </v-btn>
          <v-toolbar-title>登陆</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat v-on:click.native="dialog = false">提交</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="userId"
              :counter="8"
              label="工号"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              label="密码"
              required
            ></v-text-field>
            <v-checkbox
              v-model="rememberMe"
              label="记住我"
            ></v-checkbox>
          </v-form>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'AppHeaderLogin',
  data () {
    return {
      dialog: false
    }
  }
}
</script>

<style scoped>

</style>
