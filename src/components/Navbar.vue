<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  import { useGameStore } from '@/stores/game'
  import { useGameStateStore } from '@/stores/gamestate'

  // get game data store
  const gameStore = useGameStore()
  const { resetPlayers } = gameStore

  // get game state store
  const gameStateStore = useGameStateStore()
  const { resetGame } = gameStateStore

  // get vue router
  const router = useRouter()

  // show or hide menu
  const showMenu = ref(false)

  // bars for menu icon
  const menuBar = [0, 1, 2]

  // show or hide menu
  function toggleMenu() {
    showMenu.value = !showMenu.value
  }

  // go to home page
  function goToHome() {
    resetGame()
    resetPlayers()
    router.push('/')
  }
</script>

<template>
  <nav class="flex flex-row items-center justify-between fixed top-0 w-full text-twhite z-10 p-4">
    <h2 class="font-kavoon text-2xl">LookAlikes</h2>
    <div class="flex flex-col items-center space-y-1 relative">
      <div
        v-for="number in menuBar"
        :key="number"
        class="bg-twhite w-10 h-1.5 rounded-md"
        @click="toggleMenu()"
      />
      <div
        :class="showMenu ? 'translate-x-0' : 'translate-x-[50vw]'"
        class="absolute top-10 right-0 bg-box w-[30vw] p-2 rounded-md text-center transition-all duration-300 ease-in-out"
      >
        <button @click="goToHome()">Accueil</button>
      </div>
    </div>
  </nav>
</template>
