import axios from 'axios'

const actions = {
  LOGIN: function (context, data) {
    console.log(data)
    axios.post('http://localhost:4000/api/auth/login', data)
      .then(res => {
        if (res.status === 200) {
          console.log(res)
          context.commit('SET_USER_ID', res.data.loginUserId)
        }
      }).catch(err => {
        console.log(err)
        alert(err)
      })
  },
  LOGOUT: function (context) {
    console.log(window.localStorage.getItem('userId'))
    context.commit('REMOVE_USER_ID')
  }
}

export default actions
