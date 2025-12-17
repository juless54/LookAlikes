<script setup>
import { useGameStore } from '@/stores/game'
import { useGameStateStore } from '@/stores/gamestate'
import { storeToRefs } from 'pinia'
import Button from '@/components/Button.vue'

// load game store
const gameStore = useGameStore()
const { players, normalPlayerCount, impostorPlayerCount } = storeToRefs(gameStore)

// load game state store
const gameStateStore = useGameStateStore()
const { gameStartPhase } = gameStateStore
</script>

<template>
  <section class="flex flex-col h-screen w-full bg-bg items-center text-twhite justify-center">
    <div class="flex flex-col items-center justify-between h-[60vh]">
      <h1 class="text-3xl font-kavoon">Entrez votre nom</h1>
      <input type="text" value="Nom" />
      <Button text="Commencer la partie" @click="gameStartPhase()" />
      <h3>innocents {{ normalPlayerCount }}</h3>
      <h3>imposteurs {{ impostorPlayerCount }}</h3>
    </div>
  </section>
</template>
