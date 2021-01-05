import {
  Button as ElButton,
  Container as ElContainer,
  Header as ElHeader,
  Aside as ElAside,
  Main as ElMain,
  Form as ElForm,
  FormItem as ElFormItem,
  Input as ElInput,
  Select as ElSelect,
  Option as ElOption,
  Checkbox as ElCheckbox,
  Table as ElTable,
  TableColumn as ElTableColumn,
  Pagination as ElPagination,
  Popconfirm as ElPopconfirm,
  Popover as ElPopover,
  Avatar as ElAvatar,
  Image as ElImage,
  Loading
} from 'element-ui'

export default function (Vue) {
  Vue.use(ElButton)
  Vue.use(ElContainer)
  Vue.use(ElHeader)
  Vue.use(ElAside)
  Vue.use(ElMain)
  Vue.use(ElForm)
  Vue.use(ElFormItem)
  Vue.use(ElInput)
  Vue.use(ElSelect)
  Vue.use(ElOption)
  Vue.use(ElCheckbox)
  Vue.use(ElTable)
  Vue.use(ElTableColumn)
  Vue.use(ElPagination)
  Vue.use(ElPopconfirm)
  Vue.use(ElPopover)
  Vue.use(ElAvatar)
  Vue.use(ElImage)
  Vue.use(Loading.directive)
}
