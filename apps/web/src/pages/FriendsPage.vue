<script setup lang="ts">
import AppShell from '@/layouts/AppShell.vue'
import PageHeader from '@/components/PageHeader.vue'
</script>

<template>
  <AppShell>
    <PageHeader
      eyebrow="Friends"
      title="Learn together"
      description="Social features are reserved for a later phase so they do not complicate the core learning system."
    />

    <div class="rounded-[1.5rem] border border-dashed border-white/12 bg-white/[0.035] p-6 text-sm leading-6 text-slate-400">
      Friend requests, challenges and live rooms are intentionally not scaffolded yet.
    </div>
  </AppShell>
</template>
