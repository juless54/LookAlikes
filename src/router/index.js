import { createRouter, createWebHistory } from 'vue-router'

import ImagesGame from '@/views/ImagesGame.vue'
import WordsGame from '@/views/WordsGame.vue'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: HomeView,
      name: 'home',
      path: '/',
    },
    {
      component: ImagesGame,
      name: 'images-game',
      path: '/imagesGame',
    },
    {
      component: WordsGame,
      name: 'words-game',
      path: '/wordsGame',
    },
  ],
})

export default router
