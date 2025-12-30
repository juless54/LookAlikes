<!-- GameView.vue -->
<script setup>
  import { storeToRefs } from 'pinia'
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'

  import Navbar from '@/components/Navbar.vue'
  import { useGameStore } from '@/stores/game'
  import { useGameStateStore } from '@/stores/gamestate'
  import GameEndView from '@/views/GameEndView.vue'
  import PlayerNamesView from '@/views/PlayerNamesView.vue'
  import PlayerRoleRevealView from '@/views/PlayerRoleRevealView.vue'
  import PlayerVoteView from '@/views/PlayerVoteView.vue'

  const gameStore = useGameStore()
  const gameStateStore = useGameStateStore()
  const { gameState } = storeToRefs(gameStateStore)
  const { gameMode } = storeToRefs(gameStore)

  const route = useRoute()

  onMounted(() => {
    if (route.path.includes('imageGame')) {
      gameMode.value = 'image'
    } else if (route.path.includes('wordGame')) {
      gameMode.value = 'word'
    }

    gameStore.prepareGame()
  })
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
