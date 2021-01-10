import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import elementConfig from './config/element-ui'
import antdvConfig from './config/ant-design-vue'
import TableDisplay from './components/TableDisplay'
import './global.scss'
// import './mock/index'

Vue.config.productionTip = false
Vue.prototype.$api = api

// element-ui
elementConfig(Vue)
// antd-vue
antdvConfig(Vue)
// 自定义
Vue.use(TableDisplay)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
