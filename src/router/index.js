import Vue from 'vue'
import Router from 'vue-router'
import AppContent from '@/components/index/AppContent'
import AppIndex from '@/components/index/AppIndex'
import AppTask from '@/components/task/AppTask'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: AppIndex,
      name: 'index',
      children: [
        { path: '', component: AppContent }
      ]
    },
    {
      path: '/task/:taskId',
      name: 'task',
      component: AppTask,
      props: true
    }
  ]
})

export default router
