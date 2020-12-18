<template>
  <transition name="toast-fade">
    <div v-show="visible" class="toast" :class="positionClass">{{ message }}</div>
  </transition>
</template>
<script>
export default {
  name: 'toast',
  data () {
    return {
      position: 'center',
      message: '',
      duration: 1500,
      visible: false
    }
  },
  computed: {
    positionClass () {
      return 'toast-' + this.position
    }
  }
}
</script>
<style lang="less" scoped>
@prefix-cls: toast;

.@{prefix-cls} {
  position: fixed;
  left: 50%;
  z-index: 1996;
  max-width: 80%;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px 20px;
  overflow: hidden;
  text-align: center;
  min-height: 40px;
  line-height: 20px;
  font-size: 14px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  user-select: none;
  transform: translateX(-50%);
  &&-top {
    top: 10%;
  }
  &&-center {
    top: 50%;
    margin-top: -20px;
  }
  &&-bottom {
    bottom: 10%;
  }
}
</style>
