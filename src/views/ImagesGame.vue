<script setup>
import PlayerCountView from './PlayerCountView.vue'
import { useGameStateStore } from '@/stores/gamestate'
import { storeToRefs } from 'pinia'

const gameStateStore = useGameStateStore()
const { gameState } = storeToRefs(gameStateStore)
</script>

<template>
  <main>
    <PlayerCountView v-show="gameState === 'PlayerCount'" />
  </main>
</template>
