import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('components/home/home')
const Login = () => import('components/home/login')
const ApplyList = () => import('components/apply/apply-list')
const Apply = () => import('components/apply/apply')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/home',
      name: '首页',
      component: Home
    },
    {
      path: '/apply-list',
      name: '终端医疗申请',
      component: ApplyList
    },
    {
      path: '/apply/:id',
      name: '客商申请',
      component: Apply
    }
  ]
})
