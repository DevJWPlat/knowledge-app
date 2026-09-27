<script setup lang="ts">
import heroImage from '@/assets/welcome-learning-globe.png'
</script>

<template>
  <main class="welcome-page">
    <div class="welcome-glow welcome-glow--top" />
    <div class="welcome-glow welcome-glow--middle" />

    <section class="welcome-frame">
      <header class="welcome-header">
        <div class="brand-mark" aria-label="Knowledge app">
          <span />
          <span />
          <span />
          <span />
        </div>

        <RouterLink to="/login" class="welcome-login-button">Log in</RouterLink>
      </header>

      <div class="welcome-body">
        <div class="welcome-copy">
          <h1 class="welcome-title">
            Learn<br />
            anything.<br />
            <span>Remember it.</span>
          </h1>

          <p class="welcome-description">
            Start with countries, flags and capitals. Build real recall, beat your weak spots, then keep expanding.
          </p>
        </div>

        <div class="welcome-art" aria-hidden="true">
          <img :src="heroImage" alt="" />
        </div>
      </div>

      <div class="welcome-actions">
        <RouterLink to="/create-account" class="welcome-primary-button">
          <span>Create your account</span>
          <span aria-hidden="true" class="welcome-arrow">→</span>
        </RouterLink>

        <RouterLink to="/login" class="welcome-secondary-button">
          I already have an account
        </RouterLink>
      </div>

      <div class="welcome-topics" aria-label="Current and future learning topics">
        <span>Flags</span>
        <i />
        <span>Capitals</span>
        <i />
        <span>Countries</span>
        <i />
        <span>More later</span>
      </div>
    </section>
  </main>
</template>
