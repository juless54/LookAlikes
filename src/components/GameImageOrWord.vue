<script setup>
  import IconEye from '@/components/icons/IconEye.vue'

  defineProps({
    contentType: {
      required: true,
      type: String,
    },
    hideContent: Boolean,
    imageSrc: String,
    isMisterWhite: Boolean,
    showContent: Function,
    word: String,
  })
</script>

<template>
  <div class="relative w-full h-[30vh] rounded-xl overflow-hidden border-2 bg-ubox">
    <div class="w-full h-full flex items-center justify-center">
      <!-- Mister White -->
      <div v-if="isMisterWhite" class="text-center">
        <h2 class="text-4xl font-kavoon">???</h2>
        <p class="mt-4">Vous êtes Mister White</p>
      </div>

      <!-- Image -->
      <img
        v-else-if="contentType === 'image'"
        :src="imageSrc"
        class="w-full h-full object-contain"
      />

      <!-- Word -->
      <h2 v-else class="text-3xl font-kavoon text-center">
        {{ word }}
      </h2>
    </div>

    <div
      v-if="hideContent"
      class="absolute inset-0 bg-ubox flex flex-col items-center justify-center cursor-pointer"
      @click="showContent"
    >
      <IconEye class="size-12" />
      <h2 class="text-2xl font-kavoon">Cliquez pour voir</h2>
    </div>
  </div>
</template>
