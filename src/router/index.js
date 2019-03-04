import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

const AppLogin = () => import('../components/login/AppLogin')
const mainIndex = () => import('../components/main/mainIndex')
const mainLeftDrawer = () => import('../components/main/tasks/mainLeftDrawer')
const mainItems = () => import('../components/main/tasks/mainItems')
const VSelfIndex = () => import('../components/main/private/selfIndex')
const V2Dashboard = () => import('../components/main/dash/dashboardIndex')
const mainRightDrawer = () => import('../components/main/tasks/mainRightDrawer')
const mainSettings = () => import('../components/main/mainSettings')
const mainTeams = () => import('../components/main/mainTeams')

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/v2/this_week' },
    {
      path: '/v2',
      component: mainIndex,
      children: [
        { path: '/v2', redirect: '/v2/this_week' },
        { path: '/v2/expired', components: { left: mainLeftDrawer, main: mainItems, right: mainRightDrawer }, meta: { requiresAuth: true, keepAlive: false }, name: 'expired' },
        { path: '/v2/this_week', components: { left: mainLeftDrawer, main: mainItems, right: mainRightDrawer }, meta: { requiresAuth: true, keepAlive: false }, name: 'thisWeek' },
        { path: '/v2/later', components: { left: mainLeftDrawer, main: mainItems, right: mainRightDrawer }, meta: { requiresAuth: true, keepAlive: false }, name: 'later' },
        { path: '/v2/finished', components: { left: mainLeftDrawer, main: mainItems, right: mainRightDrawer }, meta: { requiresAuth: true, keepAlive: false }, name: 'finished' },
        { path: '/v2/private', components: { left: mainLeftDrawer, main: VSelfIndex, right: '' }, meta: { requiresAuth: true }, name: 'private' },
        { path: '/v2/favorite', components: { left: mainLeftDrawer, main: mainItems, right: mainRightDrawer }, meta: { requiresAuth: true }, name: 'favorite' },
        { path: '/v2/settings', components: { left: mainLeftDrawer, main: mainSettings, right: '' }, meta: { requiresAuth: true } },
        { path: '/v2/teams', components: { left: mainLeftDrawer, main: mainTeams, right: '' }, meta: { requiresAuth: true } },
        { path: '/v2/dashboard', components: { left: mainLeftDrawer, main: V2Dashboard, right: '' }, meta: { requiresAuth: true } }
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: AppLogin,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!window.localStorage.getItem('userId')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }// 把要跳转的地址作为参数传到下一步
      })
    } else {
      console.log('=> ALREADY LOGGED IN, DIRECT TO', to.fullPath)
      NProgress.start()
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
