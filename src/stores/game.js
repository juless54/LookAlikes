import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'

/**
 * Store game data
 */
export const useGameStore = defineStore('game', () => {
  // images
  const gameImages = import.meta.glob('../../public/images/games/*/*', { eager: true })

  // words
  const wordsFile = import.meta.glob('../../public/words/words.json', { eager: true })
  const allWords = Object.values(wordsFile)[0]?.default || []

  const gameMode = ref('') // 'image' | 'word'

  const players = ref([])
  const normalPlayerCount = ref(0)
  const impostorPlayerCount = ref(0)

  const winnerName = ref('')

  const currentFolderName = ref('')
  const usedFolderNames = ref([])
  const imagesChooserName = ref('')

  const currentWord = ref(null)
  const usedWords = ref([])
  const wordsChooserName = ref('')

  // one chooser name for UI
  const chooserName = computed(() => {
    return gameMode.value === 'image' ? imagesChooserName.value : wordsChooserName.value
  })

  // chooser name used for role exclusion
  const chooserNameLower = computed(() => {
    return chooserName.value?.toLowerCase() || ''
  })

  watch(normalPlayerCount, value => {
    impostorPlayerCount.value = Math.floor(value / 3)
  })

  function addPlayer(playerName) {
    players.value.push({
      isEliminated: false,
      playerName,
      playerRole: '',
    })
    normalPlayerCount.value++
  }

  function startGame(type) {
    gameMode.value = type
  }

  function removePlayer(playerName) {
    players.value = players.value.filter(
      p => p.playerName.toLowerCase() !== playerName.toLowerCase()
    )
    normalPlayerCount.value--
  }

  function eliminatePlayerFromGame(playerIndex) {
    players.value[playerIndex].isEliminated = true
  }

  function prepareGame() {
    if (gameMode.value === 'image') {
      chooseFolder()
    } else {
      chooseWord()
    }

    shuffleRoles()
  }

  function shuffleRoles() {
    // reset
    players.value.forEach(p => {
      p.playerRole = ''
      p.isEliminated = false
    })

    const hasMisterWhite = Math.random() < 0.1
    let misterWhiteChosen = false

    const usedIndexes = new Set()

    let assigned = 0
    while (assigned < impostorPlayerCount.value) {
      const index = Math.floor(Math.random() * players.value.length)

      if (usedIndexes.has(index)) continue
      usedIndexes.add(index)

      const player = players.value[index]

      // exclude chooser
      if (player.playerName.toLowerCase() === chooserNameLower.value) continue

      if (hasMisterWhite && !misterWhiteChosen) {
        player.playerRole = 'Mister White'
        misterWhiteChosen = true
      } else {
        player.playerRole = 'Imposteur'
      }

      assigned++
    }

    // remaining players
    players.value.forEach(player => {
      if (!player.playerRole) {
        player.playerRole = 'Innocent'
      }
    })
  }

  function chooseFolder() {
    const folders = [...new Set(Object.keys(gameImages).map(path => path.split('/').at(-2)))]

    let available = folders.filter(f => !usedFolderNames.value.includes(f))

    if (!available.length) {
      usedFolderNames.value = []
      available = folders
    }

    const chosen = available[Math.floor(Math.random() * available.length)]

    const txtFile = Object.keys(gameImages)
      .filter(p => p.includes(`/games/${chosen}/`))
      .map(p => p.split('/').pop())
      .find(name => name.endsWith('.txt'))

    imagesChooserName.value = txtFile ? txtFile.replace('.txt', '') : ''
    currentFolderName.value = chosen
    usedFolderNames.value.push(chosen)
  }

  function chooseWord() {
    let available = allWords.filter(w => !usedWords.value.includes(w.innocent))

    if (!available.length) {
      usedWords.value = []
      available = allWords
    }

    const chosen = available[Math.floor(Math.random() * available.length)]

    currentWord.value = chosen
    usedWords.value.push(chosen.innocent)
    wordsChooserName.value = chosen.by || ''
  }

  function checkGameEnd() {
    let impostors = 0
    let innocents = 0

    players.value.forEach(player => {
      if (player.isEliminated) return

      if (player.playerRole === 'Imposteur' || player.playerRole === 'Mister White') {
        impostors++
      } else {
        innocents++
      }
    })

    if (impostors === innocents) winnerName.value = 'Imposteurs'
    if (impostors === 0) winnerName.value = 'Innocents'

    return impostors === innocents || impostors === 0
  }

  function resetPlayers() {
    players.value = []
    normalPlayerCount.value = 0
    impostorPlayerCount.value = 0

    winnerName.value = ''

    currentFolderName.value = ''
    usedFolderNames.value = []
    imagesChooserName.value = ''

    currentWord.value = null
    usedWords.value = []
    wordsChooserName.value = ''
  }

  return {
    // actions
    addPlayer,
    checkGameEnd,
    chooseFolder,
    chooserName,
    chooseWord,

    currentFolderName,
    currentWord,

    eliminatePlayerFromGame,

    // state
    gameMode,
    impostorPlayerCount,
    normalPlayerCount,
    players,

    prepareGame,
    removePlayer,

    resetPlayers,
    shuffleRoles,

    startGame,
    winnerName,
  }
})
