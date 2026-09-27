<script setup lang="ts">
const items = [
  { label: 'Home', to: '/home', icon: '⌂' },
  { label: 'Learn', to: '/learn', icon: '◇' },
  { label: 'Quiz', to: '/quiz', icon: '?' },
  { label: 'Friends', to: '/friends', icon: '◎' },
]
</script>

<template>
  <nav
    aria-label="Primary navigation"
    class="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[600px] border-t border-white/[0.07] bg-[#07111f]/95 px-3 pb-[calc(.65rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur"
  >
    <div class="grid grid-cols-4 gap-1">
      <RouterLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-semibold text-stone-600 transition"
        active-class="bg-blue-400/[0.10] text-blue-300"
      >
        <span aria-hidden="true" class="text-lg leading-none">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </RouterLink>
    </div>
  </nav>
</template>
