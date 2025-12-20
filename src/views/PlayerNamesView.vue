<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { useGameStateStore } from '@/stores/gamestate'
import { storeToRefs } from 'pinia'
import Button from '@/components/Button.vue'

// load game store
const gameStore = useGameStore()
const { players, impostorPlayerCount } = storeToRefs(gameStore)
const { addPlayer } = gameStore

// load game state store
const gameStateStore = useGameStateStore()
const { gameStartPhase } = gameStateStore

// ref for the name input
const nameInput = ref('')

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
</script>

<template>
  <section class="flex flex-col h-screen w-full bg-bg items-center text-twhite justify-center">
    <div class="flex flex-col items-center justify-between h-[70vh] w-[80vw]">
      <div class="space-y-6 flex flex-col items-center">
        <h1 class="text-3xl font-kavoon">Entrez votre nom</h1>
        <input
          type="text"
          placeholder="Nom"
          v-model="nameInput"
          class="w-full p-2 bg-ubox rounded-md outline-none placeholder:text-tplaceholder"
        />
        <div class="flex flex-row items-center justify-between w-full text-xl">
          <h2>Imposteurs</h2>
          <input
            type="number"
            v-model.number="impostorPlayerCount"
            class="size-12 bg-ubox outline-none rounded-md text-center text-tplaceholder"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 w-full">
        <div v-for="player in players" class="bg-box text-center rounded-md w-full p-2">
          {{ player.playerName }}
        </div>
      </div>
      <div class="flex flex-col items-center space-y-4 w-full">
        <Button text="Ajouter le joueur" @click="registerPlayer()" />
        <Button text="Commencer la partie" @click="startGame()" />
      </div>
    </div>
  </section>
</template>
