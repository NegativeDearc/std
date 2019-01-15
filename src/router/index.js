import Vue from 'vue'
import Router from 'vue-router'
import AppContentToday from '../components/index/Today/AppContentToday'
import mainIndex from '../components/main/mainIndex'
import selfIndex from '../components/index/Personal/selfIndex'
import AppIndex from '../components/index/AppIndex'
import AppFooter from '../components/index/AppFooter'
import AppSideBar from '../components/index/AppSideBar'
import AppHeader from '../components/index/Today/AppHeader'
import AppTask from '../components/index/task/AppTask'
import AppLogin from '../components/login/AppLogin'
import ResetPassword from '../components/utils/ResetPassword'
import dashboardIndex from '../components/dashboard/dashboardIndex'
import cronPickerIndex from '../components/experiment/cronPicker/cronPickerIndex'
import labIndex from '../components/experiment/labIndex'
import mainLeftDrawer from '../components/main/tasks/mainLeftDrawer'
import mainItems from '../components/main/tasks/mainItems'
import VSelfIndex from '../components/main/private/selfIndex'
import V2Dashboard from '../components/main/dash/dashboardIndex'
import mainRightDrawer from '../components/main/tasks/mainRightDrawer'
import mainSettings from '../components/main/mainSettings'
import mainTeams from '../components/main/mainTeams'
import NProgress from 'nprogress'

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: AppIndex,
      children: [
        { path: '/', components: { default: AppContentToday, header: AppHeader, sidebar: AppSideBar, footer: AppFooter }, meta: { requiresAuth: true } },
        { path: 'today', components: { default: AppContentToday, header: AppHeader, sidebar: AppSideBar, footer: AppFooter, meta: { requiresAuth: true } } },
        { path: 'personal', components: { default: selfIndex, footer: AppFooter, sidebar: AppSideBar, meta: { requiresAuth: true } } },
        { path: 'password', components: { default: ResetPassword, header: AppHeader, sidebar: AppSideBar, meta: { requiresAuth: true } } }
      ],
      meta: {
        requiresAuth: true
      }
    },
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
      path: '/dashboard',
      component: dashboardIndex,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: AppLogin,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/lab',
      component: labIndex,
      children: [
        { path: 'picker', component: cronPickerIndex }
      ]
    },
    {
      path: '/task/:taskId',
      name: 'task',
      component: AppTask,
      meta: {
        requiresAuth: true
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
