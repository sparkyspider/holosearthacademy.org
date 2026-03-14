<template>
  <div class="min-h-screen bg-bg-default">
    <HeroBanner />
      <ColorBar />
    <SpeakerTicker />
    <ColorBar />
      

    <!-- Page body with vertical colour bar -->
    <div class="flex">
        <!--
      <VerticalColorBar />
      -->
      <div class="flex-1 py-16 px-8 flex items-start justify-center">
<div class="bg-white rounded-lg shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-12 py-14 flex items-center gap-10">
<img src="/holos-logo.svg" alt="Holos Earth" class="w-52 shrink-0" />
          <p class="text-4xl font-condensed font-normal uppercase leading-snug text-neutral-500 tracking-wide">
            A free online global dialogue on the meaning and application of holism in an
            age of fragmentation and transformation.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
