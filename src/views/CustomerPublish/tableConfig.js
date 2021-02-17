import moment from 'moment'

export default [
  {
    type: 'index',
    width: 60,
    align: 'center'
  },
  {
    prop: 'startAddr',
    label: '出发地点'
    // formatter: (row, column, value, index) => value.find(i => i.type === 1).pointName
  },
  {
    prop: 'endAddr',
    label: '到达地点'
    // formatter: (row, column, value, index) => value.find(i => i.type === 3).pointName
  },
  {
    prop: 'username',
    label: '乘客',
    width: 100
  },
  {
    prop: 'telPhone',
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
    prop: 'orderNum',
    label: '人数',
    width: 100,
    align: 'center',
    formatter: (row, column, value, index) => value + '座'
  },
  {
    prop: 'passengerStartTime',
    label: '出发时间',
    width: 150,
    formatter: (row, column, value, index) => moment(value).format('MM月DD日 HH:mm')
  }
  // {
  //   label: '操作',
  //   scopedSlot: 'handle'
  // }
]
