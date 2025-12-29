<script setup>
  import { storeToRefs } from 'pinia'
  import { computed, ref } from 'vue'

  import Button from '@/components/Button.vue'
  import GameImageOrWord from '@/components/GameImageOrWord.vue'
  import { useGameStore } from '@/stores/game'
  import { useGameStateStore } from '@/stores/gamestate'

  // load game state store
  const gameStateStore = useGameStateStore()
  const { gameVotePhase } = gameStateStore

  // load game data store
  const gameStore = useGameStore()
  const { currentFolderName, imagesChooserName, players } = storeToRefs(gameStore)

  // if the content must be hidden
  const hideContent = ref(true)

  // display content
  function showContent() {
    hideContent.value = false
  }

  // current player index in roles array
  const currentPlayerIndex = ref(0)

  // current player
  const currentPlayer = computed(() => players.value[currentPlayerIndex.value])

  // is current player the last to view his role
  const isLastPlayer = computed(() => currentPlayerIndex.value === players.value.length - 1)

  // image src depending on current game folder and player role
  const imageSrc = computed(() => {
    if (!currentPlayer.value) return ''

    let role = 'innocent'

    if (currentPlayer.value.playerRole === 'Imposteur') {
      role = 'impostor'
    }
    console.log(currentPlayer.value.playerRole)

    if (currentPlayer.value.playerRole !== 'Mister White') {
      return '/images/games/' + currentFolderName.value + '/' + role + '.png'
    }

    return ''
  })

  // swap to next player
  function nextPlayer() {
    if (isLastPlayer.value) {
      gameVotePhase()
      currentPlayerIndex.value = 0
      hideContent.value = true
      return
    }

    currentPlayerIndex.value++
    hideContent.value = true
  }
</script>

<template>
  <section class="flex flex-col h-screen w-full bg-bg items-center text-twhite justify-center">
    <div class="flex flex-col items-center justify-between h-[60vh] w-[80vw]">
      <div class="flex flex-col items-center space-y-4">
        <h1 v-if="currentPlayer" class="text-3xl font-kavoon">
          Joueur {{ currentPlayer.playerName }}
        </h1>
        <h2 class="text-xl">Prenez le temps de bien regarder</h2>
      </div>
      <GameImageOrWord
        :hide-content="hideContent"
        :show-content="showContent"
        :image-src="imageSrc"
        :is-mister-white="currentPlayer?.playerRole === 'Mister White'"
      />
      <h2 v-if="imagesChooserName">Image choisie par {{ imagesChooserName }}</h2>
      <Button :text="isLastPlayer ? 'Passer aux votes' : 'Joueur suivant'" @click="nextPlayer()" />
    </div>
  </section>
</template>
