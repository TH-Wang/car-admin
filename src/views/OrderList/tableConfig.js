export default [
  {
    prop: 'createAt',
    label: '入驻日期',
    width: 150,
    scopedSlot: 'createAt'
  },
  {
    prop: 'name',
    label: '姓名',
    width: 120,
    align: 'center'
  },
  {
    prop: 'desc',
    label: '介绍'
  },
  {
    prop: 'identity',
    label: '身份',
    width: 100,
    align: 'center',
    scopedSlot: 'identity'
  },
  { label: '操作', scopedSlot: 'handle' }
]
