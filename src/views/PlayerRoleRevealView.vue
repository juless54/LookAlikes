<script setup>
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import Button from '@/components/Button.vue'
import GameImageOrWord from '@/components/GameImageOrWord.vue'
import { useGameStateStore } from '@/stores/gamestate'

// load game state store
const gameStateStore = useGameStateStore()
const { gameVotePhase } = gameStateStore

// load game data store
const gameStore = useGameStore()
const { playersWithRoles, currentFolderName } = storeToRefs(gameStore)

// if the content must be hidden
const hideContent = ref(true)

// display content
function showContent() {
  hideContent.value = false
}

// current player index in roles array
const currentPlayerIndex = ref(0)

// current player
const currentPlayer = computed(() => playersWithRoles.value[currentPlayerIndex.value])

// is current player the last to view his role
const isLastPlayer = computed(() => currentPlayerIndex.value === playersWithRoles.value.length - 1)

// image src depending on current game folder and player role
const imageSrc = computed(() => {
  if (!currentPlayer.value) return ''

  let role = 'innocent'

  if (currentPlayer.value.playerRole === 'Imposteur') role = 'impostor'

  return '/images/games/' + currentFolderName.value + '/' + role + '.png'
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
      <GameImageOrWord :hideContent="hideContent" :showContent="showContent" :imageSrc="imageSrc" />
      <Button :text="isLastPlayer ? 'Passer aux votes' : 'Joueur suivant'" @click="nextPlayer()" />
    </div>
  </section>
</template>
