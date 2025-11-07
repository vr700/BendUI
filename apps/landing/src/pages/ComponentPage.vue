<template>
  <div class="container py-8 md:py-12" v-if="item">
    <ComponentHeader
      :title="item.name"
      :description="item.description"
      :prev="prevItem"
      :next="nextItem"
    />

    <ComponentPreviewCode
      class="mt-6"
      :preview="item.previewComponent"
      :usage="item.usage"
    />

    <ComponentPropsTable
      class="mt-10"
      :rows="item.props || []"
    />

    <ComponentInstallation
      class="mt-10"
      pkg-name="@bend-ui/vue"
      :source="item.source ?? item.usage"
    />

    <ComponentPager
      class="mt-10"
      :prev="prevItem"
      :next="nextItem"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { components } from '../shared/components.data'

import ComponentHeader from '../components/ComponentHeader.vue'
import ComponentPreviewCode from '../components/ComponentPreviewCode.vue'
import ComponentPropsTable from '../components/ComponentPropsTable.vue'
import ComponentInstallation from '../components/ComponentInstallation.vue'
import ComponentPager from '../components/ComponentPager.vue'

const route = useRoute()
const list = components
const item = computed(() => list.find(c => c.id === route.params.id))
const index = computed(() => list.findIndex(c => c.id === route.params.id))

const prevItem = computed(() => index.value > 0 ? list[index.value - 1] : null)
const nextItem = computed(() => index.value >= 0 && index.value < list.length - 1 ? list[index.value + 1] : null)
</script>
