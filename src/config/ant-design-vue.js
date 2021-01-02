import {
  Menu as AMenu,
  Icon as AIcon,
  Spin as ASpin,
  Tag as ATag,
  Space as ASpace,
  message as AMessage
} from 'ant-design-vue'

export default function (Vue) {
  Vue.use(AMenu)
  Vue.use(AIcon)
  Vue.use(ASpin)
  Vue.use(ATag)
  Vue.use(ASpace)

  Vue.prototype.$message = AMessage
}
