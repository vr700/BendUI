<template>
  <div class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 hover:border-neutral-400 dark:hover:border-neutral-600 transition">
    <div class="aspect-square rounded-lg bg-neutral-100 dark:bg-neutral-950 mb-4 grid place-items-center overflow-hidden">
      <component :is="component.previewComponent" />
    </div>
    <h5 class="font-semibold text-sm text-neutral-900 dark:text-white">{{ component.name }}</h5>
    <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ component.description }}</p>
  </div>
</template>

<script setup lang="ts">
import type { CatalogItem } from '../shared/components.data'
defineProps<{ component: Pick<CatalogItem, 'id' | 'name' | 'description' | 'previewComponent'> }>()
</script>
