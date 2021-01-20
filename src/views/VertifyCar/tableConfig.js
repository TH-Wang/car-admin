import moment from 'moment'

export default [
  {
    type: 'expand',
    scopedSlot: 'expand'
  },
  {
    prop: 'carModel',
    label: '车型'
  },
  {
    prop: 'carNumber',
    label: '车牌号码'
  },
  {
    prop: 'carColour',
    label: '颜色'
  },
  {
    prop: 'carSeat',
    label: '座位'
  },
  {
    prop: 'createTime',
    label: '上传时间',
    formatter: (row, column, value) => moment(value).format('YYYY/MM/DD HH:mm')
  },
  {
    label: '审核状态',
    scopedSlot: 'check',
    align: 'center'
  }
]
