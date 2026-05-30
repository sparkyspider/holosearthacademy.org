<template>
  <div class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-6 min-[860px]:py-8 flex flex-col lg:flex-row items-center lg:items-center gap-6 lg:gap-10">
    <!-- Left: retrospective + recordings note -->
    <div class="flex-1 min-w-0 text-center lg:text-left">
      <span class="text-xs font-condensed font-normal uppercase tracking-[0.35em] text-neutral-400">Previously</span>
      <p class="text-base lg:text-lg font-roboto font-light text-neutral-500 leading-relaxed mt-2">
        In
        <NuxtLink
          to="/phase-1"
          class="font-bold text-trim-teal underline underline-offset-4 decoration-trim-teal/40 hover:decoration-trim-teal transition"
        >Phase One</NuxtLink>
        we explored the unfolding of holism through cosmology, spirituality, ecology,
        consciousness, ethics, and human unity.
        <span class="font-bold text-trim-teal">Recordings</span> and
        <span class="font-bold text-trim-purple">downloadable transcripts</span>
        are available {{ availabilityWord }}.
      </p>
    </div>

    <!-- Right: back to Phase One recordings -->
    <div class="shrink-0">
      <NuxtLink
        to="/phase-1"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-trim-teal text-white text-base lg:text-lg font-condensed font-bold uppercase tracking-wider hover:bg-trim-teal/90 transition cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2 12 L10 5 L10 9 L22 9 L22 15 L10 15 L10 19 Z" />
        </svg>
        Phase One Recordings
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { availabilityWord } = useRecordingsAvailability()
</script>
