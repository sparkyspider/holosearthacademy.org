<template>
  <div id="programme" class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-8 min-[860px]:py-14">
    <!-- Header -->
    <span class="block text-xs font-condensed font-normal uppercase tracking-[0.35em] text-neutral-400">Phase One · Complete</span>
    <h2 class="text-4xl lg:text-5xl font-condensed font-bold uppercase tracking-wide text-trim-purple text-left mt-2 mb-4">
      Phase One Recordings
    </h2>
    <p class="text-lg lg:text-xl font-roboto font-normal text-neutral-600 leading-relaxed mb-3">
      Choose a Phase One session below to watch the recording.
    </p>

    <!-- Phase Two call-to-action — nested card -->
    <div class="rounded-xl bg-trim-purple/5 ring-1 ring-trim-purple/15 px-5 min-[860px]:px-8 py-5 min-[860px]:py-6 mb-10 flex flex-col min-[860px]:flex-row min-[860px]:items-center gap-4 min-[860px]:gap-6 text-center min-[860px]:text-left">
      <p class="flex-1 text-lg lg:text-xl font-roboto font-normal text-neutral-600 leading-relaxed">
        The festival continues with
        <NuxtLink to="/" class="font-bold text-trim-purple underline underline-offset-4 decoration-trim-purple/40 hover:decoration-trim-purple transition">Phase Two: Liminal Space</NuxtLink>
        &mdash; nine dialogues, 10 Jun&ndash;2 Dec 2026.
      </p>
      <NuxtLink
        to="/"
        class="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-trim-purple text-white text-base font-condensed font-bold uppercase tracking-wider hover:bg-trim-purple/90 transition cursor-pointer"
      >
        Register for Phase Two
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12 L14 5 L14 9 L2 9 L2 15 L14 15 L14 19 Z" /></svg>
      </NuxtLink>
    </div>

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
            :id="`event-${event.slug}`"
            :class="['group relative rounded-xl p-5 min-[860px]:p-8 transition-all duration-300 max-[859px]:mt-20 bg-white max-[859px]:shadow-[0_4px_20px_rgba(0,0,0,0.06)] min-[860px]:bg-bg-default min-[860px]:shadow-none scroll-mt-24 max-[859px]:scroll-mt-28', event.recording ? 'hover:shadow-lg cursor-pointer' : '']"
            @click="event.recording ? goToSpeaker(event) : undefined"
          >
            <div class="flex flex-col min-[860px]:flex-row gap-0 min-[860px]:gap-8">
              <!-- Avatar -->
              <div class="shrink-0 flex flex-col items-center min-[860px]:items-start max-[859px]:absolute max-[859px]:top-0 max-[859px]:left-1/2 max-[859px]:-translate-x-1/2 max-[859px]:-translate-y-1/2">
                <div
                  :class="['w-30 h-30 rounded-full overflow-hidden ring-6 ring-offset-3 max-[859px]:ring-offset-white ring-offset-bg-default hover:scale-105 transition-transform', day.ringColor]"
                >
                  <img
                    :src="event.image"
                    :alt="event.speaker"
                    class="w-full h-full object-cover object-top"
                  />
                </div>
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

                <p class="text-lg font-roboto font-light text-neutral-500 leading-relaxed">
                  {{ event.description }}
                </p>

                <div class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2" @click.stop>
                  <!-- Concluded talk with a recording: link to the speaker page -->
                  <NuxtLink
                    v-if="event.recording"
                    :to="`/speaker/${event.slug}`"
                    :class="['group/cta inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-condensed font-bold uppercase tracking-wider text-white hover:opacity-90 transition cursor-pointer', day.badgeColor]"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M8 5v14l11-7z" /></svg>
                    Watch Now
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 group-hover/cta:animate-nudge-right"><path d="M22 12 L14 5 L14 9 L2 9 L2 15 L14 15 L14 19 Z" /></svg>
                  </NuxtLink>
                  <!-- Recording not yet published -->
                  <button
                    v-else
                    type="button"
                    disabled
                    aria-label="Recording uploading"
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-condensed font-bold uppercase tracking-wider bg-white ring-1 ring-neutral-200 shadow-sm text-neutral-400 cursor-not-allowed"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 16V4m0 0L8 8m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" /></svg>
                    Uploading&hellip;
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Dialogue card -->
          <div
            v-if="day.dialogueEvent"
            :id="day.dialogueEvent.slug ? `event-${day.dialogueEvent.slug}` : undefined"
            class="group relative rounded-xl p-5 min-[860px]:p-8 transition-all duration-300 max-[859px]:mt-20 bg-white max-[859px]:shadow-[0_4px_20px_rgba(0,0,0,0.06)] min-[860px]:bg-bg-default min-[860px]:shadow-none scroll-mt-24 max-[859px]:scroll-mt-28"
          >
            <div class="flex flex-col min-[860px]:flex-row gap-0 min-[860px]:gap-8">
              <!-- Icon circle -->
              <div class="shrink-0 flex flex-col items-center min-[860px]:items-start max-[859px]:absolute max-[859px]:top-0 max-[859px]:left-1/2 max-[859px]:-translate-x-1/2 max-[859px]:-translate-y-1/2">
                <div :class="['w-30 h-30 rounded-full overflow-hidden ring-6 ring-offset-3 max-[859px]:ring-offset-white ring-offset-bg-default', day.ringColor]">
                  <img src="/images/speakers/interconnectedness.avif" alt="A Dialogue with All Presenters" class="w-full h-full object-cover object-center" />
                </div>
              </div>
              <!-- Mobile spacer -->
              <div class="h-16 min-[860px]:hidden"></div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex flex-col min-[860px]:flex-row min-[860px]:items-center gap-2 min-[860px]:gap-4 mb-3">
                  <h3 :class="['text-2xl font-condensed font-bold uppercase tracking-wide', day.titleColor]">
                    {{ day.dialogueEvent.title }}
                  </h3>
                  <span :class="['inline-flex self-start min-[860px]:self-center items-center px-3 py-1 rounded-full text-base font-condensed font-bold uppercase tracking-wider text-white whitespace-nowrap', day.badgeColor]">
                    {{ day.dialogueEvent.time }}
                  </span>
                </div>

                <p :class="['text-lg font-condensed font-normal italic tracking-wide pl-3 border-l-3 mb-3', day.subtitleColor, day.borderColor]">
                  {{ day.dialogueEvent.subtitle }}
                </p>

                <div class="text-lg font-roboto font-light text-neutral-500 leading-relaxed space-y-3">
                  <p v-for="para in day.dialogueEvent.paragraphs" :key="para">{{ para }}</p>
                  <p>{{ day.dialogueEvent.finalParaPre }}{{ day.dialogueEvent.finalParaHighlight }}</p>
                </div>

                <div class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <!-- Concluded dialogue with a recording: link to the speaker-style page -->
                  <NuxtLink
                    v-if="day.dialogueEvent.recording && day.dialogueEvent.slug"
                    :to="`/speaker/${day.dialogueEvent.slug}`"
                    :class="['group/cta inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-condensed font-bold uppercase tracking-wider text-white hover:opacity-90 transition cursor-pointer', day.badgeColor]"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M8 5v14l11-7z" /></svg>
                    Watch Now
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 group-hover/cta:animate-nudge-right"><path d="M22 12 L14 5 L14 9 L2 9 L2 15 L14 15 L14 19 Z" /></svg>
                  </NuxtLink>
                  <!-- Recording not yet published -->
                  <button
                    v-else
                    type="button"
                    disabled
                    aria-label="Recording uploading"
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-condensed font-bold uppercase tracking-wider bg-white ring-1 ring-neutral-200 shadow-sm text-neutral-400 cursor-not-allowed"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 16V4m0 0L8 8m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" /></svg>
                    Uploading&hellip;
                  </button>
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
import type { SpeakerEvent, Day, DialogueEvent } from '~/data/speakers'

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


function goToSpeaker(event: SpeakerEvent) {
  navigateTo(`/speaker/${event.slug}`)
}

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
  window.history.replaceState({}, '', '/phase-1')
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
