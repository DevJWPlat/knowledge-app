<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { europeCountries, type EuropeCountry } from '@knowledge/geography'
import { buildMultipleChoiceQuiz, type MultipleChoiceQuestion } from '@knowledge/quiz-engine'
import AppShell from '@/layouts/AppShell.vue'
import {
  createQuizSessionId,
  saveQuizSession,
  type StoredQuizAnswer,
  type StoredQuizSession,
} from '@/services/quizSession'

const route = useRoute()
const router = useRouter()

const DEFAULT_QUESTION_COUNT = 10

const practiceCodes = computed(() => {
  const raw = typeof route.query.practice === 'string' ? route.query.practice : ''
  return raw
    .split(',')
    .map((code) => code.trim().toUpperCase())
    .filter(Boolean)
})

const questionPool = computed(() => {
  if (!practiceCodes.value.length) return europeCountries
  const requested = new Set(practiceCodes.value)
  const matches = europeCountries.filter((country) => requested.has(country.code))
  return matches.length ? matches : europeCountries
})

const questions = ref<MultipleChoiceQuestion<EuropeCountry>[]>(
  buildMultipleChoiceQuiz({
    questionItems: questionPool.value,
    optionItems: europeCountries,
    size: Math.min(DEFAULT_QUESTION_COUNT, questionPool.value.length),
    optionCount: 4,
    getKey: (country) => country.code,
    getLabel: (country) => country.name,
  }),
)

const currentIndex = ref(0)
const selectedKey = ref<string | null>(null)
const answers = ref<StoredQuizAnswer[]>([])
const quizStartedAt = Date.now()
const questionStartedAt = ref(Date.now())

const currentQuestion = computed(() => questions.value[currentIndex.value])
const currentCountry = computed(() => currentQuestion.value?.item)
const answered = computed(() => selectedKey.value !== null)
const isLastQuestion = computed(() => currentIndex.value === questions.value.length - 1)
const correctCount = computed(() => answers.value.filter((answer) => answer.isCorrect).length)
const progress = computed(() => ((currentIndex.value + 1) / Math.max(questions.value.length, 1)) * 100)
const practiceMode = computed(() => practiceCodes.value.length > 0)

function answerClass(optionKey: string): string {
  if (!answered.value) {
    return 'border-white/[0.08] bg-white/[0.035] text-slate-100 active:scale-[0.99]'
  }

  if (optionKey === currentQuestion.value.correctOptionKey) {
    return 'border-emerald-300/45 bg-emerald-400/[0.14] text-emerald-100 ring-1 ring-emerald-300/20'
  }

  if (optionKey === selectedKey.value) {
    return 'border-rose-300/45 bg-rose-400/[0.13] text-rose-100 ring-1 ring-rose-300/20'
  }

  return 'border-white/[0.06] bg-white/[0.02] text-slate-500 opacity-65'
}

function chooseAnswer(optionKey: string) {
  if (answered.value || !currentQuestion.value || !currentCountry.value) return

  const option = currentQuestion.value.options.find((candidate) => candidate.key === optionKey)
  if (!option) return

  selectedKey.value = optionKey

  answers.value.push({
    questionNumber: currentIndex.value + 1,
    countryCode: currentCountry.value.code,
    countryName: currentCountry.value.name,
    flagCode: currentCountry.value.flagCode,
    correctCountryCode: currentCountry.value.code,
    correctCountryName: currentCountry.value.name,
    selectedCountryCode: option.key,
    selectedCountryName: option.label,
    isCorrect: optionKey === currentQuestion.value.correctOptionKey,
    responseTimeMs: Date.now() - questionStartedAt.value,
  })
}

function nextQuestion() {
  if (!answered.value) return

  if (isLastQuestion.value) {
    finishQuiz()
    return
  }

  currentIndex.value += 1
  selectedKey.value = null
  questionStartedAt.value = Date.now()
}

function finishQuiz() {
  const completedAt = Date.now()
  const id = createQuizSessionId()
  const total = answers.value.length
  const correct = answers.value.filter((answer) => answer.isCorrect).length

  const session: StoredQuizSession = {
    id,
    mode: 'flag-country',
    category: 'geography',
    scope: 'europe',
    questionCount: total,
    correctCount: correct,
    incorrectCount: total - correct,
    accuracy: total ? Math.round((correct / total) * 100) : 0,
    durationMs: completedAt - quizStartedAt,
    startedAt: new Date(quizStartedAt).toISOString(),
    completedAt: new Date(completedAt).toISOString(),
    answers: answers.value,
  }

  saveQuizSession(session)
  router.push(`/quiz/results/${id}`)
}
</script>

