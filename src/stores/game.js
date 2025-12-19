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
  // total number of players
  const totalPlayersCount = computed(() => normalPlayerCount.value + impostorPlayerCount.value)
  // game winner group
  const winnerName = ref('')

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
    players.value = players.value.filter((player) => {
      return player.toLowerCase() !== playerName.toLowerCase()
    })
  }

  /**
   * Attribute roles to participating players
   */
  function shuffleRoles() {
    // reset players
    playersWithRoles.value = []
    // copy player list to not alter the original
    const playersCopy = [...players.value]
    // chance of a mister white being in the game (10%)
    const hasMisterWhite = Math.floor() < 0.1
    // know if mister white has been chosen or not
    const misterWhiteChosen = false

    // attribute impostor roles
    for (let i = 0; i < impostorPlayerCount.value; i++) {
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

    // sort by the order of players array
    playersWithRoles.value.sort(
      (a, b) => players.value.indexOf(a.playerName) - players.value.indexOf(b.playerName),
    )
  }

  /**
   * Check is the game is finished
   *
   * @returns true if there is no more impostors or if impostors and innocents are equal number
   */
  function checkGameEnd() {
    let impostorsCount = 0
    let innocentsCount = 0

    // count each player role
    playersWithRoles.value.forEach((player) => {
      if (player.playerRole === 'Imposteur' || player.playerRole === 'Mister White') {
        impostorsCount++
        return
      }

      innocentsCount++
    })

    // impostors win
    if (impostorsCount === innocentsCount) winnerName.value = 'Imposteurs'

    // innocents win
    if (impostorsCount === 0) winnerName.value = 'Innocents'

    return impostorsCount === innocentsCount || impostorsCount === 0
  }

  /**
   * Remove a player from current game
   *
   * @param {Player} playerToRemove : the player to eliminate
   */
  function removePlayerWithRole(playerToRemove) {
    playersWithRoles.value = playersWithRoles.value.filter((player) => {
      return playerToRemove.playerName.toLowerCase() !== player.playerName.toLowerCase()
    })
  }

  return {
    players,
    addPlayer,
    removePlayer,
    normalPlayerCount,
    impostorPlayerCount,
    shuffleRoles,
    totalPlayersCount,
    playersWithRoles,
    checkGameEnd,
    removePlayerWithRole,
    winnerName,
  }
})
