<template>
  <div id="join" class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-8 min-[860px]:py-14 flex flex-col lg:flex-row items-center lg:items-start gap-12">

    <!-- Left: heading + step -->
    <div class="flex flex-col items-center lg:items-start gap-8 min-w-0 flex-1">
      <h2 class="text-4xl lg:text-5xl font-condensed font-bold uppercase tracking-wide text-trim-purple text-center lg:text-left">
        Join the Alliance
      </h2>

      <button @click="handleJoinClick()" class="group flex items-center gap-6 transition w-full text-left cursor-pointer">
        <div class="w-16 h-16 rounded-full bg-trim-purple flex items-center justify-center shrink-0 group-hover:scale-110 transition">
          <span class="text-3xl font-condensed font-bold text-white leading-none">1</span>
        </div>
        <div>
          <div class="flex items-center gap-4">
            <span class="text-2xl font-condensed font-bold text-neutral-600 group-hover:text-trim-purple transition uppercase tracking-wide">
              Become a Founding Member
            </span>
            <Transition
              mode="out-in"
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 scale-75"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-75"
            >
              <svg v-if="isJoined" key="tick" xmlns="http://www.w3.org/2000/svg" class="w-9 h-9 text-trim-purple shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 12 L6 9 L9 12 L18 3 L21 6 L9 18 Z" />
              </svg>
              <svg v-else key="arrow" xmlns="http://www.w3.org/2000/svg" class="w-9 h-9 text-trim-purple shrink-0 animate-nudge-right" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 12 L10 5 L10 9 L22 9 L22 15 L10 15 L10 19 Z" />
              </svg>
            </Transition>
          </div>
          <p class="text-lg font-roboto font-normal text-neutral-500 mt-1">
            <span class="text-trim-purple underline font-bold">Click here</span> to continue this journey as a Founding Member
          </p>
        </div>
      </button>
    </div>

    <!-- Right: inner card -->
    <div class="shrink-0 lg:w-[440px]">
      <div class="bg-bg-default rounded-xl px-6 min-[860px]:px-10 py-8 min-[860px]:py-10 flex flex-col items-center text-center">
        <p class="text-base font-condensed font-normal uppercase tracking-[0.3em] text-neutral-600 mb-1">To continue this journey</p>
        <span class="inline-block bg-trim-purple text-white text-2xl lg:text-3xl font-condensed font-bold uppercase tracking-wide px-5 py-1.5 rounded-lg my-3">
          Join the Alliance
        </span>
        <p class="text-lg font-roboto font-light text-neutral-500 leading-relaxed mt-4">
          Founding members shape the early life of the Alliance. We will be in touch as the first
          <span class="font-bold text-trim-teal">dialogues</span>,
          <span class="font-bold text-trim-green">recordings</span>, and
          <span class="font-bold text-trim-blue">working groups</span> come online.
        </p>
        <div class="mt-6 w-1.5 h-16 rounded-full bg-[linear-gradient(to_bottom,#DDC66E,#6EB189,#62BDB1,#7CA5DD,#A27CB8)]"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { openModal, isJoined: isJoinedThisSession } = useAllianceModal()
const { track } = useAnalytics()
const { attendee } = useAttendee()

const isJoined = computed(
  () => isJoinedThisSession.value || (attendee.value?.isAllianceMember ?? false)
)

function handleJoinClick() {
  track('alliance_join_modal_open', { source: 'cta' })
  openModal()
}
</script>
