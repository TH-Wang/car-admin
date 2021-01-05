// pagination render
// use 'this' together with index

export default function (h) {
  const _this_ = this
  const { pageNum, pageSize, data, size, stripe, border, columns } = this
  return h(
    'el-table',
    {
      props: { data, size, stripe, border },
      scopedSlots: {
        empty: () => h(
          'div', [
            '暂无数据，',
            h('el-button',
              {
                props: { type: 'text' },
                on: { click: () => { this.handleRefresh() } }
              },
              '重新加载'
            )
          ])
      },
      directives: [
        { name: 'loading', value: _this_.loading }
      ]
    },
    columns.map(item => {
      if (item.type === 'index') {
        item.index = (idx) => ((pageNum - 1) * pageSize) + idx + 1
      }
      return h(
        'el-table-column',
        {
          props: item,
          scopedSlots: item.scopedSlot ? {
            default: _this_.$scopedSlots[item.scopedSlot]
          } : null
        }
      )
    })
  )
}