<template>
  <AppShell>
    <div class="mb-5 flex items-center justify-between gap-3">
      <RouterLink
        to="/quiz"
        class="grid size-10 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-lg text-slate-300"
        aria-label="Exit quiz"
      >
        ×
      </RouterLink>

      <div class="text-center">
        <p class="text-xs font-black uppercase tracking-[0.16em] text-blue-300">
          {{ practiceMode ? 'Practice mistakes' : 'Flag → Country' }}
        </p>
        <p class="mt-1 text-sm font-bold text-slate-400">Europe</p>
      </div>

      <div class="min-w-10 text-right text-sm font-black tabular-nums text-white">
        {{ correctCount }} ✓
      </div>
    </div>

    <div class="mb-5 flex items-center gap-3">
      <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          class="h-full rounded-full bg-gradient-to-r from-blue-200 to-blue-400 transition-[width] duration-300"
          :style="{ width: `${progress}%` }"
        />
      </div>
      <span class="shrink-0 text-xs font-extrabold tabular-nums text-slate-500">
        {{ currentIndex + 1 }} / {{ questions.length }}
      </span>
    </div>

    <template v-if="currentQuestion && currentCountry">
      <section class="rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.055] to-white/[0.025] p-5 shadow-2xl shadow-black/15">
        <p class="text-center text-xs font-black uppercase tracking-[0.19em] text-slate-500">
          Which country is this?
        </p>

        <div class="mx-auto mt-5 max-w-[25rem] overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-[#0b1726] p-3 shadow-inner shadow-black/20">
          <div class="quiz-flag-frame">
            <span :class="['fi', `fi-${currentCountry.flagCode}`]" aria-hidden="true" />
          </div>
        </div>
      </section>

      <div class="mt-4 grid gap-2.5">
        <button
          v-for="(option, index) in currentQuestion.options"
          :key="option.key"
          type="button"
          class="flex min-h-[4.15rem] items-center gap-3 rounded-[1.3rem] border px-4 text-left text-[0.98rem] font-extrabold transition"
          :class="answerClass(option.key)"
          :disabled="answered"
          @click="chooseAnswer(option.key)"
        >
          <span class="grid size-8 shrink-0 place-items-center rounded-xl border border-current/15 bg-black/10 text-xs font-black opacity-70">
            {{ String.fromCharCode(65 + index) }}
          </span>
          <span class="flex-1">{{ option.label }}</span>
          <span v-if="answered && option.key === currentQuestion.correctOptionKey" aria-label="Correct answer">✓</span>
          <span v-else-if="answered && option.key === selectedKey" aria-label="Your incorrect answer">×</span>
        </button>
      </div>

      <div v-if="answered" class="mt-4 rounded-[1.35rem] border p-4" :class="selectedKey === currentQuestion.correctOptionKey ? 'border-emerald-300/20 bg-emerald-400/[0.07]' : 'border-rose-300/20 bg-rose-400/[0.06]'">
        <p class="text-sm font-black" :class="selectedKey === currentQuestion.correctOptionKey ? 'text-emerald-200' : 'text-rose-200'">
          {{ selectedKey === currentQuestion.correctOptionKey ? 'Correct.' : 'Not quite.' }}
        </p>
        <p class="mt-1 text-sm leading-6 text-slate-400">
          This is <strong class="text-white">{{ currentCountry.name }}</strong>. Its capital is
          <strong class="text-blue-200">{{ currentCountry.capital }}</strong>.
        </p>
      </div>

      <button
        type="button"
        class="mt-4 min-h-14 w-full rounded-2xl bg-gradient-to-r from-blue-200 to-blue-300 px-4 text-sm font-black text-[#06101d] shadow-lg shadow-blue-500/10 transition disabled:cursor-not-allowed disabled:opacity-25 active:scale-[0.99]"
        :disabled="!answered"
        @click="nextQuestion"
      >
        {{ isLastQuestion ? 'See results →' : 'Next question →' }}
      </button>
    </template>
  </AppShell>
</template>
