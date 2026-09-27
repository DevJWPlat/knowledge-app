<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppShell from '@/layouts/AppShell.vue'
import { loadQuizSession } from '@/services/quizSession'

const route = useRoute()
const session = computed(() => loadQuizSession(String(route.params.id)))

const duration = computed(() => {
  const totalSeconds = Math.round((session.value?.durationMs ?? 0) / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
})

const mistakeCodes = computed(() =>
  session.value?.answers.filter((answer) => !answer.isCorrect).map((answer) => answer.countryCode) ?? [],
)

const practiceLink = computed(() =>
  `/quiz/play?mode=flag-country&scope=europe&practice=${encodeURIComponent(mistakeCodes.value.join(','))}`,
)
</script>

<template>
  <AppShell>
    <template v-if="session">
      <header class="pt-5 text-center">
        <div class="mx-auto grid size-16 place-items-center rounded-[1.4rem] border border-blue-200/15 bg-blue-300/[0.09] text-3xl">
          {{ session.accuracy === 100 ? '★' : '✓' }}
        </div>
        <p class="mt-5 text-xs font-black uppercase tracking-[0.19em] text-blue-300">Quiz complete</p>
        <h1 class="mt-2 text-5xl font-black tracking-[-0.055em] text-white">
          {{ session.correctCount }} / {{ session.questionCount }}
        </h1>
        <p class="mt-2 text-lg font-bold text-slate-400">{{ session.accuracy }}% accuracy</p>
      </header>

      <div class="mt-7 grid grid-cols-3 gap-2">
        <div class="rounded-[1.3rem] border border-white/[0.07] bg-white/[0.03] p-4 text-center">
          <p class="text-xl font-black text-white">{{ session.correctCount }}</p>
          <p class="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-slate-600">Correct</p>
        </div>
        <div class="rounded-[1.3rem] border border-white/[0.07] bg-white/[0.03] p-4 text-center">
          <p class="text-xl font-black text-white">{{ session.incorrectCount }}</p>
          <p class="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-slate-600">Missed</p>
        </div>
        <div class="rounded-[1.3rem] border border-white/[0.07] bg-white/[0.03] p-4 text-center">
          <p class="text-xl font-black text-white">{{ duration }}</p>
          <p class="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-slate-600">Time</p>
        </div>
      </div>

      <div class="mt-6 grid gap-2.5">
        <RouterLink
          :to="`/quiz/results/${session.id}/review`"
          class="flex min-h-14 items-center justify-between rounded-2xl bg-gradient-to-r from-blue-200 to-blue-300 px-5 text-sm font-black text-[#06101d]"
        >
          <span>Review answers</span>
          <span>→</span>
        </RouterLink>

        <RouterLink
          v-if="mistakeCodes.length"
          :to="practiceLink"
          class="flex min-h-14 items-center justify-between rounded-2xl border border-rose-300/20 bg-rose-400/[0.07] px-5 text-sm font-black text-rose-100"
        >
          <span>Practice {{ mistakeCodes.length }} {{ mistakeCodes.length === 1 ? 'mistake' : 'mistakes' }}</span>
          <span>↻</span>
        </RouterLink>

        <RouterLink
          to="/quiz/play?mode=flag-country&scope=europe"
          class="flex min-h-14 items-center justify-between rounded-2xl border border-white/[0.09] bg-white/[0.035] px-5 text-sm font-extrabold text-slate-200"
        >
          <span>Play again</span>
          <span>↻</span>
        </RouterLink>
      </div>

      <RouterLink to="/quiz" class="mt-6 block text-center text-sm font-bold text-slate-500">
        Back to quizzes
      </RouterLink>
    </template>

    <div v-else class="pt-16 text-center">
      <h1 class="text-2xl font-black text-white">That quiz result is no longer available.</h1>
      <p class="mt-2 text-sm leading-6 text-slate-400">Results are local-only for now. D1 persistence comes in the next milestone.</p>
      <RouterLink to="/quiz" class="mt-6 inline-flex rounded-2xl bg-blue-200 px-5 py-3 text-sm font-black text-[#06101d]">
        Start a quiz
      </RouterLink>
    </div>
  </AppShell>
</template>
