import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from './base/Toast'

import '@/styles/index.less'

Vue.config.productionTip = false
// 弹出层
Vue.use(Toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
