<template>
  <div>
    <RouterLink
      to="/"
      class="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
    >
      <span>←</span> Back
    </RouterLink>

    <div class="mt-6 flex items-start justify-between gap-4">
      <div>
        <h1 class="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white">{{ title }}</h1>
        <p v-if="description" class="mt-2 text-neutral-600 dark:text-neutral-400 max-w-2xl">{{ description }}</p>
      </div>

      <div class="hidden sm:flex items-center gap-2">
        <RouterLink
          v-if="prev"
          :to="`/components/${prev.id}`"
          class="h-8 w-8 rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 flex items-center justify-center text-neutral-700 dark:text-white"
          :title="`Previous: ${prev.name}`"
        >←</RouterLink>

        <RouterLink
          v-if="next"
          :to="`/components/${next.id}`"
          class="h-8 w-8 rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 flex items-center justify-center text-neutral-700 dark:text-white"
          :title="`Next: ${next.name}`"
        >→</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type NavItem = { id: string; name: string }
defineProps<{
  title: string
  description?: string
  prev?: NavItem | null
  next?: NavItem | null
}>()
</script>
