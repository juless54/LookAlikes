<script setup>
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'

  import Button from '@/components/Button.vue'
  import { useGameStore } from '@/stores/game'
  import { useGameStateStore } from '@/stores/gamestate'

  // get game data store
  const gameStore = useGameStore()
  const { currentFolderName, winnerName } = storeToRefs(gameStore)
  const { resetPlayers } = gameStore

  // get game state store
  const gameStateStore = useGameStateStore()
  const { gameStartPhase, resetGame } = gameStateStore

  // get vue router
  const router = useRouter()

  // impostor image src
  const impostorSrc = computed(() => '/images/games/' + currentFolderName.value + '/impostor.png')
  // innocent image src
  const innocentSrc = computed(() => '/images/games/' + currentFolderName.value + '/innocent.png')

  // go to home page
  function goToHome() {
    resetGame()
    resetPlayers()
    router.push('/')
  }

  function handleClick() {
    resetGame()
  }
</script>

<template>
  <section
    class="relative flex flex-col h-screen w-full bg-bg items-center text-twhite justify-center"
  >
    <div class="flex flex-col items-center justify-between h-[80vh] w-[80vw]">
      <h1 class="text-3xl font-kavoon">La partie est terminée</h1>
      <h2 class="text-2xl font-kavoon">Les {{ winnerName }} ont gagné</h2>
      <div class="flex flex-col items-center w-[70vw] rounded-xl h-auto overflow-hidden">
        <img :src="innocentSrc" alt="innocent" class="w-full h-[17vh] object-cover" />
        <div class="bg-box w-full p-2 text-center text-xl">Innocents</div>
      </div>
      <div class="flex flex-col items-center w-[70vw] rounded-xl h-auto overflow-hidden">
        <img :src="impostorSrc" alt="impostor" class="w-full h-[17vh] object-cover" />
        <div class="bg-box w-full p-2 text-center text-xl">Imposteurs</div>
      </div>
      <div class="flex flex-col w-full items-center space-y-4">
        <Button text="Rejouer" @click="gameStartPhase()" />
        <Button text="Changer les joueurs" @click="handleClick()" />
        <Button text="Accueil" @click="goToHome()" />
      </div>
    </div>
  </section>
</template>
