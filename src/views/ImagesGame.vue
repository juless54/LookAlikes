<script setup>
import PlayerNamesView from '@/views/PlayerNamesView.vue'
import PlayerRoleRevealView from '@/views/PlayerRoleRevealView.vue'
import PlayerVoteView from '@/views/PlayerVoteView.vue'
import GameEndView from '@/views/GameEndView.vue'
import Navbar from '@/components/Navbar.vue'
import { useGameStateStore } from '@/stores/gamestate'
import { storeToRefs } from 'pinia'

const gameStateStore = useGameStateStore()
const { gameState } = storeToRefs(gameStateStore)
</script>

<template>
  <main>
    <Navbar />
    <PlayerNamesView v-show="gameState === 'PlayerNames'" />
    <PlayerRoleRevealView v-show="gameState === 'GameStart'" />
    <PlayerVoteView v-show="gameState === 'GameVote'" />
    <GameEndView v-show="gameState === 'GameEnd'" />
  </main>
</template>
