import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('components/home/home')
const Login = () => import('components/home/login')
const ApplyList = () => import('components/apply/apply-list')
const Apply = () => import('components/apply/apply')
const LszbList = () => import('components/lszb/lszb-list')
const Lszb = () => import('components/lszb/lszb')
const LsmdList = () => import('components/lsmd/lsmd-list')
const Lsmd = () => import('components/lsmd/lsmd')
const ZdylspList = () => import('components/zdylsp/zdylsp-list')
const Zdylsp = () => import('components/zdylsp/zdylsp')
const LszbspList = () => import('components/lszbsp/lszbsp-list')
const Lszbsp = () => import('components/lszbsp/lszbsp')
const LsmdspList = () => import('components/lsmdsp/lsmdsp-list')
const Lsmdsp = () => import('components/lsmdsp/lsmdsp')
const TzggList = () => import('components/tzgg/tzgg-list')
const Tzgg = () => import('components/tzgg/tzgg')
const WdxxList = () => import('components/wdxx/wdxx-list')
const Yhsq = () => import('components/yhsq/yhsq')
const YhsqList = () => import('components/yhsq/yhsq-list')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/apply-list',
      name: 'apply-list',
      component: ApplyList
    },
    {
      path: '/apply/:id',
      name: 'apply',
      component: Apply
    },
    {
      path: '/apply-view/:id',
      name: 'apply-view',
      component: Apply
    },
    {
      path: '/lszb-list',
      name: 'lszb-list',
      component: LszbList
    },
    {
      path: '/lszb/:id',
      name: 'lszb',
      component: Lszb
    },
    {
      path: '/lszb-view/:id',
      name: 'lszb-view',
      component: Lszb
    },
    {
      path: '/lsmd-list',
      name: 'lsmd-list',
      component: LsmdList
    },
    {
      path: '/lsmd/:id',
      name: 'lsmd',
      component: Lsmd
    },
    {
      path: '/lsmd-view/:id',
      name: 'lsmd-view',
      component: Lsmd
    },
    {
      path: '/zdylsp-list',
      name: 'zdylsp-list',
      component: ZdylspList
    },
    {
      path: '/zdylsp/:id/:auditId/:auditStep',
      name: 'zdylsp',
      component: Zdylsp
    },
    {
      path: '/lszbsp-list',
      name: 'lszbsp-list',
      component: LszbspList
    },
    {
      path: '/lszbsp/:id/:auditId/:auditStep',
      name: 'lszbsp',
      component: Lszbsp
    },
    {
      path: '/lsmdsp-list',
      name: 'lsmdsp-list',
      component: LsmdspList
    },
    {
      path: '/lsmdsp/:id/:auditId/:auditStep',
      name: 'lsmdsp',
      component: Lsmdsp
    },
    {
      path: '/tzgg-list',
      name: 'tzgg-list',
      component: TzggList
    },
    {
      path: '/tzgg/:id',
      name: 'tzgg',
      component: Tzgg
    },
    {
      path: '/wdxx-list',
      name: 'wdxx-list',
      component: WdxxList
    },
    {
      path: '/yhsq-list',
      name: 'yhsq-list',
      component: YhsqList
    },
    {
      path: '/yhsq/:id',
      name: 'yhsq',
      component: Yhsq
    },
    {
      path: '/yhsq-view/:id',
      name: 'yhsq-view',
      component: Yhsq
    }
  ]
})
