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
    path: '/admin',
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName: "BasicLayout" */ '../layouts/BasicLayout')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
