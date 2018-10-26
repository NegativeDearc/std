const mutations = {
  /* control the drawer by click function */
  UNDRAWER: function (state) {
    state.IFDRAWER = !state.IFDRAWER
  },
  SET_USER_ID: function (state, data) {
    state.USERID = data
    localStorage.setItem('userId', data)
  },
  REMOVE_USER_ID: function (state) {
    state.USERID = null
    localStorage.removeItem('userId')
  },
  HIDE_NOT_DONE_TASK: function (state) {
    state.SHOWALL = !state.SHOWALL
  },
  /* init the task list */
  SET_TASKS_LIST: function (state, data) {
    state.TASKS = data
  },
  /* change the specific one (by id) from state.TASKS when click done/not done button */
  CHANGE_DONE_STATUS_BY_ID: function (state, id) {
    state.TASKS.find(task => task.id === id).isDone = !state.TASKS.find(task => task.id === id).isDone
  }
}

export default mutations
