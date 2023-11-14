import { createRouter, createWebHistory } from 'vue-router'
import EntryView from '@/views/EntryView.vue'
import MainView from '@/views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: EntryView
    },
    {
      path: '/main',
      name: 'main',
      component: MainView
    }
  ]
})

export default router
