<script setup>
import IconEye from '@/components/icons/IconEye.vue'
</script>

<template>
  <div class="relative w-full h-[30vh] rounded-xl overflow-hidden">
    <img src="/images/myosotis.png" alt="myosotis" class="w-full h-full object-cover" />
    <div
      class="absolute top-0 left-0 w-full h-full bg-ubox flex flex-col items-center justify-center space-y-4"
    >
      <IconEye />
      <h2 class="text-2xl">Cliquez pour voir l'image</h2>
    </div>
  </div>
</template>
