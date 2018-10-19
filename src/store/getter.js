import state from '@/store/state'

const getters = {
  getIfDrawer: function () {
    console.log(state.ifDrawer)
  }
}

export default getters
