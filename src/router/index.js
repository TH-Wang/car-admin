import Vue from 'vue'
import VueRouter from 'vue-router'
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
    component: () => import(/* webpackChunkName: "BasicLayout" */ '@/layouts/BasicLayout'),
    children: [
      {
        path: '/admin/order/list',
        name: 'OrderList',
        component: () => import(/* webpackChunkName: "OrderList" */ '@/views/OrderList')
      },
      {
        path: '/admin/order/create',
        name: 'OrderCreate',
        component: () => import(/* webpackChunkName: "OrderCreate" */ '@/views/OrderCreate')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
