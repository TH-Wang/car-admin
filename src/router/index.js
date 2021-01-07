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
      // { // 订单列表
      //   path: '/admin/order',
      //   name: 'OrderList',
      //   component: () => import(/* webpackChunkName: "OrderList" */ '@/views/OrderList')
      // },
      { // 路线列表
        path: '/admin/line',
        name: 'LineList',
        component: () => import(/* webpackChunkName: "LineList" */ '@/views/LineList')
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
