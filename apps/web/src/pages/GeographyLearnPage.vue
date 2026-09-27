<script setup lang="ts">
import { EUROPE_COUNTRY_COUNT } from '@knowledge/geography'
import AppShell from '@/layouts/AppShell.vue'
</script>

<template>
  <AppShell>
    <header class="mb-6">
      <RouterLink
        to="/learn"
        class="mb-5 inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-white"
      >
        <span aria-hidden="true">←</span>
        <span>All subjects</span>
      </RouterLink>

      <p class="text-xs font-black uppercase tracking-[0.18em] text-blue-300">Geography</p>
      <h1 class="mt-2 text-3xl font-black tracking-[-0.04em] text-white">Start somewhere manageable.</h1>
      <p class="mt-2 max-w-md text-sm leading-6 text-slate-400">
        Learn in shuffled groups rather than memorising a predictable list.
      </p>
    </header>

    <RouterLink
      to="/learn/geography/europe"
      class="group block rounded-[1.75rem] border border-blue-300/20 bg-gradient-to-br from-[#10284a] via-[#0c1b30] to-[#091522] p-5 shadow-xl shadow-black/10 transition active:scale-[0.99]"
    >
      <div class="flex items-start justify-between gap-5">
        <div>
          <div class="flex items-center gap-3">
            <span class="grid size-11 place-items-center rounded-2xl bg-white/[0.07] text-2xl">🌍</span>
            <div>
              <p class="text-xs font-black uppercase tracking-[0.16em] text-blue-300">Ready to learn</p>
              <h2 class="mt-1 text-2xl font-black tracking-[-0.035em] text-white">Europe</h2>
            </div>
          </div>

          <p class="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            Work through random sets of 10. Each set avoids repeats until it needs them.
          </p>
        </div>

        <span class="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-200 text-xl font-black text-[#07111f] transition group-hover:translate-x-0.5">
          →
        </span>
      </div>

      <div class="mt-5 grid grid-cols-3 gap-2 border-t border-white/[0.07] pt-4">
        <div>
          <p class="text-lg font-black text-white">{{ EUROPE_COUNTRY_COUNT }}</p>
          <p class="mt-0.5 text-[0.7rem] font-semibold text-slate-500">Countries</p>
        </div>
        <div>
          <p class="text-lg font-black text-white">10</p>
          <p class="mt-0.5 text-[0.7rem] font-semibold text-slate-500">Per set</p>
        </div>
        <div>
          <p class="text-lg font-black text-white">∞</p>
          <p class="mt-0.5 text-[0.7rem] font-semibold text-slate-500">Shuffles</p>
        </div>
      </div>
    </RouterLink>

    <section class="mt-6">
      <h2 class="mb-3 text-sm font-extrabold text-slate-300">Coming later</h2>
      <div class="grid grid-cols-2 gap-2">
        <div
          v-for="continent in ['Asia', 'Africa', 'North America', 'South America', 'Oceania']"
          :key="continent"
          class="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm font-bold text-slate-600"
        >
          {{ continent }}
        </div>
      </div>
    </section>
  </AppShell>
</template>
