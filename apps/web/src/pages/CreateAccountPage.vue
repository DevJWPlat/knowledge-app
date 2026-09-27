<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
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
        <p class="text-sm font-extrabold uppercase tracking-[0.17em] text-blue-300">Start fresh</p>
        <h1 class="mt-2 text-4xl font-black tracking-[-0.04em] text-white">Make forgetting the hard part.</h1>
        <p class="mt-3 text-sm leading-6 text-stone-400">Create your account now. Geography is first; the platform is built to grow far beyond it.</p>
      </div>

      <form class="mt-8 space-y-4" @submit.prevent="submit">
        <label class="auth-field">
          <span>Name</span>
          <input v-model="name" type="text" autocomplete="name" placeholder="Your name" required />
        </label>

        <label class="auth-field">
          <span>Email address</span>
          <input v-model="email" type="email" autocomplete="email" placeholder="you@example.com" required />
        </label>

        <label class="auth-field">
          <span>Password</span>
          <input v-model="password" type="password" autocomplete="new-password" placeholder="8+ characters" minlength="8" required />
        </label>

        <button class="auth-primary-button w-full" type="submit">
          <span>Create account</span>
          <span aria-hidden="true" class="text-xl">→</span>
        </button>
      </form>

      <p v-if="submitted" class="mt-4 rounded-2xl border border-blue-300/15 bg-blue-400/[0.08] p-3 text-sm text-blue-100">
        The screen is ready — account creation gets connected to the Worker in the auth milestone.
      </p>

      <p class="mt-7 text-center text-sm text-stone-500">
        Already have an account?
        <RouterLink to="/login" class="font-extrabold text-white">Log in</RouterLink>
      </p>

      <RouterLink to="/home" class="mt-8 block text-center text-xs font-semibold text-stone-700 underline decoration-stone-800 underline-offset-4">
        Development shortcut: open app
      </RouterLink>
    </section>
  </main>
</template>
