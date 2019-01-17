import _ from 'lodash'
import moment from 'moment'

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
      return state.TASKS.filter(todo => new Date(todo.nextLoopAt).getTime() < new Date(_tomorrow).getTime())
    } else {
      return state.TASKS.filter(todo => new Date(todo.nextLoopAt).getTime() < new Date(_tomorrow).getTime() && todo.isDone === false)
    }
  },

  GET_TASK_LATER: function (state, getters) {
    let _tomorrow = getters.GET_TOMORROW
    if (state.SHOW_ALL) {
      return state.TASKS.filter(todo => new Date(todo.nextLoopAt).getTime() >= new Date(_tomorrow).getTime())
    } else {
      return state.TASKS.filter(todo => new Date(todo.nextLoopAt).getTime() >= new Date(_tomorrow).getTime() && todo.isDone === false)
    }
  },

  /**
   * @return {number}
   */
  GET_TODAY_FINISH_RATE: function (state, getters) {
    let _tomorrow = getters.GET_TOMORROW
    let _total = state.TASKS.filter(todo => new Date(todo.nextLoopAt).getTime() < new Date(_tomorrow).getTime()).length
    let _finished = state.TASKS.filter(todo => new Date(todo.nextLoopAt).getTime() < new Date(_tomorrow).getTime() && todo.isDone === true).length
    return _finished / _total * 100
  },

  /**
   * @return {number}
   */
  GET_LATER_FINISH_RATE: function (state, getters) {
    let _tomorrow = getters.GET_TOMORROW
    let _total = state.TASKS.filter(todo => new Date(todo.nextLoopAt).getTime() >= new Date(_tomorrow).getTime()).length
    let _finished = state.TASKS.filter(todo => new Date(todo.nextLoopAt).getTime() >= new Date(_tomorrow).getTime() && todo.isDone === true).length
    return _finished / _total * 100
  },

  GET_DEFAULT_LANG: function (state) {
    return state.DEFAULT_LANG
  },
  GET_EXPIRED_TASKS: function (state) {
    return state.TASKS.filter(todo => todo.isDone === false && new Date(todo.nextLoopAt).getTime() < _.now())
  },
  /**
   * @return {number/null}
   */
  GET_EXPIRED_TASKS_COUNT: function (state, getters) {
    let task = getters.GET_EXPIRED_TASKS
    if (task.length !== 0) { return task.length } else { return null }
  },
  GET_THIS_WEEK_TASKS: function (state) {
    let thisWeekStartDate = moment().startOf('isoWeek')
    let thisWeekStopDate = moment().endOf('isoWeek')
    return state.TASKS.filter(todo => moment(todo.nextLoopAt).isBetween(thisWeekStartDate, thisWeekStopDate) && todo.isDone === false)
  },
  /**
   * @return {number}
   */
  GET_THIS_WEEK_TASKS_COUNT: function (state, getters) {
    let count
    (getters.GET_THIS_WEEK_TASKS.length === 0)
      ? count = null
      : count = getters.GET_THIS_WEEK_TASKS.length
    return count
  },
  GET_TASKS_LATER: function (state) {
    let thisWeekStopDate = moment().endOf('isoWeek')
    return state.TASKS.filter(todo => moment(todo.nextLoopAt) >= thisWeekStopDate && todo.isDone === false)
  },
  /**
   * @return {number}
   */
  GET_TASKS_LATER_COUNT: function (state, getters) {
    let count
    (getters.GET_TASKS_LATER.length === 0)
      ? count = null
      : count = getters.GET_TASKS_LATER.length
    return count
  },
  GET_TASKS_FINISHED: function (state) {
    return state.TASKS.filter(todo => todo.isDone === true).reverse()
  },
  /**
   * @return {number}
   */
  GET_TASKS_FINISHED_COUNT: function (state, getters) {
    let count
    (getters.GET_TASKS_FINISHED.length === 0)
      ? count = null
      : count = getters.GET_TASKS_FINISHED.length
    return count
  },
  /**
   * @return {null}
   */
  RRULE_TO_STRING: function (state) {
    let loop
    let end
    if (state.RRULE_STRING.LOOP !== {}) {
      loop = _.join(_.toPairs(state.RRULE_STRING.LOOP).map(item => item.join('=')), ';')
    }
    if (state.RRULE_STRING.END !== {}) {
      end = _.join(_.toPairs(state.RRULE_STRING.END).map(item => item.join('=')), ';')
    }
    if (_.size(loop) > 0) {
      if (end === '') {
        return 'RRULE:' + loop
      } return 'RRULE:' + _.join([loop, end], ';')
    } return null
  },
  CRON_TO_STRING: function (state) {
    return _.values(state.CRON_EXPRESSION).join(' ')
  }
}

export default getters
