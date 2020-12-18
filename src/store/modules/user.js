import { getUserId, setUserId } from '@/utils/storage'
import { SET_UID } from '../mutation-types'

const state = {
  uid: getUserId() || null
}

const mutations = {
  [SET_UID] (state, uid) {
    state.uid = uid
  }
}

const actions = {
  // 设置网易云用户UID
  setUid ({ commit }, uid) {
    commit(SET_UID, setUserId(uid))
  }
}

export default {
  state,
  actions,
  mutations
}
