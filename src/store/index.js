import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import state from './state'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
