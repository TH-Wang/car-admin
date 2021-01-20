import moment from 'moment'

export default [
  {
    type: 'expand',
    scopedSlot: 'expand'
  },
  {
    prop: 'userName',
    label: '真实姓名'
  },
  {
    prop: 'userIdentity',
    label: '身份证号'
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
