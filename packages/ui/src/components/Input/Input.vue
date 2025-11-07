<template>
  <input
    v-bind="$attrs"
    :class="cx(
      'h-10 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 text-sm outline-none',
      'placeholder:text-neutral-500 focus:border-neutral-600',
      $attrs.class as string
    )"
  />
</template>
<script setup lang="ts">
import { cx } from '../../utils/classes'
defineOptions({ inheritAttrs: false })
</script>
