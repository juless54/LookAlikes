<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  import { useGameStore } from '@/stores/game'
  import { useGameStateStore } from '@/stores/gamestate'

  // stores
  const gameStore = useGameStore()
  const { resetPlayers, startGame } = gameStore

  const gameStateStore = useGameStateStore()
  const { resetGame } = gameStateStore

  const router = useRouter()

  const showMenu = ref(false)
  function toggleMenu() {
    showMenu.value = !showMenu.value
  }

  function goToHome() {
    resetGame()
    resetPlayers()
    router.push('/')
  }

  function goToImagesGame() {
    resetGame()
    startGame('image')
    router.push('/imageGame')
    showMenu.value = false
  }

  function goToWordsGame() {
    resetGame()
    startGame('word')
    router.push('/wordGame')
    showMenu.value = false
  }
</script>

<template>
  <nav class="fixed top-0 left-0 w-full bg-box text-twhite shadow-md z-50">
    <div class="max-w-6xl mx-auto flex items-center justify-between p-4">
      <h2 class="font-kavoon text-2xl cursor-pointer" @click="goToHome">LookAlikes</h2>

      <div class="hidden md:flex space-x-6">
        <button class="hover:underline" @click="goToHome">Accueil</button>
        <button class="hover:underline" @click="goToImagesGame">Images</button>
        <button class="hover:underline" @click="goToWordsGame">Mot</button>
      </div>

      <div
        class="md:hidden flex flex-col justify-between w-6 h-5 cursor-pointer"
        @click="toggleMenu"
      >
        <span
          class="block h-0.5 w-full bg-twhite transition-transform"
          :class="showMenu ? 'rotate-45 translate-y-2' : ''"
        ></span>
        <span
          class="block h-0.5 w-full bg-twhite transition-opacity"
          :class="showMenu ? 'opacity-0' : ''"
        ></span>
        <span
          class="block h-0.5 w-full bg-twhite transition-transform"
          :class="showMenu ? '-rotate-45 -translate-y-2' : ''"
        ></span>
      </div>
    </div>

    <div
      v-show="showMenu"
      class="md:hidden bg-box text-center space-y-4 py-4 transition-all duration-300"
    >
      <button class="block w-full hover:underline" @click="goToHome">Accueil</button>
      <button class="block w-full hover:underline" @click="goToImagesGame">Images</button>
      <button class="block w-full hover:underline" @click="goToWordsGame">Mot</button>
    </div>
  </nav>
</template>
