<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  text: String,
  link: String,
})
</script>

<template>
  <RouterLink :to="link">
    <slot />
    <h2>{{ text }}</h2>
  </RouterLink>
</template>
