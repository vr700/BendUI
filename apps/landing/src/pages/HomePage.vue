<template>
  <div class="isolate">
    <div class="relative z-10">
      <Header />
      <div id="hero-anchor" class="relative overflow-visible">
        <BackgroundAttractor anchor="#hero-anchor" flow="both" :particles="1500" :speed="0.01" />
        <Hero />
      </div>
      <ComponentsSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import Hero from '../components/Hero.vue'
import ComponentsSection from '../components/ComponentsSection.vue'
import BackgroundAttractor from '../components/BackgroundAttractor.vue'
</script>
