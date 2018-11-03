const mutations = {
  /* control the drawer by click function */
  UNDRAWER: function (state) {
    state.IF_DRAWER = !state.IF_DRAWER
  },

  SET_USER_ID: function (state, data) {
    state.USER_ID = data
    localStorage.setItem('userId', data)
  },

  REMOVE_USER_ID: function (state) {
    state.USER_ID = null
    localStorage.removeItem('userId')
  },

  HIDE_NOT_DONE_TASK: function (state) {
    let _data
    _data = localStorage.getItem('SHOW_ALL') === 'false' || localStorage.getItem('SHOW_ALL') === null
    state.SHOW_ALL = _data
  },
  /* init the task list */
  SET_TASKS_LIST: function (state, data) {
    state.TASKS = data
  },
<<<<<<< HEAD
=======
  /* change the specific one (by id) from state.TASKS when click done/not done button */
  CHANGE_DONE_STATUS_BY_ID: function (state, id) {
    state.TASKS.find(task => task.id === id).isDone = !state.TASKS.find(task => task.id === id).isDone
  },
>>>>>>> b5b0cee9e35f1c201ddb9602e34ab04c23ffc207
  /* query user dash status */
  SET_USER_DASH: function (state, data) {
    state.USER_DASH = data
  }
}

export default mutations
