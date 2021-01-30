import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import elementConfig from './config/element-ui'
import antdvConfig from './config/ant-design-vue'
import globalComponents from './config/global-components'
import './global.scss'
// import './mock/index'

Vue.config.productionTip = false
Vue.prototype.$api = api

// element-ui
Vue.use(elementConfig)
// antd-vue
Vue.use(antdvConfig)
// 自定义
Vue.use(globalComponents)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
