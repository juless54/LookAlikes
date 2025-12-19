<script setup>
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import Button from '@/components/Button.vue'
import { computed, ref } from 'vue'

// get game data store
const gameStore = useGameStore()
const { playersWithRoles } = storeToRefs(gameStore)

// current player being voted
const currentIndex = ref(0)

// current player for vote
const currentPlayer = computed(() => playersWithRoles.value[currentIndex.value])

// change person to vote
function handleVoteChange(index) {
  currentIndex.value = index
}

// vote for the person to eliminate
function handleVote() {
  console.log('vote pour ', currentPlayer.value.playerName)
}
</script>

<template>
  <section class="flex flex-col h-screen w-full bg-bg items-center text-twhite justify-center">
    <div class="flex flex-col items-center justify-between h-[60vh] w-[80vw]">
      <h1 class="text-3xl font-kavoon">Débatez !</h1>
      <div class="grid grid-cols-2 gap-4 w-full">
        <div
          v-for="(player, index) in playersWithRoles"
          class="bg-box text-center rounded-md w-full p-1"
          :class="index === currentIndex ? 'border-4 border-ubox' : 'border-4 border-box'"
          @click="handleVoteChange(index)"
        >
          {{ player.playerName }}
        </div>
      </div>
      <Button text="Voter" @click="handleVote()" />
    </div>
  </section>
</template>
