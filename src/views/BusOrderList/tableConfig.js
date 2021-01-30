import moment from 'moment'

export default [
  {
    type: 'expand',
    width: 80,
    scopedSlot: 'expand'
  },
  {
    prop: 'orderNo',
    label: '订单号'
  },
  {
    prop: 'userName',
    label: '联系人'
  },
  {
    prop: 'userNum',
    label: '人数'
  },
  {
    prop: 'startTime',
    label: '使用时间',
    formatter: (row, column, value) => moment(value).format('MM月DD日 HH:mm')
  },
  {
    label: '支付状态',
    scopedSlot: 'state'
  }
]
