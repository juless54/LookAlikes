<script setup>
  import GameLink from '@/components/GameLink.vue'
  import { useGameStore } from '@/stores/game'

  const gameStore = useGameStore()
  const { startGame } = gameStore

  function setImageGame() {
    startGame('image')
  }

  function setWordGame() {
    startGame('word')
  }
</script>

<template>
  <main
    class="font-lao bg-bg text-twhite flex flex-col items-center h-screen w-full justify-center space-y-10"
  >
    <h1 class="text-5xl font-kavoon">LookAlikes</h1>
    <GameLink link="/imageGame" text="Jouer avec les images" @click="setImageGame">
      <img src="/images/myosotis.png" alt="myosotis" class="h-[22vh] w-auto rounded-md" />
    </GameLink>
    <GameLink link="/wordGame" text="Jouer avec les mots" @click="setWordGame">
      <div class="h-[20vh] bg-ubox rounded-md w-full flex flex-col items-center justify-center">
        <h3 class="text-3xl font-kavoon">Banane</h3>
      </div>
    </GameLink>
  </main>
</template>
