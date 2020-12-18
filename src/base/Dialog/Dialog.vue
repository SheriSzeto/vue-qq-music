<template>
  <!-- 对话框 -->
  <transition name="dialog-fade">
    <div v-show="dialogShow" class="dialog-box">
      <div class="dialog-wrapper">
        <div class="dialog-content">
          <div class="dialog-head" v-text="headText"></div>
          <slot>
            <div class="dialog-text" v-html="bodyText"></div>
          </slot>
          <div class="dialog-btns">
            <div
              v-if="dialogType!=='alert'"
              class="btn-cancel"
              v-text="cancelBtnText"
              @click="cancel">
            </div>
            <slot name="btn"></slot>
            <div
              class="btn-confirm"
              v-text="confirmBtnText"
              @click="confirm"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'dialog',
  props: {
    type: {
      type: String,
      default: 'confirm'
    },
    headText: {
      type: String,
      default: '提示'
    },
    bodyText: {
      type: String,
      default: ''
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dialogShow: false
    }
  },
  watch: {
    dialogShow (val) {
      if (val && this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
  },
  mounted () {
    console.log('ele', this)
    if (this.dialogShow && this.appendToBody) {
      document.body.appendChild(this.$el)
    }
  },
  destroyed () {
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  methods: {
    // 显示
    show () {
      this.dialogShow = true
    },
    hide () {
      this.dialogShow = false
    },
    cancel () {
      this.hide()
      this.$emit('cancel')
    },
    confirm () {
      this.hide()
      this.$emit('confirm')
    }
  }
}
</script>
<style lang="less" scoped>
@dialog-prefix-cls: dialog;
.@{dialog-prefix-cls}-box {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10000;
  background-color: @dialog_bg_color;
  user-select: none;
  &.@{dialog-prefix-cls}-fade-enter-active {
    animation: dialog-fadein 0.3s;
    .@{dialog-prefix-cls}-content {
      animation: dialog-zoom 0.3s;
    }
  }
  .@{dialog-prefix-cls}-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
    .@{dialog-prefix-cls}-content {
      width: 420px;
      border-radius: 5px;
      background: @dialog_content_bg_color;
      @media (max-width: 767px) {
        width: 270px;
        border-radius: 10px;
        text-align: center;
      }
      .@{dialog-prefix-cls}-head {
        padding: 15px;
        padding-bottom: 0;
        font-size: @font_size_large;
        color: @text_color_active;
      }
      .@{dialog-prefix-cls}-text {
        padding: 20px 15px;
        line-height: 22px;
        font-size: @font_size_medium;
        color: @dialog_text_color;
      }
      .@{dialog-prefix-cls}-btns {
        display: flex;
        align-items: center;
        padding: 0 15px 10px;
        text-align: center;
        color: @dialog_text_color;
        @media (min-width: 768px) {
          justify-content: flex-end;
          div {
            display: block;
            padding: 8px 15px;
            border-radius: 3px;
            border: 1px solid @btn_color;
            font-size: @font_size_medium;
            cursor: pointer;
            &:not(:nth-of-type(1)) {
              margin-left: 10px;
            }
            &.btn-confirm {
              border-style: @btn_color_active;
            }
            &:hover {
              color: @text_color_active;
              border: 1px solid @btn_color_active;
            }
          }
        }
        @media (max-width: 767px) {
          & {
            padding: 0;
            justify-content: center;
            div {
              flex: 1;
              line-height: 22px;
              padding: 10px 0;
              border-top: 1px solid @dialog_line_color;
              font-size: @font_size_large;
              &:not(:nth-of-type(1)) {
                border-left: 1px solid @dialog_line_color;
              }
            }
          }
        }
      }
    }
  }
}
@keyframes dialog-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes dialog-zoom {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
