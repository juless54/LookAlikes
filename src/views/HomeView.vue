<script setup>
import GameLink from '@/components/GameLink.vue'
</script>

<template>
  <main class="font-lao">
    <h1 class="text-2xl text-red-500">LookAlikes</h1>
    <GameLink link="/imagesGame" text="Jouer avec les images">
      <h3>Image</h3>
    </GameLink>
    <GameLink link="/wordsGame" text="Jouer avec les mots">
      <h3>Mots</h3>
    </GameLink>
  </main>
</template>
