// pagination render
// use 'this' together with index

export default function (h) {
  const _this_ = this
  const { data, size, stripe, border, columns } = this
  return h(
    'el-table',
    {
      props: { data, size, stripe, border },
      directives: [
        { name: 'loading', value: _this_.loading }
      ]
    },
    columns.map(item => h(
      'el-table-column',
      {
        props: item,
        scopedSlots: item.scopedSlot ? {
          default: _this_.$scopedSlots[item.scopedSlot]
        } : null
      }
    ))
  )
}
