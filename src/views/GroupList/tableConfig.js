import moment from 'moment'

export default [
  {
    type: 'expand',
    scopedSlot: 'expand'
  },
  {
    label: '头像',
    width: 120,
    align: 'center',
    scopedSlot: 'avatar'
  },
  {
    prop: 'groupName',
    label: '群名称'
  },
  {
    prop: 'peopleNumber',
    label: '群人数'
  },
  {
    prop: 'createTime',
    label: '申请时间',
    formatter: (row, column, value) => value
      ? moment(value).format('YYYY年MM月DD日')
      : ''
  },
  {
    prop: 'city',
    label: '归属地'
  },
  {
    label: '审核状态',
    scopedSlot: 'handle',
    align: 'center'
  }
]
