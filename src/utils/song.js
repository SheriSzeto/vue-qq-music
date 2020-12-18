import { toHttps } from '@/utils/utils'

function filterSinger (singers) {
  const arr = []
  singers.forEach(item => {
    arr.push(item.name)
  })
  return arr.join('/')
}

export class Song {
  constructor ({ id, name, singer, album, image, duration, url }) {
    this.id = id
    this.name = name
    this.singer = singer
    this.album = album
    this.image = image
    this.duration = duration
    this.url = url
  }
}

export function createTopList (music) {
  return new Song({
    id: music.id,
    name: music.name,
    singer: music.artists.length > 0 && filterSinger(music.artists),
    album: music.ablum.name,
    image: toHttps(music.ablum.picUrl) || null,
    duration: music.duration / 1000,
    url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
  })
}

export const formatToSongs = list => {
  const Songs = []
  list.forEach(item => {
    if (item.id) {
      Songs.push(createTopList(item))
    }
  })
  return Songs
}
