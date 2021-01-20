import moment from 'moment'

export default [
  {
    type: 'expand',
    scopedSlot: 'expand'
  },
  {
    label: '申诉类型',
    scopedSlot: 'type',
    align: 'center',
    width: 200
  },
  {
    prop: 'remark',
    label: '问题描述'
  },
  {
    prop: 'createTime',
    label: '申诉时间',
    width: 250,
    align: 'center',
    formatter: (row, column, value) => moment(value).format('YYYY/MM/DD HH:mm')
  }
]
