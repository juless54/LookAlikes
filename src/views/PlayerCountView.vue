<script setup>
import { useGameStore } from '@/stores/game'
import { useGameStateStore } from '@/stores/gamestate'
import { storeToRefs } from 'pinia'
import Button from '@/components/Button.vue'

// load game store
const gameStore = useGameStore()
const { normalPlayerCount, impostorPlayerCount } = storeToRefs(gameStore)

// load game state store
const gameStateStore = useGameStateStore()
const { playerNamesPhase } = gameStateStore

// check if there is at least 1 impostor and 2 innocents
function goToNextPhase() {
  if (normalPlayerCount.value >= 2 && impostorPlayerCount.value > 0) {
    playerNamesPhase()
  }
}
</script>

<template>
  <section class="flex flex-col h-screen w-full bg-bg items-center text-twhite justify-center">
    <div class="flex flex-col items-center justify-between h-[60vh] w-[80vw]">
      <h1 class="text-3xl font-kavoon">Nombre de Joueurs</h1>
      <div class="flex flex-col items-center w-full space-y-12 text-xl">
        <div class="flex flex-row items-center justify-between w-full">
          <h2>Innocents</h2>
          <input
            type="number"
            v-model.number="normalPlayerCount"
            class="size-12 bg-ubox outline-none rounded-md ps-2 text-tplaceholder"
          />
        </div>
        <div class="flex flex-row items-center justify-between w-full">
          <h2>Imposteurs</h2>
          <input
            type="number"
            v-model.number="impostorPlayerCount"
            class="size-12 bg-ubox outline-none rounded-md ps-2 text-tplaceholder"
          />
        </div>
      </div>
      <Button text="Commencer" @click="goToNextPhase()" />
    </div>
  </section>
</template>
