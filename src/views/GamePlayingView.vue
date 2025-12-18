<script setup>
import { useGameStore } from '@/stores/game'
import { useGameStateStore } from '@/stores/gamestate'
import { storeToRefs } from 'pinia'
import { onBeforeMount, onMounted, watch } from 'vue'

// load game state store
const gameStateStore = useGameStateStore()
const { gameState } = storeToRefs(gameStateStore)

// load game data store
const gameStore = useGameStore()
const { playersWithRoles } = storeToRefs(gameStore)
const { shuffleRoles } = gameStore

// wait for the game to be ready before player shuffle
watch(
  () => gameState.value,
  (state) => {
    if (state === 'GameStart') {
      shuffleRoles()
    }
  },
)
</script>

<template>
  <section class="flex flex-col h-screen w-full bg-bg items-center text-twhite justify-center">
    <h1 class="text-3xl font-kavoon">Jeu en cours</h1>
    <div v-for="player in playersWithRoles">
      <h2>{{ player.playerName }}</h2>
      <h2>{{ player.playerRole }}</h2>
    </div>
  </section>
</template>
