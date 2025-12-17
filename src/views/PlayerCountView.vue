<script setup>
import { useGameStore } from '@/stores/game'
import { useGameStateStore } from '@/stores/gamestate'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { normalPlayerCount, impostorPlayerCount } = storeToRefs(gameStore)
</script>

<template>
  <section class="flex flex-col h-screen w-full bg-bg items-center text-twhite justify-center">
    <div class="flex flex-col items-center justify-between h-[60vh]">
      <h1 class="text-3xl font-kavoon">Nombre de Joueurs</h1>
      <div class="flex flex-col items-center w-full space-y-12 text-xl">
        <div class="flex flex-row items-center justify-between w-full">
          <h2>Innocents</h2>
          <input
            type="number"
            :value="normalPlayerCount"
            class="size-12 bg-ubox outline-none rounded-md ps-2 text-tplaceholder"
          />
        </div>
        <div class="flex flex-row items-center justify-between w-full">
          <h2>Imposteurs</h2>
          <input
            type="number"
            :value="impostorPlayerCount"
            class="size-12 bg-ubox outline-none rounded-md ps-2 text-tplaceholder"
          />
        </div>
      </div>
      <button
        class="w-full bg-box shadow-gshadow/25 shadow-[0_0_2px_2px] rounded-xl p-2 font-kavoon text-xl"
      >
        Commencer
      </button>
    </div>
  </section>
</template>
