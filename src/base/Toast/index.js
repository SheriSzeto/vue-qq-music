// 将toast方法挂载到Vue上，用原型对象继承
import TempToast from './Toast.vue'

let instance
let showToast = false
let time
const Toast = {
  install (Vue, options = {}) {
    const opt = TempToast.data() // 获取默认配置
    Object.assign(opt, options)
    Vue.prototype.$toast = (message, position) => {
      if (showToast) {
        clearTimeout(time)
        instance.vm.visible = showToast = false
        document.body.removeChild(instance.vm.$el)
      }
      if (message) {
        opt.message = message
      }
      if (position) {
        opt.position = position
      }
      const TempToastConstructor = Vue.extend(TempToast)
      instance = new TempToastConstructor({
        data: opt
      })
      instance.vm = instance.$mount()
      document.body.appendChild(instance.vm.$el)
      instance.vm.visible = showToast = true

      time = setTimeout(() => {
        instance.vm.visible = showToast = false
        document.body.removeChild(instance.vm.$el)
      }, opt.duration)
    }
  }
}

export default Toast
