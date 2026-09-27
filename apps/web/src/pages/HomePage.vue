<script setup lang="ts">
import AppShell from '@/layouts/AppShell.vue'
</script>

<template>
  <AppShell>
    <header class="mb-7 flex items-center justify-between gap-4">
      <div>
        <p class="text-sm font-bold text-blue-300">Welcome back</p>
        <h1 class="mt-1 text-3xl font-black tracking-[-0.04em]">Ready to get good at this?</h1>
      </div>

      <button
        type="button"
        aria-label="Open profile and settings"
        class="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.055] text-sm font-black text-stone-200"
      >
        JW
      </button>
    </header>

    <section class="rounded-[1.75rem] border border-blue-300/15 bg-gradient-to-br from-blue-400/[0.14] via-white/[0.035] to-indigo-400/[0.05] p-5">
      <div class="flex items-end justify-between gap-4">
        <div>
          <p class="text-sm font-semibold text-stone-300">Overall mastery</p>
          <p class="mt-2 text-5xl font-black tracking-[-0.06em]">0%</p>
        </div>
        <span class="rounded-full border border-blue-300/15 bg-blue-400/[0.10] px-3 py-1 text-xs font-extrabold text-blue-200">Just getting started</span>
      </div>
      <div class="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.08]">
        <div class="h-full w-0 rounded-full bg-blue-300" />
      </div>
    </section>

    <section class="mt-7">
      <div class="mb-3 flex items-center justify-between">
        <h2 class="text-lg font-extrabold">Start learning</h2>
        <span class="text-xs font-semibold text-stone-600">Geography first</span>
      </div>

      <RouterLink
        to="/learn/geography/europe"
        class="group block overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-white/[0.045] p-5 transition active:scale-[0.99]"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-300">First challenge</p>
            <h3 class="mt-2 text-xl font-extrabold">Learn Europe</h3>
            <p class="mt-2 max-w-sm text-sm leading-6 text-stone-400">
              Learn flags, countries and capitals in shuffled sets — no alphabetical shortcuts.
            </p>
          </div>
          <span class="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-300 text-lg font-black text-[#06101d] transition group-hover:translate-x-0.5">→</span>
        </div>
      </RouterLink>
    </section>

    <section class="mt-5 grid grid-cols-3 gap-2">
      <div class="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3">
        <p class="text-2xl font-black">0</p>
        <p class="mt-1 text-xs font-semibold text-stone-500">Countries strong</p>
      </div>
      <div class="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3">
        <p class="text-2xl font-black">0</p>
        <p class="mt-1 text-xs font-semibold text-stone-500">Flags strong</p>
      </div>
      <div class="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3">
        <p class="text-2xl font-black">0</p>
        <p class="mt-1 text-xs font-semibold text-stone-500">Capitals strong</p>
      </div>
    </section>
  </AppShell>
</template>
