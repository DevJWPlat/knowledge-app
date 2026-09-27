<script setup lang="ts">
import { EUROPE_COUNTRY_COUNT } from '@knowledge/geography'
import AppShell from '@/layouts/AppShell.vue'
import PageHeader from '@/components/PageHeader.vue'
</script>

<template>
  <AppShell>
    <PageHeader
      eyebrow="Learn"
      title="What do you want to learn?"
      description="Start with geography. More subjects can plug into the same learning system later."
    />

    <section class="space-y-3">
      <RouterLink
        to="/learn/geography"
        class="group block overflow-hidden rounded-[1.75rem] border border-blue-300/20 bg-gradient-to-br from-blue-400/[0.16] via-white/[0.045] to-indigo-400/[0.06] p-5 transition active:scale-[0.99]"
      >
        <div class="flex items-start justify-between gap-5">
          <div>
            <div class="mb-5 grid size-12 place-items-center rounded-2xl border border-blue-200/15 bg-blue-300/[0.10] text-2xl">
              🌍
            </div>
            <p class="text-xs font-black uppercase tracking-[0.18em] text-blue-300">Available now</p>
            <h2 class="mt-2 text-2xl font-black tracking-[-0.035em] text-white">Geography</h2>
            <p class="mt-2 max-w-sm text-sm leading-6 text-slate-400">
              Countries, flags and capitals. Europe is the first complete learning set.
            </p>
          </div>

          <span class="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-200 text-xl font-black text-[#07111f] transition group-hover:translate-x-0.5">
            →
          </span>
        </div>

        <div class="mt-6 flex items-center gap-2 border-t border-white/[0.07] pt-4 text-xs font-bold text-slate-400">
          <span>{{ EUROPE_COUNTRY_COUNT }} Europe countries</span>
          <span class="text-blue-300/70">•</span>
          <span>Randomised sets</span>
        </div>
      </RouterLink>

      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.025] p-4 opacity-55">
          <div class="text-xl">⌛</div>
          <h3 class="mt-4 font-extrabold text-slate-200">History</h3>
          <p class="mt-1 text-xs leading-5 text-slate-500">Ready for a future category.</p>
        </div>
        <div class="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.025] p-4 opacity-55">
          <div class="text-xl">⚛</div>
          <h3 class="mt-4 font-extrabold text-slate-200">Science</h3>
          <p class="mt-1 text-xs leading-5 text-slate-500">Ready for a future category.</p>
        </div>
      </div>
    </section>
  </AppShell>
</template>
