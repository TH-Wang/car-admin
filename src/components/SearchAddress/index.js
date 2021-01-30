import SearchAddress from './SearchAddress'

// const datas = []

// const test = {
//   data: () => ({
//     value: ''
//   }),
//   methods: {
//     handleSelect (data) {
//       this.$emit('change', data)
//     },
//     // handleChange (str) {
//     //   this.value = str
//     // },
//     async queryAddress (str, resolve) {
//       this.value = str
//       setTimeout(() => {
//         resolve(datas || [])
//       }, 1000)
//     }
//   },
//   render (h) {
//     const { $props, value, queryAddress } = this
//     return h(
//       'el-autocomplete',
//       {
//         props: {
//           value,
//           clearable: true,
//           placeholder: '请搜索地点',
//           ...$props,
//           'fetch-suggestions': queryAddress
//         },
//         on: {
//           // select: handleSelect,
//           // change: handleChange
//         }
//       }
//     )
//   }
// }

export default {
  install: function (Vue) {
    Vue.component('search-address', SearchAddress)
  }
}
