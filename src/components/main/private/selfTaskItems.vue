<template>
  <v-container
    v-if="items.length !== 0"
    fluid
  >
    <v-subheader>{{ date }}</v-subheader>
    <div class="wrapper" ref="wrapper">
      <v-card flat class="content">
        <v-list>
          <template v-for="(item, index) in items">
            <v-list-tile v-bind:key="item.id" v-bind:style="tile_color_style(item.color)">
              <v-list-tile-action>
                <v-checkbox
                  v-on:change="changeStatus(item.id)"
                  v-bind:input-value="item.isDone"
                  on-icon="check_circle_outline"
                  off-icon="panorama_fish_eye"
                ></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-bind:style="item.isDone ? doneStyle: ''">{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-sub-title>{{ item.date }}</v-list-tile-sub-title>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon><v-icon color="red" v-on:click="remove_item(item.id)">close</v-icon></v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="items.length > 1 && index < (items.length - 1)" v-bind:key="item.id.split(':')[1]"></v-divider>
          </template>
        </v-list>
      </v-card>
    </div>
  </v-container>
  <v-container v-else fluid>
    <div ref="wrapper">
      <v-subheader>{{ $t('no_event') }}</v-subheader>
    </div>
  </v-container>
</template>

<script>
import localForge from 'localforage'
import BScroll from 'better-scroll'
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
    },
    changeStatus: function (id) {
      localForge.getItem(id)
        .then(item => {
          let _item = item
          _item.isDone = !_item.isDone
          localForge.setItem(id, _item)
            .then(() => { this.getItems() })
            .catch(err => { console.log(err) })
        })
    }
  },
  data () {
    return {
      items: [],
      doneStyle: {
        'font-style': 'italic',
        'text-decoration': 'line-through red'
      }
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
  },
  created: function () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {})
      console.log(this.scroll)
    })
  }
}
</script>

<style scoped>
  .wrapper {
    height: 310px;
    max-height: 400px;
    overflow: auto;
  }
</style>
