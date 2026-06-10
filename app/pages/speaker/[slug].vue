<template>
  <div class="min-h-[100dvh] bg-bg-default max-w-[100vw] overflow-x-hidden">
    <!-- Top brand accent -->
    <ColorBar />

    <!-- ───────────────────────── Body ───────────────────────── -->
    <div class="flex-1 py-0 min-[860px]:py-16 px-0 min-[860px]:px-8 flex flex-col items-center gap-0 min-[860px]:gap-10">
      <!-- Back link -->
      <div class="w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-0 pt-6 min-[860px]:pt-0">
        <NuxtLink
          :to="backHref"
          class="inline-flex items-center gap-1.5 text-sm font-condensed font-bold uppercase tracking-wider text-trim-teal hover:opacity-80 transition cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M2 12 L10 5 L10 9 L22 9 L22 15 L10 15 L10 19 Z" /></svg>
          {{ backLabel }}
        </NuxtLink>
      </div>

      <template v-if="speaker">
        <!-- Speaker header card -->
        <div
          class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-8 min-[860px]:py-14 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10"
        >
          <!-- Avatar -->
          <div class="shrink-0">
            <div :class="['w-36 h-36 min-[860px]:w-44 min-[860px]:h-44 rounded-full overflow-hidden ring-6 ring-offset-4 ring-offset-white', day?.ringColor]">
              <img :src="speaker.image" :alt="speaker.speaker" class="w-full h-full object-cover object-top" />
            </div>
          </div>
          <!-- Copy -->
          <div class="flex-1 min-w-0 text-center lg:text-left">
            <p class="text-xs font-condensed font-normal uppercase tracking-[0.35em] text-neutral-400">
              Centenary Festival&nbsp;·&nbsp;{{ phaseLabel }}&nbsp;·&nbsp;{{ day?.label }}
            </p>
            <h1 class="text-3xl min-[860px]:text-4xl lg:text-5xl font-condensed font-bold uppercase tracking-wide text-trim-purple leading-[1.05] mt-2">
              {{ speaker.title }}
            </h1>
            <p v-if="speaker.subtitle" class="text-lg lg:text-xl font-condensed font-normal italic tracking-wide text-neutral-500 mt-2">
              {{ speaker.subtitle }}
            </p>
            <p class="text-xl font-condensed font-bold uppercase tracking-wide text-neutral-700 mt-4">
              {{ speaker.speaker }}
              <span :class="['font-bold italic normal-case', day?.themeColor]">&nbsp;·&nbsp;{{ day?.theme }}</span>
            </p>
            <!-- gradient quote bar + bio -->
            <div class="flex mt-6 text-left">
              <div class="w-1.5 shrink-0 rounded-full bg-[linear-gradient(to_bottom,#DDC66E,#6EB189,#62BDB1,#7CA5DD,#A27CB8)]"></div>
              <p
                class="pl-6 min-[860px]:pl-8 text-lg lg:text-xl font-roboto font-normal leading-relaxed text-neutral-600"
                v-html="speaker.bio"
              ></p>
            </div>
          </div>
        </div>

        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>

        <!-- Watch card — hidden for upcoming Phase 2 talks (no committed date yet) -->
        <div
          v-if="speaker.recording || !isPhase2"
          id="watch"
          class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-8 min-[860px]:py-14"
        >
          <h2 class="text-4xl lg:text-5xl font-condensed font-bold uppercase tracking-wide text-trim-purple mb-6">
            {{ watchHeading }}
          </h2>

          <template v-if="speaker.recording">
            <!-- Responsive 16:9 YouTube embed -->
            <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
              <iframe
                class="absolute inset-0 w-full h-full"
                :src="`https://www.youtube-nocookie.com/embed/${speaker.recording.youtubeId}?rel=0`"
                :title="`${speaker.speaker} — ${speaker.title}`"
                loading="lazy"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>

            <!-- Download + facts row -->
            <div class="mt-6 flex flex-col min-[860px]:flex-row min-[860px]:items-center gap-4 min-[860px]:gap-6">
              <a
                v-if="speaker.recording.pdfUrl"
                :href="speaker.recording.pdfUrl"
                target="_blank"
                rel="noopener"
                download
                class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-trim-purple text-white text-base lg:text-lg font-condensed font-bold uppercase tracking-wider hover:bg-trim-purple/90 transition cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                </svg>
                Download transcript (PDF)
              </a>
              <p class="text-base font-roboto font-light text-neutral-500 leading-relaxed text-center min-[860px]:text-left">
                Recorded {{ day?.label }}, {{ speaker.time }}. The full transcript is available below
                and as a downloadable PDF.
              </p>
            </div>
          </template>

          <!-- Upcoming Phase 2 talk: broadcast info -->
          <div v-else-if="isPhase2" class="flex">
            <div class="w-1.5 shrink-0 rounded-full bg-[linear-gradient(to_bottom,#DDC66E,#6EB189,#62BDB1,#7CA5DD,#A27CB8)]"></div>
            <p class="pl-6 min-[860px]:pl-8 text-lg lg:text-xl font-roboto font-normal leading-relaxed text-neutral-600">
              This session will be broadcast live on
              <span :class="['font-bold', day?.titleColor]">{{ day?.label }}</span> at
              <span :class="['font-bold', day?.titleColor]">{{ speaker.time }}</span>.
              The recording and transcript will be published here afterwards &mdash;
              <NuxtLink to="/#register" class="font-bold text-trim-purple underline underline-offset-4 decoration-trim-purple/40 hover:decoration-trim-purple transition">register for Phase Two</NuxtLink>
              to receive the joining link.
            </p>
          </div>

          <!-- Phase 1 fallback (recording still being prepared) -->
          <div v-else class="flex">
            <div class="w-1.5 shrink-0 rounded-full bg-[linear-gradient(to_bottom,#DDC66E,#6EB189,#62BDB1,#7CA5DD,#A27CB8)]"></div>
            <p class="pl-6 min-[860px]:pl-8 text-lg lg:text-xl font-roboto font-normal leading-relaxed text-neutral-600">
              The recording and transcript for this session are being prepared and will be
              <span class="font-bold text-trim-purple">available {{ availabilityWord }}</span>. Please check back soon.
            </p>
          </div>
        </div>

        <!-- Transcript card -->
        <template v-if="transcriptHtml">
          <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
          <div
            id="transcript"
            class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-8 min-[860px]:py-14"
          >
            <p class="text-xs font-condensed font-normal uppercase tracking-[0.35em] text-neutral-400">The full session</p>
            <h2 class="text-4xl lg:text-5xl font-condensed font-bold uppercase tracking-wide text-trim-purple mt-1 mb-8">
              Read the transcript
            </h2>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="transcript-prose" v-html="transcriptHtml"></div>
          </div>
        </template>

        <!-- Footer back-link -->
        <div class="w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-0 py-8 flex flex-col min-[860px]:flex-row items-center justify-between gap-4">
          <NuxtLink
            :to="backHref"
            class="inline-flex items-center gap-1.5 text-sm font-condensed font-bold uppercase tracking-wider text-trim-teal hover:opacity-80 transition cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M2 12 L10 5 L10 9 L22 9 L22 15 L10 15 L10 19 Z" /></svg>
            {{ backLabel }}
          </NuxtLink>
          <p class="text-xs font-roboto text-neutral-400 text-center">
            © {{ new Date().getFullYear() }} Claudius van Wyk. All rights reserved.
          </p>
        </div>
      </template>

      <!-- Unknown slug -->
      <template v-else>
        <div class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md px-4 min-[860px]:px-8 md:px-12 py-14 text-center">
          <h2 class="text-3xl font-condensed font-bold uppercase tracking-wide text-trim-purple">We couldn't find that speaker</h2>
          <p class="text-lg font-roboto font-normal text-neutral-600 mt-3">
            The talk you're looking for may have moved.
          </p>
          <NuxtLink
            to="/phase-1#programme"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-trim-purple text-white text-base font-condensed font-bold uppercase tracking-wider hover:bg-trim-purple/90 transition mt-6"
          >
            View the Phase One programme
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import { findSpeakerBySlug, daysP2 } from '~/data/speakers'
import { useRecordingsAvailability } from '~/composables/useRecordingsAvailability'

