<template>
  <div class="min-h-screen bg-bg-default max-w-[100vw] overflow-x-hidden">
    <!-- Hero image extends behind both banner and ticker -->
    <div class="relative">
      <img src="/space-option-1.png" alt="" class="absolute inset-0 w-full h-full object-cover object-center" />
      <div class="relative z-10">
        <HeroBanner />
        <div class="h-2 w-full bg-white/50"></div>
        <SpeakerTicker />
          <color-bar/>
      </div>
    </div>

    <!-- Page body with vertical colour bar -->
    <div class="flex">
      <div class="flex-1 py-10 md:py-16 px-4 sm:px-6 md:px-8 flex flex-col items-center gap-10">
        <IntroCard />
        <RegistrationCta />
        <ProgrammeCard />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { findSpeakerBySlug } from '~/data/speakers'

const route = useRoute()
const config = useRuntimeConfig().public
const siteUrl = config.siteUrl as string
const slug = route.params.slug as string

const result = findSpeakerBySlug(slug)
const speaker = result?.event
const day = result?.day

const pageTitle = speaker
  ? `${speaker.speaker} — ${speaker.title} | Holos Earth Academy`
  : 'Speaker | Holos Earth Academy'

const pageDescription = speaker
  ? `${speaker.description} Speaking ${day?.label} at the Centenary Festival of Holism & Evolution.`
  : 'Speaker at the Centenary Festival of Holism & Evolution, 20–24 May 2026.'

const ogImage = speaker
  ? `${siteUrl}${speaker.image}`
  : `${siteUrl}/opengraph.png`

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
