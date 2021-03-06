import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Guide from '@/layouts/GuideLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Guide',
    component: Guide
  },
  {
    path: '/user',
    name: 'UserLayout',
    component: () => import(/* webpackChunkName: "UserLayout" */ '@/layouts/UserLayout')
  },
  {
    path: '/admin',
    name: 'BasicLayout',
    redirect: '/admin/user',
    component: () => import(/* webpackChunkName: "BasicLayout" */ '@/layouts/BasicLayout'),
    children: [
      { // 用户列表
        path: '/admin/user',
        name: 'UserList',
        component: () => import(/* webpackChunkName: "UserList" */ '@/views/UserList')
      },
      { // 身份证验证列表
        path: '/admin/identity',
        name: 'VertifyIdentity',
        component: () => import(
          /* webpackChunkName: "VertifyIdentity" */ '@/views/VertifyIdentity'
        )
      },
      { // 驾驶证验证列表
        path: '/admin/driving',
        name: 'VertifyDriving',
        component: () => import(
          /* webpackChunkName: "VertifyDriving" */ '@/views/VertifyDriving'
        )
      },
      { // 车辆验证列表
        path: '/admin/vertifyCar',
        name: 'VertifyCar',
        component: () => import(
          /* webpackChunkName: "VertifyCar" */ '@/views/VertifyCar'
        )
      },
      // { // 订单列表
      //   path: '/admin/order',
      //   name: 'OrderList',
      //   component: () => import(/* webpackChunkName: "OrderList" */ '@/views/OrderList')
      // },
      { // 路线列表
        path: '/admin/line',
        name: 'LineList',
        component: () => import(/* webpackChunkName: "LineList" */ '@/views/LineList')
      },
      { // 车主发布列表
        path: '/admin/publish/driver',
        name: 'DriverPublish',
        component: () => import(/* webpackChunkName: "DriverPublish" */ '@/views/DriverPublish')
      },
      { // 乘客发布列表
        path: '/admin/publish/customer',
        name: 'CustomerPublish',
        component: () => import(/* webpackChunkName: "CustomerPublish" */ '@/views/CustomerPublish')
      },
      { // 旅游列表
        path: '/admin/tour',
        name: 'TourList',
        component: () => import(/* webpackChunkName: "TourList" */ '@/views/TourList')
      },
      { // 旅游分类列表
        path: '/admin/tour/type',
        name: 'TourType',
        component: () => import(/* webpackChunkName: "TourType" */ '@/views/TourType')
      },
      { // 旅游订单列表
        path: '/admin/tour/order',
        name: 'TourOrderList',
        component: () => import(/* webpackChunkName: "TourOrderList" */ '@/views/TourOrderList')
      },
      { // 包车列表
        path: '/admin/bus',
        name: 'BusList',
        component: () => import(/* webpackChunkName: "BusList" */ '@/views/BusList')
      },
      { // 包车分类列表
        path: '/admin/bus/type',
        name: 'BusType',
        component: () => import(/* webpackChunkName: "BusType" */ '@/views/BusType')
      },
      { // 包车订单列表
        path: '/admin/bus/order',
        name: 'BusOrderList',
        component: () => import(/* webpackChunkName: "BusOrderList" */ '@/views/BusOrderList')
      },
      { // 拼车群审核列表
        path: '/admin/check/group',
        name: 'GroupList',
        component: () => import(/* webpackChunkName: "GroupList" */ '@/views/GroupList')
      },
      { // 站长审核列表
        path: '/admin/check/station',
        name: 'StationList',
        component: () => import(/* webpackChunkName: "StationList" */ '@/views/StationList')
      },
      { // 诚信值规则列表
        path: '/admin/faithful',
        name: 'FaithfulList',
        component: () => import(/* webpackChunkName: "FaithfulList" */ '@/views/FaithfulList')
      },
      { // 收益比例规则列表
        path: '/admin/ratio',
        name: 'RatioList',
        component: () => import(/* webpackChunkName: "RatioList" */ '@/views/RatioList')
      },
      { // 客服信息管理
        path: '/admin/service',
        name: 'ServiceConfig',
        component: () => import(/* webpackChunkName: "ServiceConfig" */ '@/views/ServiceConfig')
      },
      { // 用户申诉列表
        path: '/admin/complaint',
        name: 'ComplaintList',
        component: () => import(/* webpackChunkName: "ComplaintList" */ '@/views/ComplaintList')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (/^\/admin/.test(to.path) && !store.state.auth.userId) {
    next('/')
    return
  }
  next()
})

export default router
