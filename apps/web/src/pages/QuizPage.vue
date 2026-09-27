<script setup lang="ts">
import AppShell from '@/layouts/AppShell.vue'
import PageHeader from '@/components/PageHeader.vue'
</script>

<template>
  <AppShell>
    <PageHeader
      eyebrow="Quiz"
      title="Test what sticks"
      description="Start with flags of Europe. Every quiz uses a shuffled deck, unique questions and balanced answer positions."
    />

    <section class="space-y-3">
      <RouterLink
        to="/quiz/play?mode=flag-country&scope=europe"
        class="group block overflow-hidden rounded-[1.75rem] border border-blue-300/20 bg-gradient-to-br from-blue-400/[0.16] via-white/[0.045] to-indigo-400/[0.06] p-5 transition active:scale-[0.99]"
      >
        <div class="flex items-start justify-between gap-5">
          <div>
            <div class="mb-5 grid size-12 place-items-center rounded-2xl border border-blue-200/15 bg-blue-300/[0.10] text-2xl">
              🏳️
            </div>
            <p class="text-xs font-black uppercase tracking-[0.18em] text-blue-300">Ready now</p>
            <h2 class="mt-2 text-2xl font-black tracking-[-0.035em] text-white">Flag → Country</h2>
            <p class="mt-2 max-w-sm text-sm leading-6 text-slate-400">
              10 European flags. Pick the right country from four shuffled answers.
            </p>
          </div>

          <span class="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-200 text-xl font-black text-[#07111f] transition group-hover:translate-x-0.5">
            →
          </span>
        </div>

        <div class="mt-6 grid grid-cols-3 gap-2 border-t border-white/[0.07] pt-4 text-xs font-bold text-slate-400">
          <span>10 questions</span>
          <span>4 choices</span>
          <span>Europe</span>
        </div>
      </RouterLink>

      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.025] p-4 opacity-55">
          <div class="text-xl">🌍</div>
          <h3 class="mt-4 font-extrabold text-slate-200">Country → Flag</h3>
          <p class="mt-1 text-xs leading-5 text-slate-500">Coming next.</p>
        </div>
        <div class="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.025] p-4 opacity-55">
          <div class="text-xl">🏛️</div>
          <h3 class="mt-4 font-extrabold text-slate-200">Capitals</h3>
          <p class="mt-1 text-xs leading-5 text-slate-500">Coming next.</p>
        </div>
      </div>
    </section>
  </AppShell>
</template>
