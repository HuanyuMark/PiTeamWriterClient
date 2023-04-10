import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/c1'
    },
    {
      path: '/c1',
      name: 'c1',
      component: () => import('../components/Editors/CommonEditor.vue')
    },
    {
      path: '/c2',
      name: 'c2',
      component: () => import('../components/Editors/CommonEditor.vue')
    }
  ]
})

export default router
