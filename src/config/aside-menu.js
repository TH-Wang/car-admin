export default [
  {
    key: '1',
    title: '用户管理',
    icon: 'user',
    children: [
      { key: '1-1', title: '用户信息', path: '/admin/user' },
      { key: '1-2', title: '身份证验证', path: '/admin/identity' },
      { key: '1-3', title: '驾驶证验证', path: '/admin/driving' },
      { key: '1-4', title: '车辆验证', path: '/admin/vertifyCar' }
    ]
  },
  {
    key: '2',
    title: '路线管理',
    icon: 'rise',
    path: '/admin/line'
  },
  {
    key: '3',
    title: '信息管理',
    icon: 'snippets',
    children: [
      { key: '3-1', title: '车主发布信息', path: '/admin/publish/driver' },
      { key: '3-2', title: '乘客发布信息', path: '/admin/publish/customer' }
    ]
  },
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
    title: '申诉管理',
    icon: 'warning',
    path: '/admin/complaint'
  },
  {
    key: '8',
    title: '诚信值管理',
    icon: 'file-protect',
    path: '/admin/faithful'
  },
  {
    key: '9',
    title: '收益比例',
    icon: 'pay-circle',
    path: '/admin/ratio'
  },
  {
    key: '10',
    title: '客服管理',
    icon: 'customer-service',
    path: '/admin/service'
  }
]
