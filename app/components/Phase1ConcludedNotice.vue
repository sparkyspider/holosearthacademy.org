<template>
  <div
    class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-8 min-[860px]:py-10 flex flex-col gap-6 min-[860px]:gap-8"
  >
    <!-- Top: headline + CTA -->
    <div class="flex flex-col lg:flex-row items-center lg:items-center gap-6 lg:gap-10">
      <!-- Left: content -->
      <div class="flex-1 min-w-0 text-center lg:text-left">
        <span class="text-xs font-condensed font-normal uppercase tracking-[0.35em] text-neutral-400">Phase 1 has ended</span>
        <h2 class="text-3xl lg:text-4xl font-condensed font-bold uppercase tracking-wide text-trim-teal leading-tight mt-2">
          We have concluded
          <span class="text-trim-purple">Phase 1.</span>
        </h2>
        <p class="text-lg lg:text-xl font-roboto font-normal text-neutral-500 mt-3 leading-relaxed">
          Registrations are now open for
          <NuxtLink
            to="/"
            class="font-bold text-trim-purple underline underline-offset-4 decoration-trim-purple/40 hover:decoration-trim-purple transition"
          >Phase 2: Liminal Space</NuxtLink>
          &mdash; 19 June to 28 September 2026.
        </p>
      </div>

      <!-- Right: CTA -->
      <div class="shrink-0">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-trim-purple text-white text-base lg:text-lg font-condensed font-bold uppercase tracking-wider hover:bg-trim-purple/90 transition cursor-pointer"
        >
          Register for Phase 2
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12 L14 5 L14 9 L2 9 L2 15 L14 15 L14 19 Z" />
          </svg>
        </NuxtLink>
      </div>
    </div>

    <!-- Bottom: rainbow quote-bar notice -->
    <div class="flex">
      <div class="w-1.5 shrink-0 rounded-full bg-[linear-gradient(to_bottom,#DDC66E,#6EB189,#62BDB1,#7CA5DD,#A27CB8)]"></div>
      <div class="pl-6 min-[860px]:pl-8">
        <span class="text-xs font-condensed font-normal uppercase tracking-[0.35em] text-neutral-400">Available {{ availabilityWord }}</span>
        <p class="text-base lg:text-lg font-roboto font-normal text-neutral-600 leading-relaxed mt-1">
          <span class="font-bold text-trim-teal">Phase 1 recordings</span> and
          <span class="font-bold text-trim-purple">downloadable transcripts</span>
          available {{ availabilityWord }}.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { availabilityWord } = useRecordingsAvailability()
</script>
