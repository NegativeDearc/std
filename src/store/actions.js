import axios from 'axios'
import Promise from 'bluebird' // solve promise error put(...).then(...).catch(...).finally is not a function
import 'core-js/fn/promise/finally' // add the polyfill to make the feature available in all browsers.

const actions = {
  LOGIN: function (context, data) {
    if (!localStorage.getItem('userId')) {
      axios.post('http://localhost:4000/api/auth/login', data)
        .then(res => {
          if (res.status === 200) {
            context.commit('SET_USER_ID', res.data.loginUserId)
            console.log('=> LOG IN SUCCESS OF USER: ' + localStorage.getItem('userId'))
          }
        }).catch(err => {
          console.log('=> LOGIN FAILED WITH ERROR: ' + err)
          alert(err)
        })
    }
  },
  LOGOUT: function (context) {
    // console.log(window.localStorage.getItem('userId'))
    context.commit('REMOVE_USER_ID')
  },

  GET_TASKS_OF_ALL: function (context) {
    return new Promise(resolve => {
      resolve(
        axios.get('http://localhost:4000/api/task/user/' + localStorage.getItem('userId'))
          .then(data => {
            console.info('=> GETTING TASKS OF ALL OF USER ' + localStorage.getItem('userId'))
            context.commit('SET_TASKS_LIST', data.data)
          }).catch(err => {
            console.log('=> ENCOUNTER ERR: ' + err)
          })
      )
    })
  },

  UPDATE_ONE_TASK: function (context, [id, updateValue]) {
    console.log(id, updateValue)
    axios.post('http://localhost:4000/api/task/' + id, updateValue)
      .then(() => {
        console.log('=> UPDATE DATA TO..', updateValue)
      }).catch(err => {
        console.log(('=> ENCOUNTER ERR WHEN TRYING UPDATE TO ', err))
      })
  },

  CHANGE_DONE_STATUS: function (context, id) {
    context.commit('CHANGE_DONE_STATUS_BY_ID', id)
    let updatedTask = context.getters.GET_TASK_BY_ID(id)
    // sync with database
    console.info('=> UPDATING TASK ID ' + id, 'VALUE isDone TO ' + updatedTask.isDone)
    // update finishAt when isDone is true
    updatedTask.isDone
      ? updatedTask.punchTime = new Date()
      : updatedTask.punchTime = null

    axios.put('http://localhost:4000/api/task/' + id, updatedTask)
      .then(data => {
        if (data.status === 200) {
          console.info('=> UPDATING SUCCESS')
        }
      })
      .catch(err => { console.log('=> ENCOUNTER ERROR: ' + err) })
      .finally(() => {
        console.log('==> GET TASK LIST AFTER UPDATED')
        context.dispatch('GET_TASKS_OF_ALL')
      })
  },

  DELETE_ONE_TASK: function (context, id) {
    return new Promise((resolve) => {
      resolve(
        axios.delete('http://localhost:4000/api/task/' + id)
          .then(data => {
            console.log('=> DELETING TASK...' + data.data)
          }).catch(err => {
            alert(err)
          })
      )
    })
  },

  async UPDATE_AFTER_DELETE (context, id) {
    /*
     combine two asynchronous actions together MUST use async/await to control sequence
     first delete task then update data in stores
      */
    await context.dispatch('DELETE_ONE_TASK', id)
    context.dispatch('GET_TASKS_OF_ALL')
  },

  CREATE_NEW_TASK: function (context, form) {
    axios.post('http://localhost:4000/api/task/user/' + window.localStorage.getItem('userId'), form)
      .then(data => {
        if (data.status === 201) {
          console.log('==> TASK CREATED')
          context.dispatch('GET_TASKS_OF_ALL')
        }
      }).catch(err => { console.log(err) })
  }
}

export default actions
