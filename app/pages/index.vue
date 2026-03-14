<template>
  <div class="min-h-screen bg-bg-default">
    <!-- Hero image extends behind both banner and ticker -->
    <div class="relative">
      <img src="/space-option-1.png" alt="" class="absolute inset-0 w-full h-full object-cover object-center" />
      <div class="relative z-10">
        <HeroBanner />
        <div class="h-2 w-full bg-white/50"></div>
        <SpeakerTicker />
          <color-bar/>
      </div>
    </div>
      

    <!-- Page body with vertical colour bar -->
    <div class="flex">
        <!--
      <VerticalColorBar />
      -->
      <div class="flex-1 py-16 px-8 flex flex-col items-center gap-10">
        <IntroCard />
        <RegistrationCta />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
