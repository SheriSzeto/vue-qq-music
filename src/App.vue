<template>
  <div id="app">
    <Header />
    <router-view class="router-view"></router-view>
    <!-- 播放器 -->
    <audio ref="player"></audio>
  </div>
</template>
<script>
import Header from '@/components/Header'
import { defaultSheetId } from '@/config'
import { getPlaylistDetail } from '@/api'
import { mapActions } from 'vuex'
export default {
  components: {
    Header
  },
  created () {
    // 获取正在播放列表
    getPlaylistDetail(defaultSheetId).then(playlist => {
      const list = playlist.tracks.slice(0, 100)
      this.setPlaylist({ list })
    })
  },
  methods: {
    ...mapActions('song', ['setPlaylist'])
  }
}
</script>
<style lang="less" scoped>
#app {
  position: relative;
  width: 100%;
  height: 100%;
  color: @text_color;
  font-size: @font_size_medium;

  .router-view {
    width: 100%;
    height: 100%;
  }

  audio {
    position: fixed;
  }
}
</style>
