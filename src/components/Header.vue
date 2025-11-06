<template>
  <header class="container flex items-center justify-between py-6">
    <a href="/" class="flex items-center gap-3">
      <img src="/logo.svg" alt="BendUI logo" class="h-16 w-16 themed-icon" />
      <span class="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">BendUI</span>
    </a>

    <nav class="flex items-center gap-3">
      <a
        href="https://github.com/vr700/Bend.UI"
        target="_blank"
        rel="noopener"
        class="icon-btn text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
        aria-label="Open GitHub"
        title="GitHub"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true">
          <path fill="currentColor" d="M12 2a10 10 0 0 0-3.162 19.492c.5.092.683-.217.683-.483 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.339-2.222-.253-4.556-1.111-4.556-4.944 0-1.091.39-1.984 1.03-2.683-.104-.253-.447-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.57 9.57 0 0 1 12 6.843c.851.004 1.707.115 2.505.337 1.91-1.294 2.748-1.025 2.748-1.025.547 1.378.204 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.338 4.688-4.566 4.937.36.31.68.92.68 1.855 0 1.338-.012 2.418-.012 2.747 0 .268.18.58.69.481A10 10 0 0 0 12 2z"/>
        </svg>
        <span class="sr-only">GitHub</span>
      </a>

      <button
        type="button"
        class="icon-btn text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
        aria-label="Install"
        title="Install"
        @click="show = true"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true">
          <path fill="currentColor" d="M12 3a1 1 0 0 1 1 1v8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4.007 4.007a1 1 0 0 1-1.414 0L7.279 11.707a1 1 0 0 1 1.414-1.414L11 12.586V4a1 1 0 0 1 1-1Zm-7 14a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2Zm2 0v2h10v-2H7Z"/>
        </svg>
        <span class="sr-only">Install</span>
      </button>

      <button
        type="button"
        class="icon-btn text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
        :aria-label="theme === 'dark' ? 'Switch to light' : 'Switch to dark'"
        :title="theme === 'dark' ? 'Light mode' : 'Dark mode'"
        @click="toggleTheme"
      >
        <svg v-if="theme==='dark'" viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true">
          <path fill="currentColor" d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-16a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 16a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1ZM3 11a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm14 0a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1ZM5.636 5.636a1 1 0 0 1 1.414 0l1.414 1.414A1 1 0 1 1 7.05 8.464L5.636 7.05a1 1 0 0 1 0-1.414Zm9.9 9.9a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 1 1-1.414 1.414l-1.414-1.414a1 1 0 0 1 0-1.414Zm0-9.9 1.414-1.414a1 1 0 1 1 1.414 1.414L16.95 7.05a1 1 0 1 1-1.414-1.414ZM5.636 16.95 7.05 15.536a1 1 0 1 1 1.414 1.414L7.05 18.364a1 1 0 1 1-1.414-1.414Z"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true">
          <path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>
        </svg>
        <span class="sr-only">Toggle theme</span>
      </button>
    </nav>

    <InstallModal v-if="show" @close="show = false" />
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import InstallModal from './InstallModal.vue'

const show = ref(false)
const theme = ref<'light' | 'dark'>('dark')

function applyTheme(t: 'light' | 'dark') {
  theme.value = t
  document.documentElement.classList.toggle('dark', t === 'dark')
  localStorage.setItem('theme', t)
}

function toggleTheme() {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark')
}

onMounted(() => {
  const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
  if (saved === 'light' || saved === 'dark') {
    applyTheme(saved)
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(prefersDark ? 'dark' : 'light')
  }
})
</script>

<style scoped>
.icon-btn {
  @apply inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:hover:bg-white/10 dark:focus-visible:ring-white/30;
}
</style>
