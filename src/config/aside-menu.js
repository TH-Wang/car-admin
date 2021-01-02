export default [
  {
    key: '1',
    title: '用户管理',
    icon: 'user'
  },
  {
    key: '2',
    title: '订单管理',
    icon: 'snippets',
    children: [
      { key: '2-1', title: '发布订单', path: '/admin/order/create' },
      { key: '2-2', title: '查看订单', path: '/admin/order/list' }
    ]
  }
]
