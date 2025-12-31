<script setup>
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'

  import Button from '@/components/Button.vue'
  import { useGameStore } from '@/stores/game'
  import { useGameStateStore } from '@/stores/gamestate'

  // --- Stores ---
  const gameStore = useGameStore()
  const { currentFolderName, currentWord, gameMode, players, winnerName } = storeToRefs(gameStore)
  const { resetPlayers } = gameStore

  const gameStateStore = useGameStateStore()
  const { gameStartPhase, resetGame } = gameStateStore

  // --- Router ---
  const router = useRouter()

  // --- Computed ---
  const impostors = computed(() => players.value.filter(p => p.playerRole === 'Imposteur'))
  const misterWhite = computed(() => players.value.find(p => p.playerRole === 'Mister White'))

  const innocentSrc = computed(() =>
    gameMode.value === 'image' ? `/images/games/${currentFolderName.value}/innocent.png` : null
  )
  const impostorSrc = computed(() =>
    gameMode.value === 'image' ? `/images/games/${currentFolderName.value}/impostor.png` : null
  )

  const chosenContent = computed(() => {
    if (gameMode.value === 'word' && currentWord.value) {
      return {
        chooser: gameStore.wordsChooserName,
        impostor: currentWord.value.impostor,
        innocent: currentWord.value.innocent,
      }
    }
    if (gameMode.value === 'image') {
      return {
        chooser: gameStore.imagesChooserName,
      }
    }
    return {}
  })

  // --- Methods ---
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

      <!-- Innocents -->
      <div class="flex flex-col items-center w-[70vw] rounded-xl h-auto overflow-hidden">
        <img
          v-if="gameMode === 'image'"
          :src="innocentSrc"
          alt="innocent"
          class="w-full h-[17vh] object-contain bg-box"
        />
        <div v-if="gameMode === 'word'" class="bg-box w-full p-2 text-center text-xl">
          {{ chosenContent.innocent }}
        </div>
        <div class="bg-box w-full p-2 text-center text-xl">Innocents</div>
      </div>

      <!-- Imposteurs -->
      <div
        v-if="impostors.length"
        class="flex flex-col items-center w-[70vw] rounded-xl overflow-hidden"
      >
        <img
          v-if="gameMode === 'image'"
          :src="impostorSrc"
          alt="impostor"
          class="w-full h-[17vh] object-contain bg-box"
        />
        <div v-if="gameMode === 'word'" class="bg-box w-full p-2 text-center text-xl">
          {{ chosenContent.impostor }}
        </div>
        <div class="bg-box w-full p-2 text-center text-xl">Imposteurs ({{ impostors.length }})</div>
        <div class="bg-box w-full text-center text-sm pb-2">
          {{ impostors.map(p => p.playerName).join(', ') }}
        </div>
      </div>

      <!-- Mister White -->
      <div
        v-if="misterWhite"
        class="flex flex-col items-center w-[70vw] rounded-xl overflow-hidden"
      >
        <div class="bg-box w-full p-2 text-center text-xl">
          Mister White ({{ misterWhite.playerName }})
        </div>
      </div>

      <!-- Content chooser -->
      <div v-if="chosenContent.chooser" class="mt-2 text-sm text-center text-twhite">
        Choisi par : {{ chosenContent.chooser }}
      </div>

      <!-- Actions -->
      <div class="flex flex-col w-full items-center space-y-4 mt-4">
        <Button text="Rejouer" @click="gameStartPhase()" />
        <Button text="Changer les joueurs" @click="handleClick()" />
        <Button text="Accueil" @click="goToHome()" />
      </div>
    </div>
  </section>
</template>
