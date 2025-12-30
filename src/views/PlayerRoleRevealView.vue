<script setup>
  import { storeToRefs } from 'pinia'
  import { computed, ref } from 'vue'

  import Button from '@/components/Button.vue'
  import GameImageOrWord from '@/components/GameImageOrWord.vue'
  import { useGameStore } from '@/stores/game'
  import { useGameStateStore } from '@/stores/gamestate'

  // --- Stores ---
  const gameStore = useGameStore()
  const gameStateStore = useGameStateStore()
  const { gameVotePhase } = gameStateStore

  const { chooserName, currentFolderName, currentWord, gameMode, players } = storeToRefs(gameStore)

  // --- State local ---
  const hideContent = ref(true)
  const currentPlayerIndex = ref(0)

  // --- Computed ---
  const currentPlayer = computed(() => {
    return players.value?.[currentPlayerIndex.value] || null
  })

  const isLastPlayer = computed(() => {
    return currentPlayerIndex.value === players.value.length - 1
  })

  const imageSrc = computed(() => {
    if (!currentPlayer.value || gameMode.value !== 'image') return ''
    if (currentPlayer.value.playerRole === 'Mister White') return ''

    const role = currentPlayer.value.playerRole === 'Imposteur' ? 'impostor' : 'innocent'

    if (!currentFolderName.value) return ''
    return `/images/games/${currentFolderName.value}/${role}.png`
  })

  const wordToShow = computed(() => {
    if (!currentPlayer.value || gameMode.value !== 'word') return ''
    if (!currentWord.value) return ''

    return currentPlayer.value.playerRole === 'Imposteur'
      ? currentWord.value.impostor
      : currentWord.value.innocent
  })

  // --- Methods ---
  function showContent() {
    hideContent.value = false
  }

  function nextPlayer() {
    hideContent.value = true

    if (isLastPlayer.value) {
      gameVotePhase()
      currentPlayerIndex.value = 0
      return
    }

    currentPlayerIndex.value++
  }
</script>

<template>
  <section class="flex flex-col h-screen w-full bg-bg items-center text-twhite justify-center">
    <div class="flex flex-col items-center justify-between h-[60vh] w-[80vw]">
      <div class="flex flex-col items-center space-y-4">
        <h1 v-if="currentPlayer" class="text-3xl font-kavoon">
          Joueur {{ currentPlayer.playerName }}
        </h1>
        <h2 v-if="gameMode === 'image'" class="text-xl">Prenez le temps de bien regarder</h2>
        <h2 v-else class="text-2xl">Retenez bien le mot</h2>
      </div>

      <GameImageOrWord
        :hide-content="hideContent"
        :show-content="showContent"
        :image-src="imageSrc"
        :word="wordToShow"
        :is-mister-white="currentPlayer?.playerRole === 'Mister White'"
        :content-type="gameMode"
      />

      <h2 v-if="chooserName" class="text-xl">choisi par {{ chooserName }}</h2>

      <Button :text="isLastPlayer ? 'Passer aux votes' : 'Joueur suivant'" @click="nextPlayer()" />
    </div>
  </section>
</template>
