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
          <v-toolbar-title>Login</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat v-on:click.native="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="username"
              :rules="nameRules"
              :counter="10"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-checkbox
              v-model="checkbox"
              label="Keep Me Login In the Next ? Days"
            ></v-checkbox>

            <v-btn
              :disabled="!valid"
              v-on:click="submit"
            >
              submit
            </v-btn>
            <v-btn v-on:click="clear">clear</v-btn>
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
