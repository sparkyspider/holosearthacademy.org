<template>
  <div
    class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-8 min-[860px]:py-10 flex flex-col gap-6 min-[860px]:gap-8"
  >
    <!-- Top: headline + CTA -->
    <div class="flex flex-col lg:flex-row items-center lg:items-center gap-6 lg:gap-10">
      <!-- Left: content -->
      <div class="flex-1 min-w-0 text-center lg:text-left">
        <span class="text-xs font-condensed font-normal uppercase tracking-[0.35em] text-neutral-400">Phase One · Complete</span>
        <h2 class="text-3xl lg:text-4xl font-condensed font-bold uppercase tracking-wide text-trim-teal leading-tight mt-2">
          Rediscovering holism &mdash;
          <span class="text-trim-purple">now on demand.</span>
        </h2>
        <p class="text-lg lg:text-xl font-roboto font-normal text-neutral-500 mt-3 leading-relaxed">
          Eight sessions exploring the origins and meaning of holism &mdash; every
          recording is <span class="font-bold text-trim-teal">available {{ availabilityWord }} to watch</span>,
          each with a <span class="font-bold text-trim-purple">downloadable transcript</span>.
          Browse the recordings below.
        </p>

        <!-- Secondary action: scroll to the talks -->
        <a
          href="#programme"
          class="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-lg text-sm font-condensed font-bold uppercase tracking-wider bg-trim-teal/10 text-trim-teal transition hover:opacity-80 cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v14m0 0l-6-6m6 6l6-6" />
          </svg>
          Browse the recordings
        </a>
      </div>

      <!-- Right: forward path -->
      <div class="shrink-0">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-trim-purple text-white text-base lg:text-lg font-condensed font-bold uppercase tracking-wider hover:bg-trim-purple/90 transition cursor-pointer"
        >
          Register for Phase Two
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12 L14 5 L14 9 L2 9 L2 15 L14 15 L14 19 Z" />
          </svg>
        </NuxtLink>
      </div>
    </div>

    <!-- Bottom: rainbow quote-bar — what comes next -->
    <div class="flex">
      <div class="w-1.5 shrink-0 rounded-full bg-[linear-gradient(to_bottom,#DDC66E,#6EB189,#62BDB1,#7CA5DD,#A27CB8)]"></div>
      <div class="pl-6 min-[860px]:pl-8">
        <span class="text-xs font-condensed font-normal uppercase tracking-[0.35em] text-neutral-400">What's next</span>
        <p class="text-base lg:text-lg font-roboto font-normal text-neutral-600 leading-relaxed mt-1">
          The festival continues with
          <NuxtLink
            to="/"
            class="font-bold text-trim-purple underline underline-offset-4 decoration-trim-purple/40 hover:decoration-trim-purple transition"
          >Phase Two: Liminal Space</NuxtLink>
          &mdash; seven new dialogues, 10 June to 14 October 2026. Registration is open now.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { availabilityWord } = useRecordingsAvailability()
</script>
