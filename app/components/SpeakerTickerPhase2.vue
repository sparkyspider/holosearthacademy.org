<template>
  <!-- Desktop: continuous scroll ticker -->
  <div class="bg-black/50 overflow-hidden hidden min-[860px]:block select-none">
    <div class="flex w-max animate-ticker hover:[animation-play-state:paused]">
      <div v-for="(_, setIndex) in 2" :key="setIndex" class="flex shrink-0">
        <div
          v-for="speaker in tickerSpeakers"
          :key="`${setIndex}-${speaker.name}`"
          class="flex items-center gap-4 px-8 py-5 w-[23rem] shrink-0 cursor-pointer"
          @click="onSpeakerTap(speaker.slug)"
        >
          <img
            :src="speaker.image"
            :alt="speaker.name"
            draggable="false"
            class="w-[4.5rem] h-[4.5rem] rounded-lg object-cover object-top shrink-0 pointer-events-none"
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
    class="bg-black/50 overflow-hidden min-[860px]:hidden select-none touch-pan-y cursor-grab active:cursor-grabbing"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerCancel"
    @pointerleave="onPointerLeave"
    @mouseenter="pauseTimer"
    @mouseleave="resumeTimer"
  >
    <div
      class="flex will-change-transform"
      :class="isDragging || disableTransition ? '' : 'transition-transform duration-500 ease-out'"
      :style="{ transform: mobileTransform }"
      @transitionend="onTrackTransitionEnd"
    >
      <div
        v-for="(speaker, i) in mobileLoopSpeakers"
        :key="i"
        class="w-full shrink-0 px-6 py-5 flex justify-center cursor-pointer"
      >
        <div class="flex items-center gap-4 w-[20rem] max-w-full">
          <img
            :src="speaker.image"
            :alt="speaker.name"
            draggable="false"
            class="w-[4.5rem] h-[4.5rem] rounded-lg object-cover object-top shrink-0 pointer-events-none"
          />
          <div class="min-w-0">
            <div class="text-white text-lg font-roboto font-normal leading-tight whitespace-nowrap">{{ speaker.name }}</div>
            <div class="text-white/80 text-sm font-roboto font-normal leading-snug">{{ speaker.line1 }}<br />{{ speaker.line2 }}</div>
          </div>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { findSpeakerBySlug } from '~/data/speakers'

// Phase-2 placeholder speakers — names and faces will be updated as the
// phase-2 line-up is confirmed. Keep this list independent from the
// home page ticker (SpeakerTicker.vue).
const tickerSpeakers = [
  { name: 'Joe Soap', image: '/images/speakers/kobus-du-pisani.png', line1: 'Placeholder', line2: 'Phase 2 Speaker', slug: 'joe-soap' },
  { name: 'Joan Martin', image: '/images/speakers/jeff-blumberg.png', line1: 'Placeholder', line2: 'Phase 2 Speaker', slug: 'joan-martin' },
  { name: 'Bart Simpson', image: '/images/speakers/markus-link.jpeg', line1: 'Placeholder', line2: 'Phase 2 Speaker', slug: 'bart-simpson' },
  { name: 'Lisa Simpson', image: '/images/speakers/jude-currivan.png', line1: 'Placeholder', line2: 'Phase 2 Speaker', slug: 'lisa-simpson' },
  { name: 'Homer Simpson', image: '/images/speakers/david-lorimer.png', line1: 'Placeholder', line2: 'Phase 2 Speaker', slug: 'homer-simpson' },
  { name: 'Marge Simpson', image: '/images/speakers/rhett-gayle.png', line1: 'Placeholder', line2: 'Phase 2 Speaker', slug: 'marge-simpson' },
  { name: 'Ned Flanders', image: '/images/speakers/claudius-van-wyk.png', line1: 'Placeholder', line2: 'Phase 2 Speaker', slug: 'ned-flanders' },
]

const currentIndex = ref(1)
const isDragging = ref(false)
const dragOffset = ref(0)
const mobileTransform = computed(() => `translateX(calc(-${currentIndex.value * 100}% + ${dragOffset.value}px))`)
const disableTransition = ref(false)
const paused = ref(false)
let interval: ReturnType<typeof setInterval> | null = null

