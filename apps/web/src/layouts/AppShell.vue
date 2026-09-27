<script setup lang="ts">
import BottomNav from '@/components/navigation/BottomNav.vue'
</script>

<template>
  <div class="mx-auto min-h-dvh w-full max-w-[600px] bg-[#07111f]/95 shadow-2xl shadow-black/30">
    <main class="min-h-dvh px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-[calc(1.25rem+env(safe-area-inset-top))]">
      <slot />
    </main>

    <BottomNav />
  </div>
</template>
