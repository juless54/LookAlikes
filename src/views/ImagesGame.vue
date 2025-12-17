<script setup>
import PlayerCountView from './PlayerCountView.vue'
import PlayerNamesView from '@/views/PlayerNamesView.vue'
import { useGameStateStore } from '@/stores/gamestate'
import { storeToRefs } from 'pinia'

const gameStateStore = useGameStateStore()
const { gameState } = storeToRefs(gameStateStore)
</script>

<template>
  <main>
    <PlayerCountView v-show="gameState === 'PlayerCount'" />
    <PlayerNamesView v-show="gameState === 'PlayerNames'" />
  </main>
</template>
