import axios from '@/utils/axios'
import { formatTopSongs } from '@/utils/song'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL

// my uid 79020191

// 获取用户歌单详情
export function getUserPlaylist (uid) {
  return axios.get('/user/playlist', {
    params: {
      uid
    }
  })
}

// 获取歌单详情
export function getPlaylistDetail (id) {
  return new Promise((resolve, reject) => {
    axios.get('/playlist/detail', {
      params: { id }
    })
      .then(({ playlist }) => playlist)
      .then(playlist => {
        const { trackIds, tracks } = playlist
        // 过滤歌单，如排行榜
        if (tracks.length === trackIds.length) {
          playlist.tracks = formatTopSongs(playlist.tracks)
        }
      })
  })
}
