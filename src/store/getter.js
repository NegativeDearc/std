import state from '@/store/state'

const getters = {
  /**
   * @return {boolean}
   */
  GET_IF_DRAWER: function () {
    return state.ifDrawer
  },
  /**
   * @return {string}
   */
  GET_USER_ID: function () {
    return window.localStorage.getItem('userId')
  },
  GET_TASK_COLLECTION: function (todo) {
    console.log(todo)
  }
}

export default getters
