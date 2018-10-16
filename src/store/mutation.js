import state from './state'

const mutations = {
  unDrawer: function (state) {
    state.ifDrawer = !state.ifDrawer
  }
}

export default mutations
