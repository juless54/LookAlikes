import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import { useGameStore } from '@/stores/game'

export const useGameStateStore = defineStore('gamestate', () => {
  const gameState = ref('PlayerNames')
  const gameStore = useGameStore()

  watch(gameState, state => {
    if (state === 'GameStart') {
      gameStore.prepareGame()
    }
  })

  function gameStartPhase() {
    gameState.value = 'GameStart'
  }

  function gameVotePhase() {
    gameState.value = 'GameVote'
  }

  function gameEndPhase() {
    gameState.value = 'GameEnd'
  }

  function resetGame() {
    gameState.value = 'PlayerNames'
  }

  return {
    gameEndPhase,
    gameStartPhase,
    gameState,
    gameVotePhase,
    resetGame,
  }
})
