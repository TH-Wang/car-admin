import {
  Button as ElButton,
  ButtonGroup as ElButtonGroup,
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
  Upload as ElUpload,
  DatePicker as ElDatePicker,
  Cascader as ElCascader,
  Autocomplete as ElAutocomplete,
  Table as ElTable,
  TableColumn as ElTableColumn,
  Pagination as ElPagination,
  Popconfirm as ElPopconfirm,
  Popover as ElPopover,
  Avatar as ElAvatar,
  Image as ElImage,
  Dialog as ElDialog,
  Dropdown as ElDropdown,
  DropdownMenu as ElDropdownMenu,
  DropdownItem as ElDropdownItem,
  Loading
} from 'element-ui'

export default {
  install: function (Vue) {
    Vue.use(ElButton)
    Vue.use(ElButtonGroup)
    Vue.use(ElContainer)
    Vue.use(ElHeader)
    Vue.use(ElAside)
    Vue.use(ElMain)
    Vue.use(ElForm)
    Vue.use(ElFormItem)
    Vue.use(ElInput)
    Vue.use(ElSelect)
    Vue.use(ElOption)
    Vue.use(ElUpload)
    Vue.use(ElCheckbox)
    Vue.use(ElDatePicker)
    Vue.use(ElCascader)
    Vue.use(ElAutocomplete)
    Vue.use(ElTable)
    Vue.use(ElTableColumn)
    Vue.use(ElPagination)
    Vue.use(ElPopconfirm)
    Vue.use(ElPopover)
    Vue.use(ElAvatar)
    Vue.use(ElImage)
    Vue.use(ElDialog)
    Vue.use(ElDropdown)
    Vue.use(ElDropdownMenu)
    Vue.use(ElDropdownItem)
    Vue.use(Loading.directive)
  }
}
