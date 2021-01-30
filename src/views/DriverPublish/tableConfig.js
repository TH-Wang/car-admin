import moment from 'moment'

export default [
  {
    type: 'expand',
    width: 60,
    scopedSlot: 'expand'
  },
  {
    prop: 'username',
    label: '车主',
    width: 100
  },
  {
    prop: 'carNum',
    label: '车牌号',
    width: 120
  },
  {
    prop: 'mobilePhone',
    label: '联系电话',
    width: 120
  },
  {
    prop: 'cost',
    label: 'A费',
    width: 100,
    align: 'center',
    formatter: (row, column, value, index) => '￥' + value
  },
  {
    prop: 'num',
    label: '余座',
    width: 100,
    align: 'center',
    formatter: (row, column, value, index) => value + '座'
  },
  {
    prop: 'startTime',
    label: '出发时间',
    formatter: (row, column, value, index) => moment(value).format('MM月DD日 HH:mm')
  },
  {
    prop: 'passPointList',
    label: '出发地点',
    formatter: (row, column, value, index) => value.find(i => i.type === 1).pointName
  },
  {
    prop: 'passPointList',
    label: '到达地点',
    formatter: (row, column, value, index) => value.find(i => i.type === 3).pointName
  },
  {
    label: '状态',
    scopedSlot: 'state'
  },
  {
    label: '操作',
    scopedSlot: 'handle'
  }
]
