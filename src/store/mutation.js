const mutations = {
  /* control the drawer by click function */
  UNDRAWER: function (state) {
    state.IF_DRAWER = !state.IF_DRAWER
  },

  SET_DARK_MODEL: function (state) {
    state.IS_DARK = !state.IS_DARK
    localStorage.setItem('darkModel', state.IS_DARK)
  },

  SET_USER: function (state, data) {
    state.USER.USER_ID = data.userId
    state.USER.USER_NAME = data.userName
    state.USER.USER_GROUP = data.userGroup
    localStorage.setItem('userId', data.userId)
    localStorage.setItem('userName', data.userName)
    localStorage.setItem('userGroup', data.userGroup)
  },

  REMOVE_USER_ID: function (state) {
    state.USER.USER_ID = null
    state.USER.USER_NAME = null
    state.USER.USER_GROUP = null
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    localStorage.removeItem('userGroup')
  },

  HIDE_NOT_DONE_TASK: function (state) {
    let _tmpState = !state.SHOW_ALL
    state.SHOW_ALL = _tmpState
    localStorage.setItem('SHOW_ALL', _tmpState)
  },
  /* init the task list */
  SET_TASKS_LIST: function (state, data) {
    state.TASKS = data
  },
  /* query user dash status */
  SET_USER_DASH: function (state, data) {
    state.USER_DASH = data
  },
  /* query employee status */
  SET_EMPLOYEE_DASH: function (state, data) {
    state.EMPLOYEE_DASH = data
  },
  /* logout */
  LOG_OUT: function (state) {
    state.USER.USER_ID = null
    localStorage.removeItem('userId')
  },
  /* */
  SET_CRON_DESCRIPTION: function (state, data) {
    state.CRON_DESCRIPTION = data
  },
  CLEAR_CRON_DESCRIPTION: function (state) {
    state.CRON_DESCRIPTION = ''
  },
  CHANGE_DEFAULT_LANG: function (state, locale) {
    state.DEFAULT_LANG = locale
    localStorage.setItem('LOCALE', locale)
  }
}

export default mutations
