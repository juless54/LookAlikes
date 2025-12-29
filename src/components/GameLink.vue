<script setup>
  import { RouterLink } from 'vue-router'

  defineProps({
    link: String,
    text: String,
  })
</script>

<template>
  <RouterLink
    :to="link"
    class="rounded-xl bg-box shadow-gshadow/25 shadow-[0_0_2px_2px] p-6 flex flex-col space-y-6 items-center min-w-[60vw] min-h-[30vh]"
  >
    <slot />
    <h2 class="text-xl">{{ text }}</h2>
  </RouterLink>
</template>
