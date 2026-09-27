<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description?: string
}>()
</script>

<template>
  <header class="mb-6">
    <p v-if="eyebrow" class="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
      {{ eyebrow }}
    </p>
    <h1 class="text-3xl font-black tracking-tight text-white">{{ title }}</h1>
    <p v-if="description" class="mt-2 max-w-md text-sm leading-6 text-stone-400">
      {{ description }}
    </p>
  </header>
</template>
