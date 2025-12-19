<script setup>
import Button from '@/components/Button.vue'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { winnerName } = storeToRefs(gameStore)

function handleClick() {
  console.log('click')
}
</script>

<template>
  <section
    class="relative flex flex-col h-screen w-full bg-bg items-center text-twhite justify-center"
  >
    <div class="flex flex-col items-center justify-between h-[60vh] w-[80vw]">
      <h1 class="text-3xl font-kavoon">La partie est terminée !</h1>
      <h2 class="text-2xl font-kavoon">Les {{ winnerName }} ont gagné</h2>
      <Button text="Rejouer" @click="handleClick()" />
      <Button text="Changer les joueurs" @click="handleClick()" />
      <Button text="Accueil" @click="handleClick()" />
    </div>
  </section>
</template>