// Raw transcript markdown files, keyed by path — bundled at build time.
const transcriptFiles = import.meta.glob('~/data/transcripts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const route = useRoute()
const config = useRuntimeConfig().public
const siteUrl = config.siteUrl as string
const slug = route.params.slug as string

const result = findSpeakerBySlug(slug)
const speaker = result?.event
const day = result?.day

const isPhase2 = day ? daysP2.includes(day) : false
const phaseLabel = isPhase2 ? 'Phase Two' : 'Phase One'
const backHref = isPhase2 ? '/#programme' : '/phase-1#programme'
const backLabel = isPhase2 ? 'Back to the Phase Two programme' : 'Back to the Phase One programme'
const watchHeading = speaker?.recording ? 'Watch the recording' : 'Coming up'

const { availabilityWord } = useRecordingsAvailability()

// Render the transcript markdown (if this speaker has one) to HTML.
const transcriptHtml = (() => {
  if (!speaker?.recording?.hasTranscript) return ''
  const entry = Object.entries(transcriptFiles).find(([path]) => path.endsWith(`/${slug}.md`))
  if (!entry) return ''
  return marked.parse(entry[1], { async: false }) as string
})()

const pageTitle = speaker
  ? `${speaker.speaker} — ${speaker.title} | Holos Earth Academy`
  : 'Speaker | Holos Earth Academy'

const pageDescription = speaker
  ? `Watch ${speaker.speaker}'s talk "${speaker.title}" and read the full transcript. Recorded ${day?.label} at the Centenary Festival of Holism & Evolution.`
  : 'Speaker at the Centenary Festival of Holism & Evolution, 20–24 May 2026.'

const ogImage = speaker
  ? `${siteUrl}${speaker.image}`
  : `${siteUrl}/images/opengraph.png`

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogImage,
  ogType: 'profile',
  ogUrl: `${siteUrl}/speaker/${slug}`,
  ogSiteName: 'Holos Earth Academy',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: ogImage,
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/speaker/${slug}` }],
})
</script>

<style scoped>
/* Transcript typography — mirrors the site's font + trim-colour system.
   Targets the v-html output, so :deep() is required. */
.transcript-prose :deep(h2) {
  font-family: var(--font-condensed);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #A27CB8; /* trim-purple */
  font-size: 1.875rem;
  line-height: 1.15;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}
.transcript-prose :deep(h2:first-child) {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
}
.transcript-prose :deep(h3) {
  font-family: var(--font-condensed);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #404040; /* neutral-700 */
  font-size: 1.5rem;
  line-height: 1.2;
  margin-top: 2.5rem;
}
.transcript-prose :deep(h4) {
  font-family: var(--font-condensed);
  font-weight: 700;
  color: #6B4D7D; /* trim-purple-dark */
  font-size: 1.25rem;
  line-height: 1.25;
  margin-top: 2rem;
}
.transcript-prose :deep(p) {
  font-family: var(--font-roboto);
  font-weight: 400;
  color: #525252; /* neutral-600 */
  font-size: 1.0625rem;
  line-height: 1.8;
  margin-top: 1.1rem;
}
@media (min-width: 1024px) {
  .transcript-prose :deep(p) {
    font-size: 1.125rem;
  }
}
/* Speaker names (the only <strong> in the transcript body) */
.transcript-prose :deep(strong) {
  font-weight: 700;
  color: #6B4D7D; /* trim-purple-dark */
}
.transcript-prose :deep(em) {
  font-style: italic;
  color: #404040; /* neutral-700 */
}
.transcript-prose :deep(hr) {
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  margin: 2rem 0;
}
</style>
