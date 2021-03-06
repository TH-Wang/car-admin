import TableDisplay from '@/components/TableDisplay'
import DropdownButton from '@/components/DropdownButton'
import StateFilter from '@/components/StateFilter'
import SearchAddress from '@/components/SearchAddress'
import DynamicField from '@/components/DynamicField'
import FormUpload from '@/components/FormUpload'

export default {
  install: function (Vue) {
    Vue.use(TableDisplay)
    Vue.use(DropdownButton)
    Vue.use(StateFilter)
    Vue.use(DynamicField)
    Vue.use(SearchAddress)
    Vue.use(FormUpload)
  }
}
