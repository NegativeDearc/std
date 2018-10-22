import state from '@/store/state'

const getters = {
  GET_IF_DRAWER: function () {
    return state.ifDrawer
  },
  GET_USER_ID: function () {
    return window.localStorage.getItem('userId')
  }
}

export default getters
