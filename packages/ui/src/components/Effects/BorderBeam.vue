<template>
  <span
    class="pointer-events-none absolute -inset-[1px] rounded-[inherit] [mask:linear-gradient(#000,transparent)]"
    :style="style"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(defineProps<{ duration?: number; size?: number }>(), {
  duration: 8, size: 120
})
const style = computed(() => ({
  background:
    `conic-gradient(from 0deg, rgba(255,255,255,.6), transparent 25%, transparent 75%, rgba(255,255,255,.6))`,
  animation: `bu-rotate ${props.duration}s linear infinite`,
  WebkitMask: `radial-gradient(${props.size}px circle at var(--x, 100%) var(--y, 0%), #000 60%, transparent 61%)`,
}))
</script>

<style>
@keyframes bu-rotate { to { transform: rotate(1turn); } }
</style>
