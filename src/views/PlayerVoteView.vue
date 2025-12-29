<script setup>
  import { storeToRefs } from 'pinia'
  import { computed, ref } from 'vue'

  import Button from '@/components/Button.vue'
  import Modal from '@/components/Modal.vue'
  import { useGameStore } from '@/stores/game'
  import { useGameStateStore } from '@/stores/gamestate'

  // get game data store
  const gameStore = useGameStore()
  const { players } = storeToRefs(gameStore)
  const { checkGameEnd, eliminatePlayerFromGame } = gameStore

  // get game state store
  const gameStateStore = useGameStateStore()
  const { gameEndPhase } = gameStateStore

  // current player being voted
  const currentIndex = ref(0)
  // show the elimination confirmation modal
  const showEliminationConfirmationModal = ref(false)
  // show the role reveal modal
  const showRoleRevealModal = ref(false)

  // current player for vote
  const currentPlayer = computed(() => players.value[currentIndex.value])

  // change person to vote
  function handleVoteChange(index) {
    currentIndex.value = index
  }

  // vote for the person to eliminate
  function handleVote() {
    showEliminationConfirmationModal.value = true
  }

  // show the player's role
  function revealPlayerRole() {
    showEliminationConfirmationModal.value = false
    showRoleRevealModal.value = true
  }

  // eliminate the player
  function eliminatePlayer() {
    // remove player
    eliminatePlayerFromGame(currentIndex.value)
    // reset current player for vote and close modal
    currentIndex.value = 0
    showRoleRevealModal.value = false
    // check for game end and change gamestate if needed
    const isEnd = checkGameEnd()
    if (isEnd) gameEndPhase()
  }
</script>

<template>
  <section
    class="relative flex flex-col h-screen w-full bg-bg items-center text-twhite justify-center"
  >
    <Modal :show-modal="showEliminationConfirmationModal">
      <h2 v-if="currentPlayer" class="text-2xl text-center">
        Vous allez éliminer {{ currentPlayer.playerName }}
      </h2>
      <Button text="Confirmer" @click="revealPlayerRole()" />
      <Button text="Annuler" @click="showEliminationConfirmationModal = false" />
    </Modal>
    <Modal :show-modal="showRoleRevealModal">
      <h2 v-if="currentPlayer" class="text-2xl text-center">
        {{ currentPlayer.playerName }} était {{ currentPlayer.playerRole }}
      </h2>
      <Button text="Reprendre le jeu" @click="eliminatePlayer()" />
    </Modal>
    <div class="flex flex-col items-center justify-between h-[60vh] w-[80vw]">
      <div class="flex flex-col w-full items-center space-y-4">
        <h1 class="text-3xl font-kavoon">Débatez !</h1>
        <h2 class="text-xl">Qui éliminer ?</h2>
      </div>
      <div class="grid grid-cols-2 gap-4 w-full">
        <div
          v-for="(player, index) in players"
          v-show="!player.isEliminated"
          :key="index"
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
