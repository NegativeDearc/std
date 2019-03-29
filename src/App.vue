<template>
  <div id="app">
    <ConnectionStatus></ConnectionStatus>
    <router-view></router-view>
  </div>
</template>

<script>
import ConnectionStatus from './components/utils/ConnectionStatus'

export default {
  name: 'App',
  components: { ConnectionStatus },
  sockets: {
    connect () {
      console.log('=> SERVER CONNECTED')
      this.$store.commit('CHANGE_SERVER_CONNECTION_STATUS', true)
    },
    disconnect () {
      console.log('=> SERVER DISCONNECTED')
      this.$store.commit('CHANGE_SERVER_CONNECTION_STATUS', false)
    }
  }
}
</script>

<style>
#app {
  font-family:  "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
