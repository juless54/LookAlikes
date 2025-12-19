<script setup>
import IconEye from '@/components/icons/IconEye.vue'
import { ref, defineProps } from 'vue'

const props = defineProps({
  hideContent: Boolean,
  showContent: Function,
  imageSrc: String,
})
</script>

<template>
  <div class="relative w-full h-[30vh] rounded-xl overflow-hidden">
    <img :src="imageSrc" alt="game image" class="w-full h-full object-cover" />
    <div
      @click="showContent"
      class="absolute top-0 left-0 w-full h-full bg-ubox flex flex-col items-center justify-center space-y-4"
      v-show="hideContent"
    >
      <IconEye />
      <h2 class="text-2xl">Cliquez pour voir l'image</h2>
    </div>
  </div>
</template>
