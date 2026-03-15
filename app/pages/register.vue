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

    <!-- Page body -->
    <div class="flex">
      <div class="flex-1 py-0 min-[860px]:py-16 px-0 min-[860px]:px-8 flex flex-col items-center gap-0 min-[860px]:gap-10">
        <IntroCard />
        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
        <RegistrationCta />
        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
        <ProgrammeCard />
        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
        <AboutFestivalCard />
      </div>
    </div>
    <RegistrationModal :open="isOpen" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'

const { isOpen, openModal, closeModal } = useRegistrationModal()
const config = useRuntimeConfig().public
const siteUrl = config.siteUrl as string

const title = 'Register | Centenary Festival of Holism & Evolution | Holos Earth Academy'
const description = 'Register to join the Centenary Festival of Holism & Evolution — a free online global dialogue on holism. 20–24 May 2026.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: `${siteUrl}/opengraph.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'website',
  ogUrl: `${siteUrl}/register`,
  ogSiteName: 'Holos Earth Academy',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${siteUrl}/opengraph.png`,
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/register` }],
})

onMounted(() => {
  openModal()
})

// When modal is closed from this route, restore URL to home
watch(isOpen, (val) => {
  if (typeof window === 'undefined') return
  if (!val) window.history.replaceState({}, '', '/')
})
</script>
