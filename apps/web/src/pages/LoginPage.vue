<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const submitted = ref(false)

function submit() {
  submitted.value = true
}
</script>

<template>
  <main class="auth-page">
    <div class="auth-glow auth-glow--top" />
    <div class="auth-glow auth-glow--bottom" />

    <section class="auth-frame auth-frame--form">
      <RouterLink to="/" class="auth-back" aria-label="Back to welcome">←</RouterLink>

      <div class="brand-mark mt-8" aria-label="Knowledge app">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div class="mt-7">
        <p class="text-sm font-extrabold uppercase tracking-[0.17em] text-blue-300">Welcome back</p>
        <h1 class="mt-2 text-4xl font-black tracking-[-0.04em] text-white">Pick up where you left off.</h1>
        <p class="mt-3 text-sm leading-6 text-stone-400">Your progress, weak spots and quiz history will all be waiting for you.</p>
      </div>

      <form class="mt-8 space-y-4" @submit.prevent="submit">
        <label class="auth-field">
          <span>Email address</span>
          <input v-model="email" type="email" autocomplete="email" placeholder="you@example.com" required />
        </label>

        <label class="auth-field">
          <span>Password</span>
          <div class="auth-password-wrap">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="Your password"
              required
            />
            <button type="button" @click="showPassword = !showPassword">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </label>

        <div class="flex items-center justify-end">
          <button type="button" class="text-sm font-bold text-stone-400 transition hover:text-white">
            Forgot password?
          </button>
        </div>

        <button class="auth-primary-button w-full" type="submit">
          <span>Log in</span>
          <span aria-hidden="true" class="text-xl">→</span>
        </button>
      </form>

      <p v-if="submitted" class="mt-4 rounded-2xl border border-blue-300/15 bg-blue-400/[0.08] p-3 text-sm text-blue-100">
        The screen is ready — real authentication gets wired in the auth milestone.
      </p>

      <p class="mt-7 text-center text-sm text-stone-500">
        New here?
        <RouterLink to="/create-account" class="font-extrabold text-white">Create an account</RouterLink>
      </p>

      <RouterLink to="/home" class="mt-8 block text-center text-xs font-semibold text-stone-700 underline decoration-stone-800 underline-offset-4">
        Development shortcut: open app
      </RouterLink>
    </section>
  </main>
</template>
