import state from '../store/state'

const getters = {
  /**
   * @return {boolean}
   */
  GET_IF_DRAWER: function () {
    return state.IFDRAWER
  },
  /**
   * @return {string}
   */
  GET_USER_ID: function () {
    return window.localStorage.getItem('userId')
  },
  GET_TASK_ALL: function (state) {
    return state.TASKS
  },
  GET_TASK_BY_ID: (state) => (id) => {
    return state.TASKS.find(task => task.id === id)
  },
  GET_TASK_NOT_DONE: (state) => {
    return state.TASKS.filter(task => !task.isDone)
  },
  GET_TASK: function (state, getters) {
    if (state.SHOWALL) {
      return getters.GET_TASK_ALL
    } else { return getters.GET_TASK_NOT_DONE }
  }
}

export default getters
