import axios from 'axios'

const actions = {
  LOGIN: function (context, data) {
    console.log(data)
    axios.post('http://localhost:4000/api/auth/login', data)
      .then(res => {
        if (res.status === 200) {
          console.log('=> LOG IN SUCCESS OF USER: ' + res.data.loginUserId)
          context.commit('SET_USER_ID', res.data.loginUserId)
        }
      }).catch(err => {
        console.log('=> LOGIN FAILED WITH ERROR: ' + err)
        alert(err)
      })
  },
  LOGOUT: function (context) {
    console.log(window.localStorage.getItem('userId'))
    context.commit('REMOVE_USER_ID')
  }
}

export default actions
