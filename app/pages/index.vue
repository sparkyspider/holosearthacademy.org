<template>
  <div class="min-h-[100dvh] bg-bg-default max-w-[100vw] overflow-x-hidden">
    <!-- Hero image extends behind both banner and ticker -->
    <div class="relative">
      <picture>
        <source
          type="image/webp"
          srcset="
            /images/phase-2-hero-1024.webp 1024w,
            /images/phase-2-hero-1600.webp 1600w,
            /images/phase-2-hero-2400.webp 2400w
          "
          sizes="100vw"
        />
        <img
          src="/images/phase-2-hero.jpg"
          alt=""
          class="absolute inset-0 w-full h-full object-cover object-center"
        />
      </picture>
      <div class="relative z-10">
        <HeroBannerPhase2 />
        <div class="h-2 w-full bg-white/50"></div>
        <SpeakerTickerPhase2 />
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
          <PageTabs current="P2" />
          <WelcomeBackCard class="min-[860px]:!rounded-t-none" />
        </div>
        <IntroCardPhase2 />
        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
        <PreviouslyCard />
        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
        <RegistrationCta />
        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
        <ProgrammeCardPhase2 />
        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
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
    <RegistrationModal :open="isOpen" :phase="2" @close="closeModal" />
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
    window.history.replaceState({}, '', '/')
  }
})

const config = useRuntimeConfig().public
const siteUrl = config.siteUrl as string

const title = 'Phase Two: Liminal Space | Centenary Festival of Holism & Evolution | Holos Earth Academy'
const description = 'Phase Two of the Centenary Festival of Holism & Evolution. A liminal space — 10 June to 2 December 2026 — for reflection, integration, and deepening the inquiry initiated in May.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: `${siteUrl}/images/opengraph-phase-2.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'website',
  ogUrl: siteUrl,
  ogSiteName: 'Holos Earth Academy',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${siteUrl}/images/opengraph-phase-2.png`,
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
})
</script>
