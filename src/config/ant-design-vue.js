import {
  Menu as AMenu,
  Icon as AIcon,
  Spin as ASpin,
  Tag as ATag,
  Space as ASpace,
  Modal as AModal,
  message as AMessage
} from 'ant-design-vue'

export default function (Vue) {
  Vue.use(AMenu)
  Vue.use(AIcon)
  Vue.use(ASpin)
  Vue.use(ATag)
  Vue.use(ASpace)
  Vue.use(AModal)

  Vue.prototype.$message = AMessage
}
