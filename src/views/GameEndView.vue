<script setup>
import Button from '@/components/Button.vue'
import { useGameStore } from '@/stores/game'
import { useGameStateStore } from '@/stores/gamestate'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

// get game data store
const gameStore = useGameStore()
const { winnerName } = storeToRefs(gameStore)
const { resetPlayers } = gameStore

// get game state store
const gameStateStore = useGameStateStore()
const { gameStartPhase, resetGame } = gameStateStore

// get vue router
const router = useRouter()

// go to home page
function goToHome() {
  resetGame()
  resetPlayers()
  router.push('/')
}

function handleClick() {
  console.log('click')
}
</script>

<template>
  <section
    class="relative flex flex-col h-screen w-full bg-bg items-center text-twhite justify-center"
  >
    <div class="flex flex-col items-center justify-between h-[60vh] w-[80vw]">
      <h1 class="text-3xl font-kavoon">La partie est terminée</h1>
      <h2 class="text-2xl font-kavoon">Les {{ winnerName }} ont gagné</h2>
      <div class="flex flex-col w-full items-center space-y-6">
        <Button text="Rejouer" @click="gameStartPhase()" />
        <Button text="Changer les joueurs" @click="handleClick()" />
        <Button text="Accueil" @click="goToHome()" />
      </div>
    </div>
  </section>
</template>
