<template>
  <v-content app id="item">
    <div>
      <v-card class="content transparent" flat>
        <v-card-text>
          <v-list
            v-if="(getTasks.length > 0)"
            subheader
            two-line
            dense
            class="transparent">
            <transition-group name="todo-list">
              <template
                v-for="todo in getTasks.slice(0, page)"
              >
                <v-list-tile
                  ripple
                  v-on:click.self.prevent="show_task_panel(todo.id)"
                  v-bind:key="todo.id"
                  v-bind:class="highlight(choose === todo.id && $store.state.RIGHT_DRAWER)"
                >
                  <v-list-tile-action>
                    <v-checkbox
                      color="green"
                      v-bind:key="todo.id"
                      v-on:change="changeTaskStatus(todo.id)"
                      v-bind:input-value="todo.isDone"
                      on-icon="check_circle_outline"
                      off-icon="panorama_fish_eye"
                    ></v-checkbox>
                  </v-list-tile-action>
                  <v-list-tile-content
                    v-on:click="show_task_panel(todo.id)"
                    v-bind:style="[todo.isDone ? completedTaskStyle : null]"
                  >
                    <v-list-tile-title>{{ todo.taskTitle }}</v-list-tile-title>
                    <v-list-tile-sub-title>
                      {{ todo.taskDescription }}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-list-tile-action-text>
                      <div>
                        {{ todo.nextLoopAt| moment('YYYY/MM/DD') }}
                      </div>
                    </v-list-tile-action-text>
                    <div style="display: inline-block">
                      <v-tooltip v-if="todo.remark" top>
                        <v-btn icon slot="activator"><v-icon color="yellow">comment</v-icon></v-btn>
                        <span>{{ '备注:' + todo.remark}}</span>
                      </v-tooltip>
                      <v-btn icon v-if="todo.frequency"><v-icon color="blue">restore</v-icon></v-btn>
                      <span v-if="todo.remindAt">
                        <span>{{ todo.remindAt}}</span>
                      </span>
                    </div>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider v-bind:key="todo.uid + todo.id"></v-divider>
              </template>
            </transition-group>
          </v-list>
          <!-- favorite will show different -->
          <div
            v-else-if="this.$route.name === 'favorite'"
          >
            <v-container>
              <v-layout row wrap align-center justify-center>
                <v-flex>
                  <v-icon size=320 color="pink">mdi-folder-star</v-icon>
                  <div class="display-2">Nothing in Favorite</div>
                  <div class="grey--text font-weight-bold">Anything you mark favorite will be safely stored here.</div>
                </v-flex>
              </v-layout>
            </v-container>
          </div>
          <div
            v-else
          >
            <v-container>
              <v-layout row wrap align-center justify-center>
                <v-flex>
                  <v-icon size=320 color="blue">done</v-icon>
                  <div class="display-2">Nothing in Done</div>
                  <div class="grey--text font-weight-bold">Anything you mark done will be safely stored here.</div>
                </v-flex>
              </v-layout>
            </v-container>
          </div>
        </v-card-text>
        <v-snackbar
          v-model="loading"
          bottom
          right
          v-bind:timeout=1000
        >
          {{ $t('load_more_data') }}
          <v-progress-circular indeterminate color="primary" size="16"></v-progress-circular>
          <v-btn color="red" flat v-on:click="loading = false">{{ $t('close') }}</v-btn>
        </v-snackbar>
      </v-card>
    </div>
  </v-content>
</template>

<script>
import { eventBus } from '../../../main'
import { mapGetters } from 'vuex'

export default {
  name: 'mainItems',
  data () {
    return {
      page: 20,
      choose: null,
      loading: false,
      completedTaskStyle: {
        'color': 'grey',
        'text-decoration': 'line-through'
      }
    }
  },
  watch: {
    $route: {
      handler: function () {
        Object.assign(this.$data, this.$options.data())

        if (this.$store.state.RIGHT_DRAWER) {
          this.$store.commit('DRAWER_RIGHT')
        }
        return this.getTasks
      },
      immediate: true
    },
    choose: {
      handler: function () {
        console.log('=> CHOOSE ITEM', this.choose)
      },
      immediate: true
    },
    page: {
      handler: function () {
        console.log('=> LOAD MORE LIST TO', this.page)
        return this.getTasks
      }
    }
  },
  computed: {
    ...mapGetters({
      thisWeek: 'GET_THIS_WEEK_TASKS',
      later: 'GET_TASKS_LATER',
      finished: 'GET_TASKS_FINISHED',
      expired: 'GET_EXPIRED_TASKS',
      favorite: 'GET_TASKS_FAVORITE'
    }),
    getTasks: function () {
      switch (this.$route.name) {
        case 'thisWeek':
          return this.thisWeek
        case 'later':
          return this.later
        case 'finished':
          return this.finished
        case 'expired':
          return this.expired
        case 'favorite':
          return this.favorite
      }
    }
  },
  methods: {
    show_task_panel: function (id) {
      eventBus.$emit('show_task_panel', id)
      this.choose = id
      // this.$refs[id].style.background = 'hsla(0,0%,100%,.12)'
    },
    changeTaskStatus: function (_id) {
      this.$store.dispatch('CHANGE_DONE_STATUS', _id)
        .then(() => {
          if (this.$store.state.RIGHT_DRAWER === true) {
            this.$store.commit('DRAWER_RIGHT')
          }
        })
    },
    highlight: function (choose) {
      if (choose) {
        return 'highlight'
        // return { border: 'dashed #03A9F4 2px' }
      } return null
    },
    loadMoreList: function () {
      if (this.page < this.getTasks.length) {
        this.loading = true
        this.page += 20
      } else {

      }
    }
  },
  beforeMount: function () {
    this.$store.dispatch('GET_TASKS_OF_ALL')
    return this.getTasks
  },
  created: function () {
    let _this = this

    function isScrollToBottom () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      return scrollTop + window.innerHeight >= document.body.clientHeight
    }

    window.addEventListener('scroll', function () {
      if (isScrollToBottom()) {
        _this.loadMoreList()
      }
    })
  }
}
</script>

<style scoped>
  #item {
    font-family:  "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  }
  .todo-list-move {
    transition: transform 1s;
  }
  .todo-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .highlight {
    box-shadow: -6px 0 0 #69ca62;
    background-color: rgba(0, 172, 40, 0.1);
  }
</style>
