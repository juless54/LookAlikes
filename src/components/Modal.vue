<script setup>
  defineProps({
    showModal: Boolean,
  })
</script>

<template>
  <div
    v-show="showModal"
    class="absolute top-0 left-0 w-full h-screen bg-bg/70 backdrop-blur-sm flex flex-col items-center justify-center"
  >
    <div
      class="w-[80vw] bg-ubox p-4 rounded-md shadow-gshadow/25 shadow-[0_0_2px_2px] flex flex-col items-center space-y-6"
    >
      <slot />
    </div>
  </div>
</template>
