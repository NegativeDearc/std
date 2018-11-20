import Vue from 'vue'
import Router from 'vue-router'
import AppContentToday from '../components/index/AppContentToday'
import AppContentFuture from '../components/index/AppContentFuture'
import AppContentArchive from '../components/index/AppContentArchive'
import AppIndex from '../components/index/AppIndex'
import AppFooter from '../components/index/AppFooter'
import AppTask from '../components/task/AppTask'
import AppLogin from '../components/login/AppLogin'
import ResetPassword from '../components/utils/ResetPassword'
import DashIndex from '../components/dash/DashIndex'
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
        { path: '', components: { default: AppContentToday, footer: AppFooter }, meta: { requiresAuth: true } },
        { path: 'today', component: AppContentToday, meta: { requiresAuth: true } },
        { path: 'future', component: AppContentFuture, meta: { requiresAuth: true } },
        { path: 'archive', component: AppContentArchive, meta: { requiresAuth: true } },
        { path: 'password', component: ResetPassword, meta: { requiresAuth: true } },
        { path: 'dash', component: DashIndex, meta: { requiresAuth: true } }
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      component: AppLogin,
      meta: {
        requiresAuth: false
      }
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
