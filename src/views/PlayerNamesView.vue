<script setup>
  import { storeToRefs } from 'pinia'
  import { ref, computed } from 'vue'

  import Button from '@/components/Button.vue'
  import { useGameStore } from '@/stores/game'
  import { useGameStateStore } from '@/stores/gamestate'

  const gameStore = useGameStore()
  const { impostorPlayerCount, players } = storeToRefs(gameStore)
  const { addPlayer, gameMode, removePlayer } = gameStore

  const gameStateStore = useGameStateStore()
  const { gameStartPhase } = gameStateStore

  const nameInput = ref('')

  // 1. Vérification des doublons
  const isDuplicate = computed(() => {
    return players.value.some(
      p => p.playerName.toLowerCase() === nameInput.value.trim().toLowerCase()
    )
  })

  function registerPlayer() {
    if (nameInput.value === '' || isDuplicate.value) return
    addPlayer(nameInput.value)
    nameInput.value = ''
  }

  function removeAllPlayers() {
    players.value.slice().forEach(player => {
      removePlayer(player.playerName)
    })
  }

  function startGame() {
    if (players.value.length >= 3) {
      gameStartPhase()
    }
  }

  // 2. Suppression directe sans modal
  function handlePlayerNameClick(player) {
    removePlayer(player.playerName)
  }
</script>

<template>
  <section
    class="relative flex flex-col h-screen w-full bg-bg items-center text-twhite justify-center"
  >
    <div class="flex flex-col items-center justify-between h-[80vh] w-[80vw]">
      <div class="space-y-6 flex flex-col items-center w-full">
        <h1 class="text-5xl font-kavoon">
          {{ gameMode === 'image' ? "Jeu d'images" : 'Jeu de mots' }}
        </h1>
        <h2 class="text-3xl font-kavoon">Entrez votre nom</h2>

        <div class="w-full relative">
          <input
            v-model="nameInput"
            type="text"
            placeholder="Nom"
            class="w-full p-2 bg-ubox rounded-md outline-none placeholder:text-tplaceholder"
            :class="{ 'border-2 border-red-500': isDuplicate }"
            @keyup.enter="registerPlayer()"
          />
          <p v-if="isDuplicate" class="text-red-500 text-[10px] absolute mt-1">
            Ce nom existe déjà
          </p>
        </div>

        <div class="flex flex-row items-center justify-between w-full text-xl">
          <h2>Imposteurs</h2>
          <input
            v-model.number="impostorPlayerCount"
            type="number"
            class="size-12 bg-ubox outline-none rounded-md text-center text-tplaceholder"
          />
        </div>
      </div>

      <div class="w-full space-y-2">
        <div class="flex justify-between text-xs text-tplaceholder font-bold px-1">
          <span>CLIQUEZ SUR UN NOM POUR LE RETIRER /</span>
          <span>JOUEURS : {{ players.length }}</span>
        </div>

        <div class="grid grid-cols-2 gap-4 w-full max-h-[30vh] overflow-y-auto p-1">
          <div
            v-for="(player, index) in players"
            :key="index"
            class="bg-box text-center rounded-md w-full p-1 border-4 border-box hover:border-red-500/50 cursor-pointer transition-colors relative group overflow-hidden whitespace-nowrap text-ellipsis"
            @click="handlePlayerNameClick(player)"
          >
            {{ player.playerName }}
            <span
              class="absolute right-1 top-0 text-xs text-red-500 opacity-0 group-hover:opacity-100"
              >✕</span
            >
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center space-y-4 w-full">
        <Button
          text="Ajouter le joueur"
          :class="{ 'opacity-50': isDuplicate || !nameInput }"
          @click="registerPlayer()"
        />
        <Button text="Retirer tous les joueurs" @click="removeAllPlayers()" />
        <Button
          text="Commencer la partie"
          :class="{ 'opacity-50': players.length < 3 }"
          @click="startGame()"
        />
      </div>
    </div>
  </section>
</template>
