<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { useGameStateStore } from '@/stores/gamestate'
import { storeToRefs } from 'pinia'
import Button from '@/components/Button.vue'

// load game store
const gameStore = useGameStore()
const { players, totalPlayersCount } = storeToRefs(gameStore)
const { addPlayer } = gameStore

// load game state store
const gameStateStore = useGameStateStore()
const { gameStartPhase } = gameStateStore

// ref for the name input
const nameInput = ref('')
// check if all players are ready
const allPlayersRegistered = computed(() => players.value.length === totalPlayersCount.value)

// register player
function registerPlayer() {
  if (nameInput.value === '') return
  addPlayer(nameInput.value)
  nameInput.value = ''
}

// handle button click
function handleClick() {
  if (allPlayersRegistered.value) {
    gameStartPhase()
  } else {
    registerPlayer()
  }
}
</script>

<template>
  <section class="flex flex-col h-screen w-full bg-bg items-center text-twhite justify-center">
    <div class="flex flex-col items-center justify-between h-[60vh]">
      <div class="space-y-6 flex flex-col items-center">
        <h1 class="text-3xl font-kavoon">Entrez votre nom</h1>
        <input
          type="text"
          placeholder="Nom"
          v-model="nameInput"
          class="w-full p-2 bg-ubox rounded-md outline-none placeholder:text-tplaceholder"
        />
      </div>
      <div class="grid grid-cols-2 gap-4 w-full">
        <div v-for="player in players" class="bg-box text-center rounded-md w-full p-1">
          {{ player }}
        </div>
      </div>
      <Button
        :text="allPlayersRegistered ? 'Commencer la partie' : 'Ajouter le joueur'"
        @click="handleClick()"
      />
    </div>
  </section>
</template>
