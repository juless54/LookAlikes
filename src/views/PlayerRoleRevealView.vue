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
    <div class="flex flex-col items-center justify-between h-[60vh] w-[80vw]">
      <div class="flex flex-col items-center space-y-4">
        <h1 v-if="currentPlayer" class="text-3xl font-kavoon">
          Joueur {{ currentPlayer.playerName }}
        </h1>
        <h2 class="text-xl">Prenez le temps de bien regarder</h2>
      </div>
      <Button text="Joueur suivant" @click="nextPlayer()" />
    </div>
  </section>
</template>
