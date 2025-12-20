import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useGameStore } from '@/stores/game'
import { watch } from 'vue'

/**
 * Store game state data
 */
export const useGameStateStore = defineStore('gamestate', () => {
  // game state throughout the game
  const gameState = ref('PlayerNames')

  // import game data store
  const gameStore = useGameStore()

  // wait for the game to be ready before player shuffle
  watch(
    () => gameState.value,
    (state) => {
      if (state === 'GameStart') {
        gameStore.shuffleRoles()
        gameStore.chooseFolder()
      }
    },
  )

  /**
   * Swap to game start phase
   */
  function gameStartPhase() {
    gameState.value = 'GameStart'
  }

  /**
   * Swap to game vote phase
   */
  function gameVotePhase() {
    gameState.value = 'GameVote'
  }

  /**
   * Swap to game end phase
   */
  function gameEndPhase() {
    gameState.value = 'GameEnd'
  }

  /**
   * Swap back to player count phase
   */
  function resetGame() {
    gameState.value = 'PlayerNames'
  }

  return { gameState, gameStartPhase, gameEndPhase, resetGame, gameVotePhase }
})
