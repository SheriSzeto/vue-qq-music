<template>
  <div class="music">
    <div class="music-content">
      <div class="music-left">
        <music-btn></music-btn>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="music-list"></router-view>
        </keep-alive>
        <router-view
          v-if="!$route.meta.keepAlive"
          :key="$route.path"
          class="music-list"></router-view>
      </div>
      <div class="music-right" :class="{ show: lyricVisible }">
        <div class="close-lyric" @click="handleCloseLyric">关闭歌词</div>
        <lyric
          ref="lyric"
          :lyric="lyric"
          :nolyric="nolyric"
          :lyric-index="lyricIndex"></lyric>
      </div>
    </div>

    <!-- 播放器 -->
    <div 
      class="music-bar"
      :class="{ disable: !musicReady || !currentMusic.id }"
    >
      <div class="music-bar-btns">

      </div>
    </div>

    <!-- 遮罩 -->
    <div class="player-bg" :style="{ backgroundImage: picUrl }"></div>
    <div class="player-mask"></div>
  </div>
</template>
<script>
import MusicBtn from '@/components/music-btn/music-btn'
import {
  silencePrmise
} from '@/utils/utils'
export default {
  name: 'Music',
  components: {
    MusicBtn
  },
  data() {
    const volume = getVolume()
    return {
      musicReady: false, // 是否可以使用播放器
      currentTime: 0, // 当前播放时间
      currentProgress: 0, // 当前缓冲进度
      lyricVisible: false, // 移动端歌词显示
      lyric: [], // 歌词
      nolyric: false, // 是否有歌词
      lyricIndex: 0, // 当前播放歌词下标
      isMute: false, // 是否静音
      volume // 音量大小
    }
  },
  watch: {
    currentMusic(newMusic, oldMusic) {
      if (!newMusic.id) {
        return this.lyric = []
      }
      if (newMusic.id === oldMusic.id) return
      this.audioEle.src = newMusic.url
      // 重置相关参数
      this.lyricIndex = this.currentTime = this.currentProgress = 0
      silencePrmise(this.audioEle.play())
    }
  }
}
</script>
<style lang="less" scoped>
.music {
  padding: 75px 25px 25px 25px;
  width: 100%;
  max-width: 1750px;
  margin: 0 auto;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  .music-content {
    display: flex;
    width: 100%;
    height: calc(~'100% - 80px');
    .music-left {
      flex: 1;
      height: 100%;
      overflow: hidden;
      .music-list {
        height: calc(~'100% - 60px');
      }
    }
    .music-right {
      position: relative;
      width: 310px;
      margin-left: 10px;
      .close-lyric {
        position: absolute;
        top: 0;
        z-index: 1;
        cursor: pointer;
      }
    }
  }

  /*遮罩*/
  .player-mask,
  .player-bg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  .player-mask {
    z-index: -1;
    background-color: @mask_color;
  }

  .player-bg {
    z-index: -2;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(12px);
    opacity: 0.7;
    transition: all 0.8s;
    transform: scale(1.1);
  }

}
</style>
