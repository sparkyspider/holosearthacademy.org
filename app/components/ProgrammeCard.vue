<template>
  <div id="programme" class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-8 min-[860px]:py-14">
    <!-- Header -->
    <h2 class="text-4xl lg:text-5xl font-condensed font-bold uppercase tracking-wide text-trim-purple text-left mb-4">
      The Programme
    </h2>
    <a href="#about-festival" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-condensed font-bold uppercase tracking-wider bg-trim-teal/10 text-trim-teal transition hover:opacity-80 cursor-pointer mb-4">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 16v-4M12 8h.01" /></svg>
      Jump to: More about the Festival
    </a>
    <p class="text-lg font-roboto font-normal text-neutral-500 leading-relaxed mb-4">
      Please make sure you have <button type="button" @click="handleRegisterClick()" class="font-bold text-trim-teal underline hover:text-trim-teal-dark transition cursor-pointer">registered</button>, then select the sessions you'd like to attend by clicking <span class="font-bold text-trim-blue">Add to Calendar</span> on each talk. Your calendar entry will include the <span class="font-bold text-trim-blue">Zoom link</span> to join the session.
    </p>
    <p class="text-sm font-roboto text-neutral-400 mb-12">
      All times in CEST (Central European Summer Time, UTC+2) — same as South African time (SAST).
    </p>

    <!-- Days -->
    <div class="flex flex-col gap-12">
      <div v-for="day in days" :key="day.date" class="flex flex-col gap-0">
        <!-- Day header -->
        <div class="flex items-center gap-4 mb-6 justify-center min-[860px]:justify-start">
          <div :class="['hidden min-[860px]:block w-3 h-3 rounded-full shrink-0', day.dotColor]"></div>
          <div class="flex flex-col min-[860px]:flex-row min-[860px]:items-baseline text-center min-[860px]:text-left">
            <span class="text-4xl min-[860px]:text-3xl lg:text-4xl font-condensed font-bold uppercase tracking-wide text-neutral-700">
              {{ day.label }}
            </span>
            <span :class="['text-xl min-[860px]:text-lg lg:text-xl font-condensed font-bold italic min-[860px]:ml-3 tracking-wide text-center min-[860px]:text-left', day.themeColor]">
              {{ day.theme }}
            </span>
          </div>
        </div>

        <!-- Events for the day -->
        <div class="flex flex-col gap-0 min-[860px]:gap-6 min-[860px]:pl-7">
          <div
            v-for="event in day.events"
            :key="event.speaker"
            :class="['group relative rounded-xl p-5 min-[860px]:p-8 transition-all duration-300 hover:shadow-lg cursor-pointer max-[859px]:mt-20 bg-white max-[859px]:shadow-[0_4px_20px_rgba(0,0,0,0.06)] min-[860px]:bg-bg-default min-[860px]:shadow-none']"
          >
            <div class="flex flex-col min-[860px]:flex-row gap-0 min-[860px]:gap-8">
              <!-- Avatar -->
              <div class="shrink-0 flex flex-col items-center min-[860px]:items-start max-[859px]:absolute max-[859px]:top-0 max-[859px]:left-1/2 max-[859px]:-translate-x-1/2 max-[859px]:-translate-y-1/2">
                <button
                  @click="openSpeakerModal(event, day)"
                  :class="['w-30 h-30 rounded-full overflow-hidden ring-6 ring-offset-3 max-[859px]:ring-offset-white ring-offset-bg-default cursor-pointer hover:scale-105 transition-transform', day.ringColor]"
                >
                  <img
                    :src="event.image"
                    :alt="event.speaker"
                    class="w-full h-full object-cover object-top"
                  />
                </button>
              </div>
              <!-- Mobile spacer: reserves height below the floating avatar -->
              <div class="h-16 min-[860px]:hidden"></div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex flex-col min-[860px]:flex-row min-[860px]:items-center gap-2 min-[860px]:gap-4 mb-3">
                  <h3 class="text-2xl font-condensed font-bold text-neutral-700 uppercase tracking-wide">
                    {{ event.speaker }}
                  </h3>
                  <span :class="['inline-flex self-start min-[860px]:self-center items-center px-3 py-1 rounded-full text-base font-condensed font-bold uppercase tracking-wider text-white whitespace-nowrap', day.badgeColor]">
                    {{ event.time }}
                  </span>
                </div>

                <h4 :class="['text-xl lg:text-2xl font-roboto font-bold mb-2', day.titleColor]">
                  {{ event.title }}
                </h4>
                <p v-if="event.subtitle" :class="['text-lg font-condensed font-normal italic tracking-wide pl-3 border-l-3 mb-3', day.subtitleColor, day.borderColor]">
                  {{ event.subtitle }}
                </p>

                <p class="text-lg font-roboto font-light text-neutral-500 leading-relaxed line-clamp-3">
                  {{ event.description }}
                </p>

                <div class="mt-4">
                  <AddToCalendar
                    :title="event.title"
                    :speaker="event.speaker"
                    :description="event.description"
                    :theme="day.theme"
                    :date="day.date"
                    :time="event.time"
                    :button-class="`${day.calendarBtnClass}`"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Speaker Modal -->
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { days, findSpeakerBySlug } from '~/data/speakers'
import type { SpeakerEvent, Day } from '~/data/speakers'

const { openModal } = useRegistrationModal()
const { track } = useAnalytics()

function handleRegisterClick() {
  track('registration_modal_open', { source: 'programme' })
  openModal()
}

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


function openSpeakerModal(event: SpeakerEvent, day: Day) {
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
  window.history.replaceState({}, '', `/speaker/${event.slug}`)
}

function closeSpeakerModal() {
  modalOpen.value = false
  window.history.replaceState({}, '', '/')
}

// Deep-link: auto-open modal if URL is /speaker/:slug
onMounted(() => {
  const match = window.location.pathname.match(/^\/speaker\/(.+)$/)
  if (match) {
    const found = findSpeakerBySlug(match[1])
    if (found) openSpeakerModal(found.event, found.day)
  }
})
</script>
