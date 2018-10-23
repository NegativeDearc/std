import axios from 'axios'
import store from './index'

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
  },
  GET_TASKS_OF_ALL: function (state) {
    axios.get('http://localhost:4000/api/task/user/' + window.localStorage.getItem('userId'))
      .then(data => {
        console.info('=> GETTING TASKS OF ALL OF USER ' + window.localStorage.getItem('userId'))
        state.TASKS = data.data
      }).catch(err => {
        console.log(err)
      })
  },
  CHANGE_DONE_STATUS: function (state, id) {
    var isDone = state.TASKS[id - 1].isDone
    // update stated
    state.TASKS[id - 1].isDone = !isDone
    // sync with database
    console.info('=> UPDATING TASK ID ' + id, 'VALUE isDone TO ' + state.TASKS[id - 1].isDone)
    axios.put('http://localhost:4000/api/task/' + id, {isDone: !isDone})
      .then(data => {
        store.commit('GET_TASKS_OF_ALL')
        if (data.status === 200) { console.info('=> UPDATING SUCCESS') }
      })
      .catch(err => { console.log('=> ENCOUNTER ERROR: ' + err) })
  },
  DELETE_ONE_TASK: function (state, id) {
    axios.delete('http://localhost:4000/api/task/' + id)
      .then(data => {
        console.log('=> DELETING TASK...' + data.data)
      }).catch(err => {
        alert(err)
      })
  }
}

export default mutations
