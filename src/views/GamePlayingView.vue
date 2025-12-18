<script setup>
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import Button from '@/components/Button.vue'

// load game data store
const gameStore = useGameStore()
const { playersWithRoles } = storeToRefs(gameStore)

// current player index in roles array
const currentPlayerIndex = ref(0)

// current player
const currentPlayer = computed(() => playersWithRoles.value[currentPlayerIndex.value])

// swap to next player
function nextPlayer() {
  if (currentPlayerIndex.value === playersWithRoles.value.length - 1) return

  currentPlayerIndex.value++
}
</script>

<template>
  <section class="flex flex-col h-screen w-full bg-bg items-center text-twhite justify-center">
    <h1 v-if="currentPlayer" class="text-3xl font-kavoon">Joueur {{ currentPlayer.playerName }}</h1>
    <h2>Prenez le temps de bien regarder</h2>
    <Button text="Joueur suivant" @click="nextPlayer()" />
  </section>
</template>
