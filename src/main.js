import Vue from 'vue'

import App from './App.vue'

import router from './router'

// 全局样式引入
import './styles/index.less'

// 引入 elementui 组件库
import ElementUI from 'element-ui'

// 引入 elementui 组件库 样式
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

// 全局注册 elementui 组件库
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
