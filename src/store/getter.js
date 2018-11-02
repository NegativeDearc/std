const getters = {
  /**
   * @return {string}
   */
  GET_USER_ID: function () {
    return localStorage.getItem('userId')
  },
  /**
   * @return {boolean}
   */
  GET_IF_SHOW_ALL: function () {
    return !(localStorage.getItem('SHOW_ALL') === 'false' || localStorage.getItem('SHOW_ALL') === 'null')
  },
  /**
   * @return {null}
   */
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
    if (state.SHOW_ALL) {
      return getters.GET_TASK_ALL
    } else { return getters.GET_TASK_NOT_DONE }
  },

  /**
   * @return {number}
   */
  GET_TOMORROW: function () {
    var _today = new Date(new Date().toLocaleDateString())
    var _tomorrow = _today.setDate(_today.getDate() + 1)
    return _tomorrow
  },

  GET_TASK_TODAY: function (state, getters) {
    let _tomorrow = getters.GET_TOMORROW
    if (state.SHOW_ALL) {
      return state.TASKS.filter(todo => new Date(todo.nextLoopAt).getTime() <= new Date(_tomorrow).getTime())
    } else {
      return state.TASKS.filter(todo => new Date(todo.nextLoopAt).getTime() <= new Date(_tomorrow).getTime() && todo.isDone === false)
    }
  },

  GET_TASK_LATER: function (state, getters) {
    let _tomorrow = getters.GET_TOMORROW
    if (state.SHOW_ALL) {
      return state.TASKS.filter(todo => new Date(todo.nextLoopAt).getTime() > new Date(_tomorrow).getTime())
    } else {
      return state.TASKS.filter(todo => new Date(todo.nextLoopAt).getTime() > new Date(_tomorrow).getTime() && todo.isDone === false)
    }
  }
}

export default getters
