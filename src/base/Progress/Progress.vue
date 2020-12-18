<template>
  <div class="progress" ref="progress" @click="barClick">
    <div class="progress-bar"></div>
    <div class="progress-outer" ref="percentProgress"></div>
    <div class="progress-inner" ref="progressInner">
      <div
        class="progress-dot"
        @mousedown="barDown"
        @touchstart.prevent="barDown"
      ></div>
    </div>
  </div>
</template>

<script>
const dotWidth = 10
export default {
  name: 'progress',
  props: {
    percent: {
      type: [Number],
      default: 0
    }
  },
  percentProgress: {
    type: [Number],
    default: 0
  },
  data () {
    return {
      move: {
        status: false, // 是否可拖动
        startX: 0, // 记录最开始点击的x坐标
        left: 0, // 记录当前已经移动的距离
      }
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >=0 && !this.move.status) {
        const barWidth = this.$refs.progress.clientWidth - dotWidth
        const offsetWidth = newPercent * barWidth
        this.moveSlide(offsetWidth)
      }
    },
    percentProgress(newValue) {
      let offsetWidth = this.$refs.progress.clientWidth * newValue
      this.$refs.percentProgress.style.width = `${offsetWidth}px`
    }
  },
  methods: {
    // 添加绑定事件
    bindEvents () {
      document.addEventListener('mousemove', this.barMove)
      document.addEventListener('mouseup', this.barUp)

      document.addEventListener('touchmove', this.barMove)
      document.addEventListener('touchend', this.barUp)
    },
    unbindEvents () {
      document.removeEventListener('mousemove', this.barMove)
      document.removeEventListener('mouseup', this.barUp)

      document.removeEventListener('touchmove', this.barMove)
      document.removeEventListener('touchend', this.barUp)
    },
    // 点击事件
    barClick (e) {
      let rect = this.$refs.progress.getBoundingClientRect()
      let offsetWidth = Math.min(
        this.$refs.progress.clientWidth - dotWidth,
        Math.max(0, e.clientX - rect.left)
      )
      this.moveSlide(offsetWidth)
      this.commitPercent(true)
    },
    // 鼠标按下事件
    barDown (e) {
      this.move.status = true
      this.move.startX = e.clientX || e.touches[0].pageX
      this.move.left = this.$refs.progressInner.clientWidth
    },
    // 鼠标/ 触摸移动事件
    barMove (e) {
      if (!this.move.status) {
        return false
      }
      e.preventDefault();
      let endX = e.clientX || e.touches[0].pageX
      let dist = endX - this.move.startX
      let offsetWidth = Math.min(
        this.$refs.progress.clientWidth - dotWidth,
        Math.max(0, this.move.left + dist)
      )
      this.moveSlide(offsetWidth)
      this.commitPercent()
    },
    // 鼠标/触摸释放事件
    barUp (e) {
      if (this.move.status) {
        this.commitPercent(true)
        this.move.status = false
      }
    },
    // 移动滑块
    moveSlide (offsetWidth) {
      this.$refs.progressInner.style.width = `${offsetWidth}px`
    },
    // 修改percent
    commitPercent (isEnd = false) {
      const { progress, progressInner } = this.$refs
      const lineWidth = progress.clientWidth - dotWidth
      const percent = progress.clientWidth / lineWidth
      this.$emit(isEnd ? 'percentChangeEnd' : 'percentChange', percent)
    }
  }
}
</script>

<style lang="less" scoped>
.progress {
  position: relative;
  padding: 5px;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  .progress-bar {
    height: 2px;
    width: 100%;
    background: @bar_color;
  }
  .progress-outer {
    position: absolute;
    top: 50%;
    left: 5px;
    display: inline-block;
    width: 0;
    height: 2px;
    margin-top: -1px;
    background: rgba(255, 255, 255, 0.2);
  }
  .progress-inner {
    position: absolute;
    top: 50%;
    left: 5px;
    display: inline-block;
    width: 0;
    height: 2px;
    margin-top: -1px;
    background: @line_color;
    .progress-dot {
      position: absolute;
      top: 50%;
      right: -5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: @dot_color;
      transform: translateY(-50%);
    }
  }
}
</style>

