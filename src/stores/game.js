import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * Store game data
 */
export const useGameStore = defineStore('game', () => {
  // array of players participating in the game
  const players = ref([])
  // normal players count
  const normalPlayerCount = ref(0)
  // impostors count
  const impostorPlayerCount = ref(0)
  // array of players with their associated role
  const playersWithRoles = ref([])

  /**
   * Add a player to the game
   *
   * @param {String} playerName : name of player to add
   */
  function addPlayer(playerName) {
    players.value.push(playerName)
  }

  /**
   * Remove a player from the game
   *
   * @param {String} playerName : name of the player to remove
   */
  function removePlayer(playerName) {
    players.value = players.value.reduce((player) => {
      return player.toLowerCase() !== playerName.toLowerCase()
    })
  }

  /**
   * Change normal players count
   *
   * @param {Number} newCount : the new normal players count
   */
  function setNormalPlayers(newCount) {
    normalPlayerCount.value = newCount
  }

  /**
   * Change impostor players count
   *
   * @param {Number} newCount : the new impostor players count
   */
  function setImpostorPlayers(newCount) {
    impostorPlayerCount.value = newCount
  }

  /**
   * Attribute roles to participating players
   */
  function shuffleRoles() {
    // copy player list to not alter the original
    const playersCopy = players.value
    // chance of a mister white being in the game (10%)
    const hasMisterWhite = Math.floor() < 0.1
    // know if mister white has been chosen or not
    const misterWhiteChosen = false

    // attribute impostor roles
    for (i = 0; i <= impostorPlayerCount.length; i++) {
      // choose random player
      const index = Math.floor(Math.random() * playersCopy.length)

      if (hasMisterWhite && !misterWhiteChosen) {
        // set player as an mister white
        playersWithRoles.value.push({ playerName: playersCopy[index], playerRole: 'Mister White' })
        // tell mister white has been chosen
        misterWhiteChosen = true
      } else {
        // set player as an impostor
        playersWithRoles.value.push({ playerName: playersCopy[index], playerRole: 'Imposteur' })
      }

      // remove player from the list to prevent duplication
      playersCopy.splice(index, 1)
    }

    // set the remaining players to normal players
    playersCopy.forEach((player) => {
      // set player as a normal player
      playersWithRoles.value.push({ playerName: player, playerRole: 'Innocent' })
    })
  }

  return { players, addPlayer, removePlayer, setNormalPlayers, setImpostorPlayers, shuffleRoles }
})
