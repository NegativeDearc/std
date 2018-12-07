import Vue from 'vue'
import Router from 'vue-router'
import AppContentToday from '../components/index/headerForToday/AppContentToday'
import selfIndex from '../components/index/PersonalTask/selfIndex'
import AppIndex from '../components/index/AppIndex'
import AppFooter from '../components/index/AppFooter'
import AppSideBar from '../components/index/AppSideBar'
import AppHeader from '../components/index/headerForToday/AppHeader'
import AppTask from '../components/task/AppTask'
import AppLogin from '../components/login/AppLogin'
import ResetPassword from '../components/utils/ResetPassword'
import dashboardIndex from '../components/dashboard/dashboardIndex'
import cronPickerIndex from '../components/experiment/cronPicker/cronPickerIndex'
import dashboardIndexExperiment from '../components/experiment/dashboard/dashboardIndex'
import labIndex from '../components/experiment/labIndex'
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
        { path: 'picker', component: cronPickerIndex },
        { path: 'dash', component: dashboardIndexExperiment }
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
