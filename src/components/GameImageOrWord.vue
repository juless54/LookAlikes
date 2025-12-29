<script setup>
  import IconEye from '@/components/icons/IconEye.vue'

  defineProps({
    hideContent: Boolean,
    imageSrc: String,
    isMisterWhite: Boolean,
    showContent: Function,
  })
</script>

<template>
  <div class="relative w-full h-[30vh] rounded-xl overflow-hidden border-2 border-box bg-ubox">
    <div class="w-full h-full flex items-center justify-center">
      <div v-if="isMisterWhite" class="text-center">
        <h2 class="text-4xl font-kavoon text-twhite">???</h2>
        <p class="text-twhite mt-4">Vous êtes Mister White</p>
      </div>

      <img v-else :src="imageSrc" alt="game image" class="w-full h-full object-cover" />
    </div>

    <div
      v-if="hideContent"
      class="absolute top-0 left-0 w-full h-full bg-ubox flex flex-col items-center justify-center space-y-4 cursor-pointer hover:bg-box transition-colors"
      @click="showContent"
    >
      <IconEye class="size-12" />
      <h2 class="text-2xl font-kavoon">Cliquez pour voir</h2>
    </div>
  </div>
</template>
