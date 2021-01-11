import moment from 'moment'

export default [
  {
    type: 'expand',
    scopedSlot: 'expand'
  },
  {
    label: '图片',
    scopedSlot: 'cover'
  },
  {
    label: '类别',
    scopedSlot: 'type'
  },
  {
    prop: 'title',
    label: '名称'
  },
  {
    prop: 'price',
    label: '价格',
    align: 'center',
    formatter: (row, column, value, index) => '￥' + value
  },
  {
    prop: 'salesVolume',
    label: '销售量',
    align: 'center'
  },
  {
    prop: 'creationTime',
    label: '添加时间',
    align: 'center',
    formatter: (row, column, value, index) => moment(value).format('YYYY年MM月DD日')
  },
  {
    label: '操作',
    scopedSlot: 'handle'
  }
]
