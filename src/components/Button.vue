<script setup>
  defineProps({
    text: String,
  })

  const emit = defineEmits(['click'])
</script>

<template>
  <button
    class="w-full bg-box shadow-gshadow/25 shadow-[0_0_2px_2px] rounded-xl p-2 font-kavoon text-xl"
    @click="emit('click')"
  >
    {{ text }}
  </button>
</template>
