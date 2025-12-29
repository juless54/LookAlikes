import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

/**
 * Store game data
 */
export const useGameStore = defineStore('game', () => {
  // load all game images
  const gameImages = import.meta.glob('../../public/images/games/*/*', { eager: true })

  // array of players participating in the game
  const players = ref([])
  // normal players count
  const normalPlayerCount = ref(0)
  // impostors count
  const impostorPlayerCount = ref(0)
  // game winner group
  const winnerName = ref('')
  // game folder name for current game
  const currentFolderName = ref('')
  // list of already used folders
  const usedFolderNames = ref([])
  // name of the person having chosen the images
  const imagesChooserName = ref('')

  watch(normalPlayerCount, newValue => {
    impostorPlayerCount.value = Math.floor(newValue / 3)
  })

  /**
   * Add a player to the game
   *
   * @param {String} playerName : name of player to add
   */
  function addPlayer(playerName) {
    players.value.push({
      isEliminated: false,
      playerName: playerName,
      playerRole: '',
    })
    normalPlayerCount.value++
  }

  /**
   * Remove a player from the game
   *
   * @param {String} playerName : name of the player to remove
   */
  function removePlayer(playerName) {
    players.value = players.value.filter(player => {
      return player.playerName.toLowerCase() !== playerName.toLowerCase()
    })
    normalPlayerCount.value--
  }

  /**
   * Mark player as eliminated
   *
   * @param {Number} playerIndex : the index of the player in players array
   */
  function eliminatePlayerFromGame(playerIndex) {
    players.value[playerIndex].isEliminated = true
  }

  /**
   * Attribute roles to participating players
   */
  function shuffleRoles() {
    // reset players
    players.value.forEach(player => {
      player.playerRole = ''
      player.isEliminated = false
    })

    // chance of a mister white being in the game (10%)
    const hasMisterWhite = Math.floor() < 0.1
    // know if mister white has been chosen or not
    let misterWhiteChosen = false
    // track previous indexes for impostors
    const previousIndexes = [999]

    // attribute impostor roles
    for (let i = 0; i < impostorPlayerCount.value; i++) {
      let index = 999

      // pull a random index if it is already attributed
      while (previousIndexes.includes(index)) {
        // choose random player
        index = Math.floor(Math.random() * players.value.length)
      }

      if (hasMisterWhite && !misterWhiteChosen) {
        // set player as an mister white
        players.value[index].playerRole = 'Mister White'
        // tell mister white has been chosen
        misterWhiteChosen = true
      } else {
        // set player as an impostor
        players.value[index].playerRole = 'Imposteur'
      }
    }

    // set the remaining players to normal players
    players.value.forEach(player => {
      // set player as a normal player
      if (player.playerRole === '') {
        player.playerRole = 'Innocent'
      }
    })
  }

  /**
   * Choose a random game folder for images
   */
  function chooseFolder() {
    // read folders names
    const folders = [...new Set(Object.keys(gameImages).map(path => path.split('/').at(-2)))]

    // keep only not used folders
    const availableFolders = folders.filter(f => !usedFolderNames.value.includes(f))

    // when all folders have been used, choose first folder
    if (!availableFolders.length) {
      currentFolderName.value = '1'

      // get and set name of the person having chosen the images
      const txtFile = Object.keys(gameImages)
        .filter(path => path.includes(`/games/${currentFolderName.value}/`))
        .map(path => path.split('/').pop())
        .find(name => name.endsWith('.txt'))

      const txtName = txtFile.split('.').shift()
      imagesChooserName.value = txtName
      return
    }

    // choose a random folder
    const randomIndex = Math.floor(Math.random() * availableFolders.length)
    const chosenFolder = availableFolders[randomIndex]

    // get and set name of the person having chosen the images
    const txtFile = Object.keys(gameImages)
      .filter(path => path.includes(`/games/${chosenFolder}/`))
      .map(path => path.split('/').pop())
      .find(name => name.endsWith('.txt'))

    const txtName = txtFile.split('.').shift()
    imagesChooserName.value = txtName

    // register choice
    currentFolderName.value = chosenFolder
    usedFolderNames.value.push(chosenFolder)
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
    players.value.forEach(player => {
      if (player.isEliminated) return

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
   * Reset the players array
   */
  function resetPlayers() {
    players.value = []
    impostorPlayerCount.value = 0
    normalPlayerCount.value = 0
    currentFolderName.value = ''
    usedFolderNames.value = []
    imagesChooserName.value = ''
  }

  return {
    addPlayer,
    checkGameEnd,
    chooseFolder,
    currentFolderName,
    eliminatePlayerFromGame,
    imagesChooserName,
    impostorPlayerCount,
    normalPlayerCount,
    players,
    removePlayer,
    resetPlayers,
    shuffleRoles,
    winnerName,
  }
})
