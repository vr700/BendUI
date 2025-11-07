<template>
  <div :class="cx('rounded-xl border border-neutral-800 bg-neutral-900 shadow', $attrs.class as string)" v-bind="$attrs">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { cx } from '../../utils/classes'
defineOptions({ inheritAttrs: false })
</script>
