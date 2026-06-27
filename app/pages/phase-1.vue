<template>
  <div class="min-h-[100dvh] bg-bg-default max-w-[100vw] overflow-x-hidden">
    <!-- Hero image extends behind both banner and ticker -->
    <div class="relative">
      <img src="/images/space-option-1.png" alt="" class="absolute inset-0 w-full h-full object-cover object-center" />
      <div class="relative z-10">
        <HeroBanner />
        <div class="h-2 w-full bg-white/50"></div>
        <SpeakerTicker />
          <color-bar/>
      </div>
    </div>

    <!-- Page body with vertical colour bar -->
    <div class="flex">
        <!--
      <VerticalColorBar />
      -->
      <div class="flex-1 py-0 min-[860px]:py-16 px-0 min-[860px]:px-8 flex flex-col items-center gap-0 min-[860px]:gap-10">
        <div class="w-full flex flex-col items-center gap-0">
          <PageTabs current="P1" />
          <ProgrammeCard />
        </div>
        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
        <AlliancePromoCard />
        <AboutFestivalCard />
        <ClaudiusCard />
        <FooterCard />
        <p class="text-xs font-roboto text-neutral-400 text-center py-4">
          © {{ new Date().getFullYear() }} Claudius van Wyk. All rights reserved.
        </p>
      </div>
    </div>
    <RegistrationModal :open="isOpen" @close="closeModal" />
  </div>
</template>
<script setup lang="ts">
import { watch } from 'vue'

const { isOpen, closeModal } = useRegistrationModal()

// Sync URL with modal state — mirrors speaker modal pattern
watch(isOpen, (val) => {
  if (typeof window === 'undefined') return
  if (val) {
    window.history.replaceState({}, '', '/register')
  } else if (window.location.pathname === '/register') {
    window.history.replaceState({}, '', '/phase-1')
  }
})

const config = useRuntimeConfig().public
const siteUrl = config.siteUrl as string
const pageUrl = `${siteUrl}/phase-1`

const title = 'Phase One: Rediscovering Holism — Watch the Talks | Centenary Festival of Holism & Evolution | Holos Earth Academy'
const description = 'Phase One of the Centenary Festival of Holism & Evolution has concluded. Watch all eight sessions on the origins and meaning of holism on demand, each with a downloadable transcript — and register for Phase Two: Liminal Space, 10 June to 2 December 2026.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: `${siteUrl}/images/opengraph.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'website',
  ogUrl: pageUrl,
  ogSiteName: 'Holos Earth Academy',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${siteUrl}/images/opengraph.png`,
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
})
</script>
