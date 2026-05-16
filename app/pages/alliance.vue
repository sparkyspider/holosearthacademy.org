<template>
  <div class="min-h-[100dvh] bg-bg-default max-w-[100vw] overflow-x-hidden">
    <!-- Hero image -->
    <div class="relative">
      <picture>
        <source
          type="image/webp"
          srcset="
            /images/alliance-hero-1024.webp 1024w,
            /images/alliance-hero-1600.webp 1600w,
            /images/alliance-hero-2400.webp 2400w
          "
          sizes="100vw"
        />
        <img
          src="/images/alliance-hero.jpg"
          alt=""
          class="absolute inset-0 w-full h-full object-cover object-[50%_20%]"
        />
      </picture>
      <div class="relative z-10">
        <HeroBannerAlliance />
      </div>
    </div>
    <color-bar />

    <!-- Page body -->
    <div class="flex">
      <div class="flex-1 py-0 min-[860px]:py-16 px-0 min-[860px]:px-8 flex flex-col items-center gap-0 min-[860px]:gap-10">
        <WelcomeBackCard />
        <IntroCardAlliance />
        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
        <AllianceBenefitsCard />
        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
        <AllianceCta />
        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
        <ClaudiusCard />
        <FooterCard />
        <p class="text-xs font-roboto text-neutral-400 text-center py-4">
          © {{ new Date().getFullYear() }} Claudius van Wyk. All rights reserved.
        </p>
      </div>
    </div>

    <JoinAllianceModal :open="isOpen" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'

const { isOpen, closeModal } = useAllianceModal()

watch(isOpen, (val) => {
  if (typeof window === 'undefined') return
  if (val) {
    window.history.replaceState({}, '', '/join')
  } else if (window.location.pathname === '/join') {
    window.history.replaceState({}, '', '/alliance')
  }
})

const config = useRuntimeConfig().public
const siteUrl = config.siteUrl as string
const pageUrl = `${siteUrl}/alliance`

const title = 'Holos Earth Alliance | Become a Founding Member | Holos Earth Academy'
const description = 'Join the Holos Earth Alliance — a living continuation of the inquiry initiated by Jan Smuts. Become a founding member and help shape an evolving network exploring holistic thought and practice for humanity and Earth.'

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
