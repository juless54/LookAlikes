<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// show or hide menu
const showMenu = ref(false)

// bars for menu icon
const menuBar = [0, 1, 2]

// show or hide menu
function toggleMenu() {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <nav class="flex flex-row items-center justify-between fixed top-0 w-full text-twhite z-10 p-4">
    <h2 class="font-kavoon text-2xl">LookAlikes</h2>
    <div class="flex flex-col items-center space-y-1 relative">
      <div
        @click="toggleMenu()"
        v-for="number in menuBar"
        class="bg-twhite w-10 h-1.5 rounded-md"
      />
      <div
        :class="showMenu ? 'translate-x-0' : 'translate-x-[50vw]'"
        class="absolute top-10 right-0 bg-box w-[30vw] p-2 rounded-md text-center transition-all duration-300 ease-in-out"
      >
        <RouterLink to="/">Accueil</RouterLink>
      </div>
    </div>
  </nav>
</template>
