<template>
  <div class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-8 min-[860px]:py-14 flex flex-col lg:flex-row items-center lg:items-start gap-12">
    <!-- Left: Register Now + Steps -->
    <div class="flex flex-col items-center lg:items-start gap-8 min-w-0 flex-1">
      <h2 class="text-4xl lg:text-5xl font-condensed font-bold uppercase tracking-wide text-trim-purple text-center lg:text-left">
        Register Now
      </h2>

      <!-- Step 1 -->
      <button @click="handleRegisterClick()" class="group flex items-center gap-6 transition w-full text-left cursor-pointer">
        <div class="w-16 h-16 rounded-full bg-trim-teal flex items-center justify-center shrink-0 group-hover:scale-110 transition">
          <span class="text-3xl font-condensed font-bold text-white leading-none">1</span>
        </div>
        <div>
          <div class="flex items-center gap-4">
            <span class="text-2xl font-condensed font-bold text-neutral-600 group-hover:text-trim-teal transition uppercase tracking-wide">Register</span>
            <Transition mode="out-in" enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-75" enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-75">
              <svg v-if="isRegistered" key="tick" xmlns="http://www.w3.org/2000/svg" class="w-9 h-9 text-trim-teal shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 12 L6 9 L9 12 L18 3 L21 6 L9 18 Z" />
              </svg>
              <svg v-else key="arrow" xmlns="http://www.w3.org/2000/svg" class="w-9 h-9 text-trim-teal shrink-0 animate-nudge-right" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 12 L10 5 L10 9 L22 9 L22 15 L10 15 L10 19 Z" />
              </svg>
            </Transition>
          </div>
          <p class="text-lg font-roboto font-normal text-neutral-500 mt-1"><span class="text-trim-teal underline font-bold">Click me</span> to complete registration, then...</p>
        </div>
      </button>

      <!-- Step 2 -->
      <a href="#programme" class="group flex items-center gap-6 transition w-full">
        <div class="w-16 h-16 rounded-full bg-trim-blue flex items-center justify-center shrink-0 group-hover:scale-110 transition">
          <span class="text-3xl font-condensed font-bold text-white leading-none">2</span>
        </div>
        <div>
          <div class="flex items-center gap-4">
            <span class="text-2xl font-condensed font-bold text-neutral-600 group-hover:text-trim-blue transition uppercase tracking-wide">Choose your sessions below</span>
            <Transition mode="out-in" enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-75" enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-75">
              <svg v-if="hasAddedCalendar" key="tick" xmlns="http://www.w3.org/2000/svg" class="w-9 h-9 text-trim-blue shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 12 L6 9 L9 12 L18 3 L21 6 L9 18 Z" />
              </svg>
              <svg v-else-if="isRegistered" key="arrow" xmlns="http://www.w3.org/2000/svg" class="w-9 h-9 text-trim-blue shrink-0 animate-nudge-right" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 12 L10 5 L10 9 L22 9 L22 15 L10 15 L10 19 Z" />
              </svg>
              <span v-else key="empty" />
            </Transition>
          </div>
          <p class="text-lg font-roboto font-normal text-neutral-500 mt-1"><span class="text-trim-blue underline font-bold">Click me</span> to scroll down and select the talks you want to attend</p>
        </div>
      </a>

      <!-- Note -->
      <p class="text-xl font-roboto font-normal text-neutral-600 mt-4 leading-relaxed">
        <span class="font-bold text-trim-purple uppercase tracking-wide">Note:</span> Each session builds on the previous, creating an <span class="font-bold text-trim-green">evolving journey of insight</span> so we'd love you to join the <span class="font-bold text-trim-teal">full experience</span>. But if time is tight, simply choose the sessions that suit your schedule. With just <span class="font-bold text-trim-blue">one or two talks per day</span>, it's designed to fit in with you.
      </p>
    </div>

    <!-- Right: Countdown card — aligned with quote bar above -->
    <div class="shrink-0 lg:w-[440px]">
      <div class="bg-bg-default rounded-xl px-6 min-[860px]:px-10 py-8 min-[860px]:py-10 flex flex-col items-center">
        <p class="text-base font-condensed font-normal uppercase tracking-[0.3em] text-neutral-600 mb-1 text-center">See you at the</p>
        <span class="inline-block bg-trim-purple text-white text-2xl lg:text-3xl font-condensed font-bold uppercase tracking-wide px-5 py-1.5 rounded-lg my-3">
          Opening Event
        </span>
        <p class="text-base font-condensed font-normal uppercase tracking-[0.3em] text-neutral-600 mb-6 text-center">in</p>
        <CountdownTimer />
        <p class="text-xl lg:text-2xl font-condensed font-normal text-neutral-600 mt-6 tracking-wide text-center">
          Starts <span class="font-bold text-trim-blue">20 May</span> at <span class="font-bold text-trim-teal">19h00 CET</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { openModal, isRegistered } = useRegistrationModal()
const { hasAddedCalendar } = useCalendarProgress()
const { track } = useAnalytics()

function handleRegisterClick() {
  track('registration_modal_open', { source: 'cta' })
  openModal()
}
</script>
