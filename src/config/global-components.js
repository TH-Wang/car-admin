import TableDisplay from '@/components/TableDisplay'
import DropdownButton from '@/components/DropdownButton'
import StateFilter from '@/components/StateFilter'
import SearchAddress from '@/components/SearchAddress'

export default {
  install: function (Vue) {
    Vue.use(TableDisplay)
    Vue.use(DropdownButton)
    Vue.use(StateFilter)
    Vue.use(SearchAddress)
  }
}
