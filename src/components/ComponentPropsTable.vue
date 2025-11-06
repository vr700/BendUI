<template>
  <section>
    <h2 class="text-xl font-semibold text-neutral-900 dark:text-white">Props</h2>
    <div class="mt-4 overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <table class="w-full text-sm">
        <thead class="text-left text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
          <tr>
            <th class="px-4 py-3">Prop</th>
            <th class="px-4 py-3">Type</th>
            <th class="px-4 py-3">Default</th>
            <th class="px-4 py-3">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in rows" :key="p.name" class="border-b border-neutral-100 dark:border-neutral-900">
            <td class="px-4 py-3 font-mono text-neutral-900 dark:text-white">{{ p.name }}</td>
            <td class="px-4 py-3 text-neutral-900 dark:text-white">{{ p.type }}</td>
            <td class="px-4 py-3 text-neutral-500 dark:text-neutral-400">{{ p.default || '—' }}</td>
            <td class="px-4 py-3 text-neutral-700 dark:text-neutral-300">
              <span>{{ p.description }}</span>
              <span v-if="p.values?.length" class="ml-2 text-neutral-500">
                ({{ p.values.join(' | ') }})
              </span>
            </td>
          </tr>
          <tr v-if="!rows.length">
            <td colspan="4" class="px-4 py-4 text-neutral-500 dark:text-neutral-400">No props documented.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
type PropRow = { name: string; type: string; default?: string; description?: string; values?: string[] }
defineProps<{ rows: PropRow[] }>()
</script>
