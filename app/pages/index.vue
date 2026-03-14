<template>
  <div class="min-h-screen bg-bg-default">
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
        <!--
      <VerticalColorBar />
      -->
      <div class="flex-1 py-16 px-8 flex flex-col items-center gap-10">
        <IntroCard />
        <RegistrationCta />
        <ProgrammeCard />
        <AboutFestivalCard />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const config = useRuntimeConfig().public
const siteUrl = config.siteUrl as string

const title = 'Centenary Festival of Holism & Evolution | Holos Earth Academy'
const description = 'A free online global dialogue on the meaning and application of holism. 20–24 May 2026. Seven speakers across five days exploring science, spirituality, ethics and the legacy of Jan Smuts.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: `${siteUrl}/opengraph.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'website',
  ogUrl: siteUrl,
  ogSiteName: 'Holos Earth Academy',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${siteUrl}/opengraph.png`,
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
})
</script>
