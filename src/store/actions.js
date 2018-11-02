import axios from 'axios'
import Promise from 'bluebird' // solve promise error put(...).then(...).catch(...).finally is not a function
import 'core-js/fn/promise/finally' // add the polyfill to make the feature available in all browsers.

const actions = {
  LOGOUT: function (context) {
    context.commit('REMOVE_USER_ID')
  },

  GET_TASKS_OF_ALL: function (context) {
    axios.get('/task/user/' + localStorage.getItem('userId'))
      .then(data => {
        console.info('=> GETTING TASKS OF ALL OF USER ' + localStorage.getItem('userId'))
        context.commit('SET_TASKS_LIST', data.data)
      }).catch(err => {
        console.log('=> ENCOUNTER ERR: ' + err)
      })
  },

  UPDATE_ONE_TASK: function (context, [id, updateValue]) {
    console.log(id, updateValue)
    axios.post('/task/' + id, new URLSearchParams(updateValue))
      .then(() => {
        console.log('=> UPDATE DATA TO..', updateValue)
      }).catch(err => {
        console.log(('=> ENCOUNTER ERR WHEN TRYING UPDATE TO ', err))
      })
  },

  CHANGE_DONE_STATUS: function (context, id) {
    let updatedTask = context.getters.GET_TASK_BY_ID(id)
    let _form = new URLSearchParams({ isDone: !updatedTask.isDone })
    axios.put('/task/' + id, _form)
      .then(data => {
        if (data.status === 200) { console.info('=> UPDATING SUCCESS') }
      })
      .then(() => {
        context.dispatch('GET_TASKS_OF_ALL')
      })
      .catch(err => { console.log('=> ENCOUNTER ERROR: ' + err) })
      .finally(() => {
        console.log('==> GET TASK LIST AFTER UPDATED')
      })
  },

  DELETE_ONE_TASK: function (context, id) {
    return new Promise((resolve) => {
      resolve(
        axios.delete('/task/' + id)
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
    axios.post('/task/user/' + localStorage.getItem('userId'), form)
      .then(data => {
        if (data.status === 201) {
          console.log('==> TASK CREATED')
          context.dispatch('GET_TASKS_OF_ALL')
        }
      }).catch(err => { console.log(err); alert(err) })
  },

  GET_USER_DASH: function (context) {
    axios.get('/dash/' + localStorage.getItem('userId'))
      .then(data => {
        console.log('==> GETTING USER DASH STATUS')
        context.commit('SET_USER_DASH', data.data)
      })
  }
}

export default actions
