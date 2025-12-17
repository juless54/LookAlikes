import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * Store game state data
 */
export const useGameStateStore = defineStore('gamestate', () => {
  // game state throughout the game
  const gameState = ref('PlayerCount')

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

  return { gameState, playerNamesPhase, gameStartPhase, gameEndPhase, resetGame }
})
