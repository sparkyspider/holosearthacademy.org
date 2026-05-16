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
        <WelcomeBackCard />
        <IntroCard />
        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
        <RegistrationCta />
        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
        <ProgrammeCard />
        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
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
    window.history.replaceState({}, '', '/phase-2')
  }
})

const config = useRuntimeConfig().public
const siteUrl = config.siteUrl as string
const pageUrl = `${siteUrl}/phase-2`

const title = 'Centenary Festival of Holism & Evolution | Holos Earth Academy'
const description = 'A free online global dialogue on the meaning and application of holism. 20–24 May 2026. Seven speakers across five days exploring science, spirituality, ethics and the legacy of Jan Smuts.'

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
