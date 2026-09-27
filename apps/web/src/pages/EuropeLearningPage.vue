<script setup lang="ts">
import { computed, ref } from 'vue'
import { europeCountries, EUROPE_COUNTRY_COUNT, type EuropeCountry } from '@knowledge/geography'
import { buildShuffledDeck } from '@knowledge/quiz-engine'
import AppShell from '@/layouts/AppShell.vue'

const SET_SIZE = 10
const RECENT_STORAGE_KEY = 'knowledge:geography:europe:recent'

const deck = ref<EuropeCountry[]>([])
const currentIndex = ref(0)

const currentCountry = computed(() => deck.value[currentIndex.value])
const progress = computed(() => ((currentIndex.value + 1) / Math.max(deck.value.length, 1)) * 100)
const isFirst = computed(() => currentIndex.value === 0)
const isLast = computed(() => currentIndex.value === deck.value.length - 1)

function getRecentCodes(): string[] {
  try {
    const value = sessionStorage.getItem(RECENT_STORAGE_KEY)
    if (!value) return []
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []
  } catch {
    return []
  }
}

function rememberCountry(code: string) {
  try {
    const recent = getRecentCodes().filter((item) => item !== code)
    recent.push(code)
    sessionStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recent.slice(-8)))
  } catch {
    // Learning still works if browser storage is unavailable.
  }
}

function buildSet() {
  const nextDeck = buildShuffledDeck({
    items: europeCountries,
    size: SET_SIZE,
    getKey: (country) => country.code,
    recentKeys: getRecentCodes(),
  })

  deck.value = nextDeck
  currentIndex.value = 0
  if (nextDeck[0]) rememberCountry(nextDeck[0].code)
}

function nextCountry() {
  if (!isLast.value) {
    currentIndex.value += 1
    const country = deck.value[currentIndex.value]
    if (country) rememberCountry(country.code)
  }
}

function previousCountry() {
  if (!isFirst.value) currentIndex.value -= 1
}

buildSet()
</script>

<template>
  <AppShell>
    <div class="mb-5 flex items-center justify-between gap-3">
      <RouterLink
        to="/learn/geography"
        class="grid size-10 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-lg text-slate-300"
        aria-label="Back to geography"
      >
        ←
      </RouterLink>

      <div class="text-center">
        <p class="text-xs font-black uppercase tracking-[0.16em] text-blue-300">Europe</p>
        <p class="mt-1 text-sm font-bold text-slate-400">Learning set</p>
      </div>

      <button
        type="button"
        class="grid size-10 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-lg text-slate-300"
        aria-label="Create a new shuffled set"
        title="New shuffled set"
        @click="buildSet"
      >
        ↻
      </button>
    </div>

    <div class="mb-4 flex items-center gap-3">
      <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          class="h-full rounded-full bg-gradient-to-r from-blue-200 to-blue-400 transition-[width] duration-300"
          :style="{ width: `${progress}%` }"
        />
      </div>
      <span class="shrink-0 text-xs font-extrabold tabular-nums text-slate-500">
        {{ currentIndex + 1 }} / {{ deck.length }}
      </span>
    </div>

    <article
      v-if="currentCountry"
      :key="currentCountry.code"
      class="overflow-hidden rounded-[2rem] border border-white/[0.09] bg-gradient-to-b from-white/[0.065] to-white/[0.025] shadow-2xl shadow-black/20"
    >
      <div class="p-4 pb-0">
        <div class="learning-flag-frame">
          <span :class="['fi', `fi-${currentCountry.flagCode}`]" aria-hidden="true" />
        </div>
      </div>

      <div class="px-5 pb-5 pt-6 text-center">
        <p class="text-xs font-black uppercase tracking-[0.2em] text-blue-300">Country</p>
        <h1 class="mt-2 text-4xl font-black tracking-[-0.045em] text-white">
          {{ currentCountry.name }}
        </h1>
        <p v-if="currentCountry.aliases?.length" class="mt-1 text-xs font-semibold text-slate-600">
          Also: {{ currentCountry.aliases.join(', ') }}
        </p>

        <div class="mt-6 rounded-[1.45rem] border border-blue-300/15 bg-blue-300/[0.07] px-4 py-4">
          <p class="text-xs font-black uppercase tracking-[0.17em] text-slate-500">Capital</p>
          <p class="mt-1 text-2xl font-black tracking-[-0.025em] text-blue-100">
            {{ currentCountry.capital }}
          </p>
        </div>

        <div class="mt-3 grid grid-cols-2 gap-2 text-left">
          <div class="rounded-2xl border border-white/[0.06] bg-black/10 p-3.5">
            <p class="text-[0.68rem] font-black uppercase tracking-[0.14em] text-slate-600">Region</p>
            <p class="mt-1.5 text-sm font-bold leading-5 text-slate-300">{{ currentCountry.region }}</p>
          </div>
          <div class="rounded-2xl border border-white/[0.06] bg-black/10 p-3.5">
            <p class="text-[0.68rem] font-black uppercase tracking-[0.14em] text-slate-600">Set</p>
            <p class="mt-1.5 text-sm font-bold leading-5 text-slate-300">10 of {{ EUROPE_COUNTRY_COUNT }}</p>
          </div>
        </div>

        <p v-if="currentCountry.note" class="mt-3 text-left text-xs leading-5 text-slate-600">
          {{ currentCountry.note }}
        </p>
      </div>
    </article>

    <div class="mt-4 grid grid-cols-[1fr_1.65fr] gap-2">
      <button
        type="button"
        class="min-h-14 rounded-2xl border border-white/[0.09] bg-white/[0.035] px-4 text-sm font-extrabold text-slate-300 transition disabled:cursor-not-allowed disabled:opacity-30"
        :disabled="isFirst"
        @click="previousCountry"
      >
        ← Previous
      </button>

      <button
        v-if="!isLast"
        type="button"
        class="min-h-14 rounded-2xl bg-gradient-to-r from-blue-200 to-blue-300 px-4 text-sm font-black text-[#06101d] shadow-lg shadow-blue-500/10 transition active:scale-[0.99]"
        @click="nextCountry"
      >
        Next country →
      </button>

      <button
        v-else
        type="button"
        class="min-h-14 rounded-2xl bg-gradient-to-r from-blue-200 to-blue-300 px-4 text-sm font-black text-[#06101d] shadow-lg shadow-blue-500/10 transition active:scale-[0.99]"
        @click="buildSet"
      >
        New shuffled set ↻
      </button>
    </div>

    <p class="mt-4 text-center text-[0.72rem] font-semibold leading-5 text-slate-600">
      Each set is built without replacement, so the same country cannot appear twice in these 10 cards.
    </p>
  </AppShell>
</template>
