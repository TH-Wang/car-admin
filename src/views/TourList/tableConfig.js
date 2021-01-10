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
    prop: 'details',
    label: '名称'
  },
  {
    prop: 'creationTime',
    label: '添加时间',
    align: 'center',
    formatter: (row, column, value, index) => moment(value).format('YYYY年MM月DD日')
  },
  {
    prop: 'destination',
    label: '目的地',
    align: 'center'
  },
  {
    label: '往返时间',
    scopedSlot: 'time',
    align: 'center'
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
    label: '操作',
    scopedSlot: 'handle'
  }
]
