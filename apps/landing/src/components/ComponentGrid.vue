<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
        {{ selected === 'all' ? 'All Components' : 'By Type' }}
      </h3>
      <DropdownSelect v-model="selected" :options="options" />
    </div>

    <template v-if="selected === 'all'">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <RouterLink
          v-for="c in components"
          :key="c.id"
          class="block"
          :to="`/components/${c.id}`"
        >
          <ComponentCard :component="c" />
        </RouterLink>
      </div>
    </template>

    <template v-else>
      <div v-for="(group, type) in grouped" :key="type" class="mb-12">
        <h4 class="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">{{ type }}</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <RouterLink
            v-for="c in group"
            :key="c.id"
            class="block"
            :to="`/components/${c.id}`"
          >
            <ComponentCard :component="c" />
          </RouterLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ComponentCard from './ComponentCard.vue'
import DropdownSelect from './DropdownSelect.vue'
import { components } from '../shared/components.data'

const selected = ref<'all' | 'type'>('all')
const options = [
  { label: 'All', value: 'all' },
  { label: 'Type', value: 'type' },
]

const grouped = computed(() =>
  components.reduce((acc: Record<string, typeof components>, c) => {
    ;(acc[c.type] ||= []).push(c)
    return acc
  }, {} as Record<string, typeof components>)
)
</script>
