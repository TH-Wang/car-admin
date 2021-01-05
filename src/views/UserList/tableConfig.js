const config = [
  {
    label: '序列',
    type: 'index',
    align: 'center',
    width: 60
  },
  {
    prop: 'headimg',
    label: '头像',
    width: 120,
    align: 'center',
    scopedSlot: 'avatar'
  },
  {
    prop: 'username',
    label: '用户名',
    align: 'center'
  },
  {
    prop: 'phone',
    label: '手机号码'
  },
  {
    prop: 'totalPrice',
    label: '余额',
    formatter: (row, column, cellValue, index) => {
      return '￥' + cellValue
    }
  },
  {
    prop: 'faithfulValue',
    label: '信用分'
  },
  {
    label: '认证信息',
    scopedSlot: 'auth',
    width: 220
  },
  { label: '操作', scopedSlot: 'handle' }
]

export default config
