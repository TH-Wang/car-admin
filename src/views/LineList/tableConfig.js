export default [
  {
    label: '序列',
    type: 'index',
    align: 'center',
    width: 60
  },
  {
    prop: 'startAddr',
    label: '出发地点'
  },
  {
    prop: 'endAddr',
    label: '目的地'
  },
  {
    prop: 'publishType',
    lable: '类型',
    scopedSlot: 'type'
  },
  { label: '操作', scopedSlot: 'handle' }
]
