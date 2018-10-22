const mutations = {
  /* control the drawer by click function */
  UNDRAWER: function (state) {
    state.ifDrawer = !state.ifDrawer
  },
  SET_USER_ID: function (state, data) {
    state.userId = data
    window.localStorage.setItem('userId', data)
  },
  REMOVE_USER_ID: function (state) {
    state.userId = null
    window.localStorage.removeItem('userId')
  }
}

export default mutations
