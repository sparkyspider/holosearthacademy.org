<template>
  <div class="min-h-[100dvh] bg-bg-default max-w-[100vw] overflow-x-hidden">
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
      <div class="flex-1 py-0 min-[860px]:py-16 px-0 min-[860px]:px-8 flex flex-col items-center gap-0 min-[860px]:gap-10">
        <IntroCard />
        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
        <RegistrationCta />
        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
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
