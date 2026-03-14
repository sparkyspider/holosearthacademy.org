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
<div class="shrink-0 flex flex-col items-center">
            <img src="/holos-logo.svg" alt="Holos Earth" class="w-52" />
            <span class="text-xs font-condensed font-normal uppercase tracking-[0.45em] text-neutral-400 mt-2">presents</span>
          </div>
          <p class="text-4xl font-condensed font-normal uppercase leading-snug text-neutral-500 tracking-wide">
            A free online global <span class="font-bold text-trim-blue">dialogue</span> on the meaning and application of <span class="font-bold text-trim-teal">holism</span> in an
            age of <span class="font-bold text-trim-purple">fragmentation</span> and <span class="font-bold text-trim-green">transformation</span>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
