import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ImagesGame from '@/views/ImagesGame.vue'
import WordsGame from '@/views/WordsGame.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/imagesGame',
      name: 'images-game',
      component: ImagesGame,
    },
    {
      path: '/wordsGame',
      name: 'words-game',
      component: WordsGame,
    },
  ],
})

export default router
