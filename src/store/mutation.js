const mutations = {
  unDrawer: function (state) {
    state.ifDrawer = !state.ifDrawer
    console.log('drawer is', state.ifDrawer)
  }
}

export default mutations
