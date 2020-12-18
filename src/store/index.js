import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import song from './modules/song'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: {
      namespaced: true,
      ...user
    },
    song: {
      namespaced: true,
      ...song
    }
  }
})
