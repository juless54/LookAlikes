import { createRouter, createWebHistory } from 'vue-router'

import GameView from '@/views/GameView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: HomeView,
      name: 'home',
      path: '/',
    },
    {
      component: GameView,
      name: 'imageGame',
      path: '/imageGame',
    },
    {
      component: GameView,
      name: 'wordGame',
      path: '/wordGame',
    },
  ],
})

export default router
