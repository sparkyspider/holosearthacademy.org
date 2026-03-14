<template>
  <!-- Desktop: continuous scroll ticker -->
  <div class="bg-black/50 overflow-hidden hidden min-[860px]:block">
    <div class="flex w-max animate-ticker hover:[animation-play-state:paused]">
      <div v-for="(_, setIndex) in 2" :key="setIndex" class="flex shrink-0">
        <div
          v-for="speaker in speakers"
          :key="`${setIndex}-${speaker.name}`"
          class="flex items-center gap-4 px-10 py-5"
        >
          <img
            :src="speaker.image"
            :alt="speaker.name"
            class="w-[4.5rem] h-[4.5rem] rounded-lg object-cover object-top shrink-0"
          />
          <div>
            <div class="text-white text-lg font-roboto font-normal leading-tight whitespace-nowrap">{{ speaker.name }}</div>
            <div class="text-white/80 text-sm font-roboto font-normal leading-snug">{{ speaker.line1 }}<br />{{ speaker.line2 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile: step-scroll ticker -->
  <div
    class="bg-black/50 overflow-hidden min-[860px]:hidden"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div
      ref="mobileTrack"
      class="flex transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(speaker, i) in tickerSpeakers"
        :key="i"
        class="flex items-center gap-4 px-6 py-5 w-full shrink-0 justify-center cursor-pointer"
      >
        <img
          :src="speaker.image"
          :alt="speaker.name"
          class="w-[4.5rem] h-[4.5rem] rounded-lg object-cover object-top shrink-0"
        />
        <div>
          <div class="text-white text-lg font-roboto font-normal leading-tight whitespace-nowrap">{{ speaker.name }}</div>
          <div class="text-white/80 text-sm font-roboto font-normal leading-snug">{{ speaker.line1 }}<br />{{ speaker.line2 }}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Speaker Modal (for mobile ticker taps) -->
  <SpeakerModal
    :open="modalOpen"
    :name="modalSpeaker.name"
    :image="modalSpeaker.image"
    :talk="modalSpeaker.talk"
    :bio="modalSpeaker.bio"
    :ring-color="modalSpeaker.ringColor"
    :title-color="modalSpeaker.titleColor"
    :bg-color="modalSpeaker.bgColor"
    :speaking-date="modalSpeaker.speakingDate"
    :speaking-time="modalSpeaker.speakingTime"
    :event-date="modalSpeaker.eventDate"
    :calendar-btn-class="modalSpeaker.calendarBtnClass"
    :speaker="modalSpeaker.name"
    :theme="modalSpeaker.theme"
    @close="closeSpeakerModal"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { findSpeakerBySlug } from '~/data/speakers'

const tickerSpeakers = [
  { name: 'Prof Kobus Du Pisani', image: '/images/speakers/kobus-du-pisani.png', line1: 'Smuts Scholar', line2: '& Historian', slug: 'kobus-du-pisani' },
  { name: 'Jeff Blumberg', image: '/images/speakers/jeff-blumberg.png', line1: 'Author on Holism', line2: '& Evolution', slug: 'jeff-blumberg' },
  { name: 'Marcus Link', image: '/images/speakers/marcus-link.png', line1: 'Founder', line2: 'Ecological Intelligence', slug: 'marcus-link' },
  { name: 'Dr Jude Currivan', image: '/images/speakers/jude-currivan.png', line1: 'Cosmologist', line2: 'WholeWorld-View Co-founder', slug: 'jude-currivan' },
  { name: 'Dr Claudius van Wyk', image: '/images/speakers/claudius-van-wyk.png', line1: 'Holistic Systems', line2: 'Practice Expert', slug: 'claudius-van-wyk' },
  { name: 'David Lorimer', image: '/images/speakers/david-lorimer.png', line1: 'Programme Director', line2: 'Scientific & Medical Network', slug: 'david-lorimer' },
  { name: 'Dr Rhett Gayle', image: '/images/speakers/rhett-gayle.png', line1: 'Philosopher', line2: '& Wisdom Researcher', slug: 'rhett-gayle' },
]

const currentIndex = ref(0)
const mobileTrack = ref<HTMLElement | null>(null)
const paused = ref(false)
let interval: ReturnType<typeof setInterval> | null = null

function startTimer() {
  stopTimer()
  interval = setInterval(() => {
    if (!paused.value) {
      currentIndex.value = (currentIndex.value + 1) % tickerSpeakers.length
    }
  }, 5000)
}

function stopTimer() {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}

function pauseTimer() {
  paused.value = true
}

function resumeTimer() {
  paused.value = false
  // Reset the timer so the next slide waits the full duration
  startTimer()
}

// Swipe handling
let touchStartX = 0
let touchStartY = 0
const SWIPE_THRESHOLD = 40
const TAP_THRESHOLD = 10

function onTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
  pauseTimer()
}

function onTouchEnd(e: TouchEvent) {
  const touchEndX = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY
  const dx = touchEndX - touchStartX
  const dy = touchEndY - touchStartY

  // Only count horizontal swipes (ignore vertical scrolls)
  if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) {
      // Swipe left → next speaker
      currentIndex.value = (currentIndex.value + 1) % tickerSpeakers.length
    } else {
      // Swipe right → previous speaker
      currentIndex.value = (currentIndex.value - 1 + tickerSpeakers.length) % tickerSpeakers.length
    }
  } else if (Math.abs(dx) < TAP_THRESHOLD && Math.abs(dy) < TAP_THRESHOLD) {
    // It was a tap — open the current speaker's modal
    onSpeakerTap(tickerSpeakers[currentIndex.value].slug)
    return // don't resume timer, modal will handle it
  }

  resumeTimer()
}

// Speaker modal
const modalOpen = ref(false)
const modalSpeaker = ref({
  name: '',
  image: '',
  talk: '',
  bio: '',
  ringColor: '',
  titleColor: '',
  bgColor: '',
  speakingDate: '',
  speakingTime: '',
  eventDate: '',
  calendarBtnClass: '',
  theme: '',
})

function onSpeakerTap(slug: string) {
  const found = findSpeakerBySlug(slug)
  if (!found) return
  const { event, day } = found
  modalSpeaker.value = {
    name: event.speaker,
    image: event.image,
    talk: event.title,
    bio: event.bio,
    ringColor: day.ringColor,
    titleColor: day.titleColor,
    bgColor: day.badgeColor,
    speakingDate: day.label,
    speakingTime: event.time,
    eventDate: day.date,
    calendarBtnClass: day.calendarBtnClass,
    theme: day.theme,
  }
  modalOpen.value = true
  pauseTimer()
}

function closeSpeakerModal() {
  modalOpen.value = false
  resumeTimer()
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>
