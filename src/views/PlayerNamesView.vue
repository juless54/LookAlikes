<script setup>
  import { storeToRefs } from 'pinia'
  import { ref, computed } from 'vue'

  import Button from '@/components/Button.vue'
  import Modal from '@/components/Modal.vue'
  import { useGameStore } from '@/stores/game'
  import { useGameStateStore } from '@/stores/gamestate'

  // load game store
  const gameStore = useGameStore()
  const { impostorPlayerCount, players } = storeToRefs(gameStore)
  const { addPlayer, removePlayer } = gameStore

  // load game state store
  const gameStateStore = useGameStateStore()
  const { gameStartPhase } = gameStateStore

  // ref for the name input
  const nameInput = ref('')
  // current player index
  const currentIndex = ref(0)
  // current player
  const currentPlayer = computed(() => players.value[currentIndex.value])
  // show or hide player removal modal
  const showRemovalModal = ref(false)

  // register player
  function registerPlayer() {
    if (nameInput.value === '') return
    addPlayer(nameInput.value)
    nameInput.value = ''
  }

  // start the game
  function startGame() {
    gameStartPhase()
  }

  // click on a player name to remove him
  function handlePlayerNameClick(index) {
    currentIndex.value = index
    showRemovalModal.value = true
  }

  // remove player from list
  function removePlayerFromGame() {
    removePlayer(currentPlayer.value.playerName)
    showRemovalModal.value = false
    currentIndex.value = 0
  }
</script>

<template>
  <section
    class="relative flex flex-col h-screen w-full bg-bg items-center text-twhite justify-center"
  >
    <Modal :show-modal="showRemovalModal">
      <h2 v-if="currentPlayer" class="text-2xl text-center">
        Vous allez retirer {{ currentPlayer.playerName }}
      </h2>
      <Button text="Confirmer" @click="removePlayerFromGame()" />
    </Modal>
    <div class="flex flex-col items-center justify-between h-[80vh] w-[80vw]">
      <div class="space-y-6 flex flex-col items-center">
        <h1 class="text-3xl font-kavoon">Entrez votre nom</h1>
        <input
          v-model="nameInput"
          type="text"
          placeholder="Nom"
          class="w-full p-2 bg-ubox rounded-md outline-none placeholder:text-tplaceholder"
          @keyup.enter="registerPlayer()"
        />
        <div class="flex flex-row items-center justify-between w-full text-xl">
          <h2>Imposteurs</h2>
          <input
            v-model.number="impostorPlayerCount"
            type="number"
            class="size-12 bg-ubox outline-none rounded-md text-center text-tplaceholder"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 w-full">
        <div
          v-for="(player, index) in players"
          :key="index"
          class="bg-box text-center rounded-md w-full p-1 border-4 border-box"
          @click="handlePlayerNameClick(index)"
        >
          {{ player.playerName }}
        </div>
      </div>
      <h2>Cliquez sur un nom pour le retirer</h2>
      <div class="flex flex-col items-center space-y-4 w-full">
        <Button text="Ajouter le joueur" @click="registerPlayer()" />
        <Button text="Commencer la partie" @click="startGame()" />
      </div>
    </div>
  </section>
</template>
