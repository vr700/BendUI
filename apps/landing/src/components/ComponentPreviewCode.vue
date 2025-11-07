<template>
  <div>
    <div class="inline-flex rounded-lg bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-1">
      <button
        class="px-3 py-2 text-sm rounded-md transition"
        :class="tab==='preview' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white' : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'"
        @click="tab='preview'"
      >Preview</button>
      <button
        class="px-3 py-2 text-sm rounded-md transition"
        :class="tab==='code' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white' : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'"
        @click="tab='code'"
      >Code</button>
    </div>

    <div class="mt-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 md:p-6">
      <section v-if="tab==='preview'">
        <component :is="preview" />
      </section>

      <section v-else class="relative">
        <button
          class="absolute right-3 top-3 text-xs px-2 py-1 rounded-md border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-700 dark:text-neutral-300"
          @click="copy(usage)"
        >Copy</button>
        <pre class="overflow-auto text-sm leading-relaxed text-neutral-900 dark:text-white"><code>{{ usage }}</code></pre>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{ preview: any; usage: string }>()
const tab = ref<'preview' | 'code'>('preview')

function copy(text: string) {
  if (!text) return
  navigator.clipboard?.writeText(text)
}
</script>

<style scoped>
pre { white-space: pre-wrap; word-break: break-word; }
</style>
