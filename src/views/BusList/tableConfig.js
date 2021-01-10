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
    prop: 'carName',
    label: '车型'
  },
  {
    prop: 'price',
    label: '价格',
    formatter: (row, column, value, index) => '￥' + value
  },
  {
    prop: 'salesVolume',
    label: '销售量'
  },
  {
    prop: 'creationTime',
    label: '添加时间',
    formatter: (row, column, value, index) => moment(value).format('YYYY年MM月DD日')
  },
  {
    label: '操作',
    scopedSlot: 'handle'
  }
]
