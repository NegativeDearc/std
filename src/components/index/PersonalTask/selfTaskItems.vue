<template>
  <v-container v-if="items.length !== 0">
    <v-card flat>
      <v-list>
        <v-list-tile v-for="item in items" v-bind:key="item.id" v-bind:style="tile_color_style(item.color)">
          <v-list-tile-action>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon><v-icon color="red" v-on:click="remove_item(item.id)">close</v-icon></v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import localForge from 'localforage'
import { eventBus } from '../../../main'

export default {
  props: {
    date: { type: String, default: null }
  },
  methods: {
    tile_color_style: function (color) {
      return { 'border-left': ''.concat('5px solid ', color || 'green') }
    },
    remove_item: function (id) {
      localForge.removeItem(id)
        .then(() => {
          eventBus.$emit('update-events')
          this.getItems()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getItems: function () {
      this.items = []
      localForge.keys().then(keys => {
        for (let i of keys) {
          if (this.date === i.split(':')[0]) {
            localForge.getItem(i).then(data => {
              this.items.push(data)
            })
          }
        }
      })
    }
  },
  data () {
    return {
      items: []
    }
  },
  name: 'selfTaskItems',
  watch: {
    date: function () {
      if (this.date === null) {

      } else {
        this.getItems()
        // console.log(this.items)
      }
    }
  },
  mounted: function () {
    eventBus.$on('refresh-item', () => {
      this.getItems()
    })
  }
}
</script>

<style scoped>

</style>
