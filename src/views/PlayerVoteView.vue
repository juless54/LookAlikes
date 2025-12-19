<script setup>
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import Button from '@/components/Button.vue'
import { computed, ref } from 'vue'
import { useGameStateStore } from '@/stores/gamestate'

// get game data store
const gameStore = useGameStore()
const { playersWithRoles } = storeToRefs(gameStore)
const { checkGameEnd, removePlayerWithRole } = gameStore

// get game state store
const gameStateStore = useGameStateStore()
const { gameEndPhase } = gameStateStore

// current player being voted
const currentIndex = ref(0)
// show the elimination modal
const showModal = ref(false)

// current player for vote
const currentPlayer = computed(() => playersWithRoles.value[currentIndex.value])

// change person to vote
function handleVoteChange(index) {
  currentIndex.value = index
}

// vote for the person to eliminate
function handleVote() {
  showModal.value = true
}

// eliminate the player
function eliminatePlayer() {
  removePlayerWithRole(currentPlayer.value)
  const isEnd = checkGameEnd()
  if (isEnd) gameEndPhase()
  showModal.value = false
}
</script>

<template>
  <section
    class="relative flex flex-col h-screen w-full bg-bg items-center text-twhite justify-center"
  >
    <div
      id="modal"
      v-show="showModal"
      class="absolute top-0 left-0 w-full h-screen bg-bg/70 backdrop-blur-sm flex flex-col items-center justify-center"
    >
      <div
        class="w-[80vw] bg-ubox p-4 rounded-md shadow-gshadow/25 shadow-[0_0_2px_2px] flex flex-col items-center space-y-6"
      >
        <h2 v-if="currentPlayer" class="text-2xl text-center">
          Vous allez éliminer {{ currentPlayer.playerName }}
        </h2>
        <Button text="Confirmer" @click="eliminatePlayer()" />
      </div>
    </div>
    <div class="flex flex-col items-center justify-between h-[60vh] w-[80vw]">
      <div class="flex flex-col w-full items-center space-y-4">
        <h1 class="text-3xl font-kavoon">Débatez !</h1>
        <h2 class="text-xl">Qui éliminer ?</h2>
      </div>
      <div class="grid grid-cols-2 gap-4 w-full">
        <div
          v-for="(player, index) in playersWithRoles"
          class="bg-box text-center rounded-md w-full p-1"
          :class="index === currentIndex ? 'border-4 border-ubox' : 'border-4 border-box'"
          @click="handleVoteChange(index)"
        >
          {{ player.playerName }}
        </div>
      </div>
      <Button text="Voter" @click="handleVote()" />
    </div>
  </section>
</template>
