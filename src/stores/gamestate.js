import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useGameStore } from '@/stores/game'
import { watch } from 'vue'

/**
 * Store game state data
 */
export const useGameStateStore = defineStore('gamestate', () => {
  // game state throughout the game
  const gameState = ref('PlayerCount')

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
   * Swap to player names selection phase
   */
  function playerNamesPhase() {
    gameState.value = 'PlayerNames'
  }

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
    gameState.value = 'PlayerCount'
  }

  return { gameState, playerNamesPhase, gameStartPhase, gameEndPhase, resetGame, gameVotePhase }
})
