import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import state from './state'
import getters from './getter'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
