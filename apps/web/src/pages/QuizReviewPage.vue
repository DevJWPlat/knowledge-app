<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppShell from '@/layouts/AppShell.vue'
import { loadQuizSession } from '@/services/quizSession'

const route = useRoute()
const session = computed(() => loadQuizSession(String(route.params.id)))
</script>

<template>
  <AppShell>
    <template v-if="session">
      <header class="mb-6">
        <RouterLink
          :to="`/quiz/results/${session.id}`"
          class="mb-5 inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-white"
        >
          <span aria-hidden="true">←</span>
          <span>Results</span>
        </RouterLink>

        <p class="text-xs font-black uppercase tracking-[0.18em] text-blue-300">Review</p>
        <h1 class="mt-2 text-3xl font-black tracking-[-0.04em] text-white">See what stuck.</h1>
        <p class="mt-2 text-sm leading-6 text-slate-400">Every answer from this quiz, including the ones worth practising again.</p>
      </header>

      <div class="space-y-3">
        <article
          v-for="answer in session.answers"
          :key="answer.questionNumber"
          class="rounded-[1.55rem] border p-4"
          :class="answer.isCorrect ? 'border-emerald-300/15 bg-emerald-400/[0.045]' : 'border-rose-300/16 bg-rose-400/[0.045]'"
        >
          <div class="flex items-center gap-4">
            <div class="review-flag-frame">
              <span :class="['fi', `fi-${answer.flagCode}`]" aria-hidden="true" />
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex items-center justify-between gap-3">
                <p class="truncate text-lg font-black text-white">{{ answer.correctCountryName }}</p>
                <span class="shrink-0 text-sm font-black" :class="answer.isCorrect ? 'text-emerald-300' : 'text-rose-300'">
                  {{ answer.isCorrect ? 'Correct' : 'Incorrect' }}
                </span>
              </div>

              <p v-if="!answer.isCorrect" class="mt-2 text-sm text-slate-400">
                Your answer: <strong class="text-rose-200">{{ answer.selectedCountryName }}</strong>
              </p>
              <p class="mt-1 text-sm text-slate-500">
                Correct answer: <strong class="text-slate-200">{{ answer.correctCountryName }}</strong>
              </p>
            </div>
          </div>
        </article>
      </div>
    </template>

    <div v-else class="pt-16 text-center">
      <h1 class="text-2xl font-black text-white">Nothing to review.</h1>
      <RouterLink to="/quiz" class="mt-6 inline-flex rounded-2xl bg-blue-200 px-5 py-3 text-sm font-black text-[#06101d]">
        Start a quiz
      </RouterLink>
    </div>
  </AppShell>
</template>
