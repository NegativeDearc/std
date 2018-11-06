<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-data-iterator
          v-bind:items="punch"
          row
          wrap
        >
          <v-flex
            sm12
            md6
            slot="item"
            slot-scope="props"
          >
            <v-card>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>{{ props.item.needFinishBefore }}</v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    <v-tooltip right v-if="props.item.isDone === false && props.item.isDelay === true">
                      <v-icon slot="activator" color="red">close</v-icon>
                      <span>延迟未完成</span>
                    </v-tooltip>
                    <v-tooltip right v-if="props.item.isDone === false && props.item.isDelay === false">
                      <v-icon slot="activator" color="blue">trending_flat</v-icon>
                      <span>循环任务正在进行</span>
                    </v-tooltip>
                    <v-tooltip right v-if="props.item.isDone === false && props.item.isDelay === null && props.item.isLoop == false">
                      <v-icon slot="activator" color="yellow">trending_flat</v-icon>
                      <span>一次性任务正在进行</span>
                    </v-tooltip>
                    <v-tooltip right v-if="props.item.isDone === true && props.item.isDelay === null">
                      <v-icon slot="activator" color="green">yellow</v-icon>
                      <span>一次性任务已完成</span>
                    </v-tooltip>
                    <v-tooltip right v-if="props.item.isDone === true && props.item.isDelay === false">
                      <v-icon slot="activator" color="green">done</v-icon>
                      <span>循环任务完成</span>
                    </v-tooltip>
                    <v-tooltip right v-if="props.item.isDone === true && props.item.isDelay === true">
                      <v-icon slot="activator" color="red">warning</v-icon>
                      <span>延迟完成</span>
                    </v-tooltip>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-data-iterator>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'UserPunchCard',
  data () {
    return {
      punch: []
    }
  },
  mounted: function () {
    this.axios.get('/punch/' + this.$store.state.USER_ID)
      .then(data => {
        this.punch = data.data
        console.log(data.data)
      })
  }
}
</script>

<style scoped>

</style>
