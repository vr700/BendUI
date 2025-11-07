<template>
  <button
    :class="cx(
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition',
      'disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none',
      variant === 'outline'
        ? 'border bg-transparent px-4 py-2'
        : 'bg-white text-black dark:bg-black dark:text-white px-4 py-2',
      $attrs.class as string
    )"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { cx } from '../../utils/classes'
defineOptions({ inheritAttrs: false })
withDefaults(defineProps<{ variant?: 'default' | 'outline' }>(), { variant: 'default' })
</script>

