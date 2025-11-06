<template>
  <section>
    <h2 class="text-xl font-semibold text-neutral-900 dark:text-white">Installation</h2>

    <div class="mt-3 inline-flex rounded-lg bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-1">
      <button
        class="px-3 py-2 text-sm rounded-md transition"
        :class="tab==='cli' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white' : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'"
        @click="tab='cli'"
      >CLI</button>
      <button
        class="px-3 py-2 text-sm rounded-md transition"
        :class="tab==='manual' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white' : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'"
        @click="tab='manual'"
      >Manual</button>
    </div>

    <div v-if="tab==='cli'" class="mt-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="m in managers"
          :key="m"
          class="px-3 py-1.5 text-xs rounded-md border transition"
          :class="manager===m ? 'border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white' : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'"
          @click="manager=m"
        >{{ m }}</button>
      </div>

      <div class="mt-3 flex items-center justify-between rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-2">
        <code class="text-sm whitespace-pre-wrap break-all text-neutral-900 dark:text-white">{{ command }}</code>
        <button
          class="text-xs px-2 py-1 rounded-md border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-700 dark:text-neutral-300 ml-3 shrink-0"
          @click="copy(command)"
        >Copy</button>
      </div>
    </div>

    <div v-else class="mt-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4 relative">
      <button
        class="absolute right-3 top-3 text-xs px-2 py-1 rounded-md border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-700 dark:text-neutral-300"
        @click="copy(source)"
      >Copy</button>
      <pre class="overflow-auto text-sm leading-relaxed text-neutral-900 dark:text-white"><code>{{ source }}</code></pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type Manager = 'pnpm' | 'npm' | 'yarn' | 'bun'

const props = defineProps<{
  pkgName: string
  source: string
}>()

const managers: Manager[] = ['pnpm', 'npm', 'yarn', 'bun']
const tab = ref<'cli' | 'manual'>('cli')
const manager = ref<Manager>('pnpm')

const command = computed(() => {
  switch (manager.value) {
    case 'pnpm': return `pnpm add ${props.pkgName}`
    case 'npm':  return `npm i ${props.pkgName}`
    case 'yarn': return `yarn add ${props.pkgName}`
    case 'bun':  return `bun add ${props.pkgName}`
  }
})

function copy(text: string) {
  if (!text) return
  navigator.clipboard?.writeText(text)
}
</script>

<style scoped>
pre { white-space: pre-wrap; word-break: break-word; }
</style>
