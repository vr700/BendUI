<template>
  <div
    class="fixed inset-0 bg-black/70 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-white dark:bg-neutral-900 rounded-2xl w-[90%] max-w-md p-6 relative shadow-xl border border-neutral-200 dark:border-white/10">
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
        aria-label="Close"
      >
        ✕
      </button>

      <h2 class="text-lg font-semibold mb-5 text-neutral-900 dark:text-white">Install Bend.UI</h2>

      <div class="bg-neutral-50 dark:bg-black/30 rounded-xl overflow-hidden">
        <div class="flex items-center justify-around text-sm text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
          <button
            v-for="pkg in managers"
            :key="pkg"
            @click="selected = pkg"
            :class="[
              'py-3 flex-1 text-center transition',
              selected === pkg ? 'text-neutral-900 dark:text-white bg-black/[0.03] dark:bg-white/5' : 'hover:text-neutral-900 dark:hover:text-white'
            ]"
          >
            {{ pkg }}
          </button>
        </div>

        <div class="flex items-center justify-between px-4 py-3 font-mono text-sm text-neutral-900 dark:text-white">
          <span class="select-all">{{ commands[selected] }}</span>
          <button
            @click="copy(commands[selected])"
            class="ml-2 opacity-70 hover:opacity-100 transition"
            title="Copy"
            aria-label="Copy command"
          >
            📋
          </button>
        </div>
      </div>

      <transition name="fade">
        <p v-if="copied" class="absolute bottom-4 right-6 text-xs text-green-600 dark:text-green-400">
          Copied!
        </p>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineEmits<{ (e: 'close'): void }>()
const managers = ['pnpm', 'npm', 'yarn', 'bun'] as const
type Manager = typeof managers[number]
const selected = ref<Manager>('pnpm')
const copied = ref(false)
const commands: Record<Manager, string> = {
  pnpm: 'pnpm add @bend-ui/vue',
  npm: 'npm i @bend-ui/vue',
  yarn: 'yarn add @bend-ui/vue',
  bun: 'bun add @bend-ui/vue',
}
const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {}
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
