export default [
  {
    key: '1',
    title: '用户管理',
    icon: 'user',
    path: '/admin/user'
  },
  {
    key: '2',
    title: '路线管理',
    icon: 'rise',
    path: '/admin/line'
  },
  // {
  //   key: '3',
  //   title: '订单管理',
  //   icon: 'snippets',
  //   path: '/admin/order'
  // },
  {
    key: '4',
    title: '旅游管理',
    icon: 'camera',
    children: [
      { key: '4-1', title: '旅游类别', path: '/admin/tour/type' },
      { key: '4-2', title: '旅游列表', path: '/admin/tour' },
      { key: '4-3', title: '旅游订单', path: '/admin/tour/order' }
    ]
  },
  {
    key: '5',
    title: '包车管理',
    icon: 'car',
    children: [
      { key: '5-1', title: '包车类别', path: '/admin/bus/type' },
      { key: '5-2', title: '包车列表', path: '/admin/bus' },
      { key: '5-3', title: '包车订单', path: '/admin/bus/order' }
    ]
  },
  {
    key: '6',
    title: '审核管理',
    icon: 'carry-out',
    children: [
      { key: '6-1', title: '拼车群审核', path: '/admin/check/group' },
      { key: '6-2', title: '站长审核', path: '/admin/check/station' }
    ]
  },
  {
    key: '7',
    title: '诚信值管理',
    icon: 'file-protect',
    path: '/admin/faithful'
  },
  {
    key: '8',
    title: '收益比例',
    icon: 'pay-circle',
    path: '/admin/ratio'
  }
]
