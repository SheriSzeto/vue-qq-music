const _storage = window.localStorage
const storage = {
  get (key, data = []) {
    if (_storage) {
      return _storage.getItem(key)
        ? Array.isArray(data)
          ? JSON.parse(_storage.getItem(key))
          : _storage.getItem(key)
        : data
    }
  },
  set (key, val) {
    if (_storage) {
      _storage.setItem(key, val)
    }
  },
  clear (key) {
    if (_storage) {
      _storage.removeItem(key)
    }
  }
}

/**
 * 网易云用户uid
 * @type USERID_KEY：key值
 */
const USERID_KEY = '__player_userID__'
// 获取用户uid
export function getUserId () {
  return Number(storage.get(USERID_KEY, null))
}
// 修改用户uid
export function setUserId (uid) {
  storage.set(USERID_KEY, uid)
  return uid
}
