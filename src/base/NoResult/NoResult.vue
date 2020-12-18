<template>
  <div class="no-result">
    <p class="no-result-text">{{ title }}</p>
  </div>
</template>
<script>
export default {
  name: 'NoResult',
  props: {
    title: {
      type: String,
      default: ''
    }
  }

}
</script>
<style lang="less" scoped>
.no-result {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  &-text {
    margin-top: 30px;
    font-size: @font_size_medium;
    color: @text_color;
  }
}
</style>
