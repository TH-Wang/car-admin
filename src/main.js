import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import less from 'less'
import {
  Container as ElContainer,
  Header as ElHeader,
  Aside as ElAside,
  Main as ElMain
} from 'element-ui'
import {
  Menu as AMenu,
  Icon as AIcon,
  Spin as ASpin
} from 'ant-design-vue'

Vue.config.productionTip = false
// Vue.use(less)

// element-ui
Vue.use(ElContainer)
Vue.use(ElHeader)
Vue.use(ElAside)
Vue.use(ElMain)

// antd-vue
Vue.use(AMenu)
Vue.use(AIcon)
Vue.use(ASpin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