const mobileLoopSpeakers = computed(() => {
  const len = tickerSpeakers.length
  if (len === 0) return []
  if (len === 1) return [tickerSpeakers[0]]
  return [tickerSpeakers[len - 1], ...tickerSpeakers, tickerSpeakers[0]]
})

function startTimer() {
  stopTimer()
  interval = setInterval(() => {
    if (!paused.value) {
      goNext()
    }
  }, 5000)
}

function goNext() {
  if (tickerSpeakers.length <= 1) return
  currentIndex.value = currentIndex.value + 1
}

function goPrev() {
  if (tickerSpeakers.length <= 1) return
  currentIndex.value = currentIndex.value - 1
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

// Swipe/drag handling (touch + mouse via Pointer Events)
let pointerStartX = 0
let pointerStartY = 0
let lastPointerX = 0
let lastPointerY = 0
let activePointerId: number | null = null
let gestureAxis: 'x' | 'y' | null = null
const SWIPE_THRESHOLD = 40
const AXIS_THRESHOLD = 8
const TAP_THRESHOLD = 10

function onPointerDown(e: PointerEvent) {
  if (e.pointerType === 'mouse' && e.button !== 0) return
  disableTransition.value = false
  activePointerId = e.pointerId
  pointerStartX = e.clientX
  pointerStartY = e.clientY
  lastPointerX = e.clientX
  lastPointerY = e.clientY
  gestureAxis = null
  dragOffset.value = 0
  isDragging.value = true
  pauseTimer()
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  if (activePointerId !== null && e.pointerId !== activePointerId) return

  const dx = e.clientX - pointerStartX
  const dy = e.clientY - pointerStartY
  lastPointerX = e.clientX
  lastPointerY = e.clientY

  if (!gestureAxis && (Math.abs(dx) > AXIS_THRESHOLD || Math.abs(dy) > AXIS_THRESHOLD)) {
    gestureAxis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
  }

  if (gestureAxis === 'x') {
    dragOffset.value = dx
  }
}

function onPointerUp(e: PointerEvent) {
  if (activePointerId !== null && e.pointerId !== activePointerId) return
  finishPointerGesture(e.clientX, e.clientY)
}

function onPointerLeave(e: PointerEvent) {
  if (!isDragging.value) return
  if (e.pointerType === 'mouse') {
    finishPointerGesture(lastPointerX, lastPointerY)
  }
}

function onPointerCancel() {
  activePointerId = null
  isDragging.value = false
  gestureAxis = null
  dragOffset.value = 0
  resumeTimer()
}

function getActiveRealIndex() {
  const len = tickerSpeakers.length
  if (len <= 1) return 0
  if (currentIndex.value === 0) return len - 1
  if (currentIndex.value === len + 1) return 0
  return currentIndex.value - 1
}

function onTrackTransitionEnd() {
  const len = tickerSpeakers.length
  if (len <= 1) return

  if (currentIndex.value === 0 || currentIndex.value === len + 1) {
    disableTransition.value = true
    currentIndex.value = currentIndex.value === 0 ? len : 1
    dragOffset.value = 0
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        disableTransition.value = false
      })
    })
  }
}

function finishPointerGesture(endX: number, endY: number) {
  const dx = endX - pointerStartX
  const dy = endY - pointerStartY
  const axis = gestureAxis
  activePointerId = null
  isDragging.value = false
  gestureAxis = null

  // Only count horizontal swipes (ignore vertical scrolls)
  if (axis === 'x' && Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) {
      // Swipe left → next speaker
      goNext()
    } else {
      // Swipe right → previous speaker
      goPrev()
    }
    dragOffset.value = 0
    resumeTimer()
    return
  }

  if (Math.abs(dx) < TAP_THRESHOLD && Math.abs(dy) < TAP_THRESHOLD) {
    // It was a tap — open the current speaker's modal
    dragOffset.value = 0
    onSpeakerTap(tickerSpeakers[getActiveRealIndex()].slug)
    return // don't resume timer, modal will handle it
  }

  dragOffset.value = 0
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
