import { SET_PLAYLIST, SET_ORDERLIST } from '../mutation-types'

const state = {
  playlist: [],
  orderList: [] // 顺序列表
}

const mutations = {
  [SET_PLAYLIST] (state, playlist) {
    state.playlist = playlist
  }
}

const actions = {
  // 设置播放列表
  setPlaylist ({ commit }, { list }) {
    commit(SET_PLAYLIST, list)
    commit(SET_ORDERLIST, list)
  }
}

export default {
  state,
  actions,
  mutations
}
