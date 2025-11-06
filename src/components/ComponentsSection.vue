<template>
  <section class="py-20 container">
    <div class="text-center mb-14">
      <h2 class="text-6xl font-extrabold tracking-tight mb-4 text-neutral-900 dark:text-white">Components</h2>
      <p class="text-neutral-600 dark:text-neutral-400 text-2xl leading-relaxed mx-auto max-w-2xl">
        Discover Bend.UI components, built to shape balanced, <br />
        and effortless user interfaces.
      </p>
    </div>

    <div class="my-16 border-t border-neutral-200 dark:border-neutral-800 w-full"></div>

    <ComponentGrid />
  </section>
</template>

<script setup lang="ts">
import ComponentGrid from './ComponentGrid.vue'
</script>
