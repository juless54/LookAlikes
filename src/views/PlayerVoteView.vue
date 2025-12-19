<script setup>
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import Button from '@/components/Button.vue'

// get game data store
const gameStore = useGameStore()
const { playersWithRoles } = storeToRefs(gameStore)

function handleClick() {
  console.log('vote')
}
</script>

<template>
  <section class="flex flex-col h-screen w-full bg-bg items-center text-twhite justify-center">
    <div class="flex flex-col items-center justify-between h-[60vh] w-[80vw]">
      <h1 class="text-3xl font-kavoon">Débatez !</h1>
      <div class="grid grid-cols-2 gap-4 w-full">
        <div v-for="player in playersWithRoles" class="bg-box text-center rounded-md w-full p-1">
          {{ player.playerName }}
        </div>
      </div>
      <Button text="Voter" @click="handleClick()" />
    </div>
  </section>
</template>
