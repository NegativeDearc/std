import Vue from 'vue'
import Router from 'vue-router'
import AppContentToday from '../components/index/AppContentToday'
import AppContentFuture from '../components/index/AppContentFuture'
import AppContentArchive from '../components/index/AppContentArchive'
import AppIndex from '../components/index/AppIndex'
import AppTask from '../components/task/AppTask'
import AppLogin from '../components/index/AppLogin'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: AppIndex,
      children: [
        { path: '', component: AppContentToday, meta: { requiresAuth: true } },
        { path: 'today', component: AppContentToday, meta: { requiresAuth: true } },
        { path: 'future', component: AppContentFuture, meta: { requiresAuth: true } },
        { path: 'archive', component: AppContentArchive, meta: { requiresAuth: true } }
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
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
