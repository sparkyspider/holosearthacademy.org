<template>
  <div
    class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-8 min-[860px]:py-10 flex flex-col lg:flex-row items-center lg:items-center gap-6 lg:gap-10"
  >
    <!-- Left: greeting + body -->
    <div class="flex-1 min-w-0 text-center lg:text-left">
      <h2 class="text-3xl lg:text-4xl font-condensed font-bold uppercase tracking-wide text-trim-teal leading-tight">
        <template v-if="isKnown">
          Welcome back,
          <span class="text-trim-purple">{{ firstName }}.</span>
        </template>
        <template v-else-if="isPhase2Page">
          Phase 2: <span class="text-trim-purple">Liminal Space</span>
        </template>
        <template v-else>
          Phase 1: <span class="text-trim-purple">Rediscovering Holism</span>
        </template>
      </h2>
      <!-- Body text — adapts to which page we're on and whether the visitor
           is registered for the page's phase. -->
      <p
        v-if="isPhase2Page && hasRegisteredForCurrent"
        class="text-lg lg:text-xl font-roboto font-normal text-neutral-500 mt-2 leading-relaxed"
      >
        You're already registered for
        <span class="font-bold text-trim-purple">Phase 2</span>.
        Please <a href="#programme" class="font-bold text-trim-teal underline underline-offset-4 hover:text-trim-teal/70 transition cursor-pointer">select your sessions</a>.
      </p>
      <p
        v-else-if="isPhase2Page"
        class="text-lg lg:text-xl font-roboto font-normal text-neutral-500 mt-2 leading-relaxed"
      >
        Please <a href="#register" class="font-bold text-trim-purple underline underline-offset-4 hover:text-trim-purple/70 transition cursor-pointer">register</a>
        for <span class="font-bold text-trim-purple">Phase 2</span>,
        then <a href="#programme" class="font-bold text-trim-teal underline underline-offset-4 hover:text-trim-teal/70 transition cursor-pointer">select your sessions</a>.
      </p>
      <p
        v-else
        class="text-lg lg:text-xl font-roboto font-normal text-neutral-500 mt-2 leading-relaxed"
      >
        Registrations are now open for
        <span class="font-bold text-trim-purple">Phase 2: Liminal Space</span>
        (19 June – 28 Sept 2026).
      </p>
      <button
        v-if="isKnown"
        type="button"
        @click="clearAttendee"
        class="mt-3 text-sm font-condensed font-bold uppercase tracking-wider text-neutral-400 hover:text-trim-purple underline underline-offset-4 transition cursor-pointer"
      >
        Not you?
      </button>
    </div>

    <!-- Right: CTA — context-aware by route -->
    <div class="shrink-0">
      <NuxtLink
        v-if="!isPhase2Page"
        to="/phase-2"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-trim-purple text-white text-base lg:text-lg font-condensed font-bold uppercase tracking-wider hover:bg-trim-purple/90 transition cursor-pointer"
      >
        Go to Phase 2
        <!-- Right-pointing arrow: apex on right -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12 L14 5 L14 9 L2 9 L2 15 L14 15 L14 19 Z" />
        </svg>
      </NuxtLink>
      <NuxtLink
        v-else
        to="/"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-trim-teal text-white text-base lg:text-lg font-condensed font-bold uppercase tracking-wider hover:bg-trim-teal/90 transition cursor-pointer"
      >
        <!-- Left-pointing arrow: apex on left -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2 12 L10 5 L10 9 L22 9 L22 15 L10 15 L10 19 Z" />
        </svg>
        Back to Phase 1
      </NuxtLink>
    </div>
  </div>

  <!-- Mobile separator (matches the pattern used between other cards) -->
  <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const { attendee, isKnown, clearAttendee } = useAttendee()

const isPhase2Page = computed(() => route.path.startsWith('/phase-2'))
const currentPhase = computed<'P1' | 'P2'>(() => (isPhase2Page.value ? 'P2' : 'P1'))
const hasRegisteredForCurrent = computed(() =>
  attendee.value?.phases.includes(currentPhase.value) ?? false
)

const firstName = computed(() => {
  const full = attendee.value?.name?.trim() ?? ''
  return full ? full.split(/\s+/)[0] : 'friend'
})
</script>
