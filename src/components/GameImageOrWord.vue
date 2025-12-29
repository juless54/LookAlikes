<script setup>
  import { defineProps } from 'vue'

  import IconEye from '@/components/icons/IconEye.vue'

  defineProps({
    hideContent: Boolean,
    imageSrc: String,
    showContent: Function,
  })
</script>

<template>
  <div class="relative w-full h-[30vh] rounded-xl overflow-hidden">
    <img :src="imageSrc" alt="game image" class="w-full h-full object-cover" />
    <div
      v-show="hideContent"
      class="absolute top-0 left-0 w-full h-full bg-ubox flex flex-col items-center justify-center space-y-4"
      @click="showContent"
    >
      <IconEye />
      <h2 class="text-2xl">Cliquez pour voir l'image</h2>
    </div>
  </div>
</template>
