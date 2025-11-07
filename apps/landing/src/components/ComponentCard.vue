<template>
  <div
    class="group relative rounded-2xl border border-white/30 
           bg-[#000000]/10 dark:bg-neutral-900/60
           transition-colors overflow-hidden"
  >
    <div class="p-5 sm:p-6">
      <div ref="viewport" class="relative h-64 w-full overflow-hidden bg-transparent">
        <div
          ref="content"
          class="absolute left-1/2 top-1/2 origin-center"
          :style="{ transform: `translate(-50%,-50%) scale(${scale})` }"
        >
          <component :is="component.previewComponent" />
        </div>
      </div>
    </div>

    <!-- Banda inferior -->
    <div class="bg-[#ffffff] dark:bg-black/70 px-6 py-6">
      <h5 class="text-black dark:text-white text-2xl font-semibold leading-tight">
        {{ component.name }}
      </h5>
      <p class="mt-2 text-black/50 dark:text-neutral-400 text-lg leading-relaxed line-clamp-3">
        {{ component.description }}
      </p>
    </div>

    <div
      class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10 group-hover:ring-black/50 dark:group-hover:ring-white/80 transition"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { CatalogItem } from '../shared/components.data'

defineProps<{ component: Pick<CatalogItem, 'id' | 'name' | 'description' | 'previewComponent'> }>()

const viewport = ref<HTMLDivElement | null>(null)
const content  = ref<HTMLDivElement | null>(null)
const scale = ref(1)

const PAD = 16
let ro: ResizeObserver | null = null

function fit() {
  const vp = viewport.value
  const el = content.value
  if (!vp || !el) return

  el.style.transform = 'translate(-50%,-50%) scale(1)'
  const w = el.offsetWidth || 1
  const h = el.offsetHeight || 1
  const maxW = Math.max(1, vp.clientWidth - PAD * 2)
  const maxH = Math.max(1, vp.clientHeight - PAD * 2)
  const s = Math.min(maxW / w, maxH / h, 1)
  const val = Number.isFinite(s) ? s : 1
  scale.value = val
  el.style.transform = `translate(-50%,-50%) scale(${val})`
}

onMounted(async () => {
  await nextTick()
  fit()
  ro = new ResizeObserver(fit)
  ro.observe(viewport.value!)
  ro.observe(content.value!)
  window.addEventListener('resize', fit)
})

onBeforeUnmount(() => {
  ro?.disconnect()
  window.removeEventListener('resize', fit)
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
