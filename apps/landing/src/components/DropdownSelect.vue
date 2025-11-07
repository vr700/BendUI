<template>
  <div ref="root" class="relative inline-block text-left">
    <button
      type="button"
      class="iconless-btn"
      @click="open = !open"
      :aria-expanded="open"
      :aria-haspopup="true"
    >
      <span class="truncate">{{ current?.label }}</span>
      <svg viewBox="0 0 20 20" class="h-4 w-4 opacity-80">
        <path d="M5.5 7.5l4.5 5 4.5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <transition enter-active-class="transition duration-150 ease-out"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1">
      <div
        v-if="open"
        class="menu"
        role="listbox"
        :aria-activedescendant="current?.value"
      >
        <button
          v-for="opt in options"
          :key="opt.value"
          :id="opt.value"
          class="menu-item"
          :class="opt.value === modelValue ? 'menu-item-active' : ''"
          role="option"
          :aria-selected="opt.value === modelValue"
          @click="select(opt.value)"
        >
          {{ opt.label }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

type Opt = { label: string; value: string }

const props = defineProps<{
  modelValue: string
  options: Opt[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
}>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)
const current = computed(() => props.options.find(o => o.value === props.modelValue))

function onClickOutside(e: MouseEvent) {
  if (!root.value) return
  if (!root.value.contains(e.target as Node)) open.value = false
}
function select(v: string) {
  emit('update:modelValue', v)
  open.value = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped>
.iconless-btn{
  @apply flex items-center justify-between gap-6 px-4 py-2.5 rounded-lg w-36 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/20 bg-neutral-100 text-neutral-900 border border-neutral-200 hover:bg-neutral-200 dark:bg-neutral-800/80 dark:text-white dark:border-white/10 dark:hover:bg-neutral-800;
}
.menu{
  @apply absolute left-0 mt-1 w-36 rounded-lg overflow-hidden border shadow-xl z-10 bg-white text-neutral-900 border-neutral-200 dark:bg-neutral-900 dark:text-white dark:border-white/10;
}
.menu-item{
  @apply w-36 text-left px-4 py-3 text-neutral-900 hover:bg-black/[0.03] transition dark:text-white dark:hover:bg-white/5;
}
.menu-item-active{
  @apply bg-black/[0.04] text-neutral-900 dark:bg-white/5 dark:text-white;
}
</style>
