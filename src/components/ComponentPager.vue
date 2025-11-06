<template>
  <div class="flex items-center justify-between">
    <RouterLink
      v-if="prev"
      :to="`/components/${prev.id}`"
      class="inline-flex items-center gap-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-300 dark:hover:border-neutral-700 px-3 py-2 text-neutral-700 dark:text-white"
    >
      ← {{ prev.name }}
    </RouterLink>
    <span v-else />
    <RouterLink
      v-if="next"
      :to="`/components/${next.id}`"
      class="inline-flex items-center gap-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-300 dark:hover:border-neutral-700 px-3 py-2 text-neutral-700 dark:text-white"
    >
      {{ next.name }} →
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
type NavItem = { id: string; name: string }
defineProps<{ prev?: NavItem | null; next?: NavItem | null }>()
</script>
