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
        <IntroCardAlliance />
        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
        <AllianceCta />
      </div>
    </div>

    <JoinAllianceModal :open="isOpen" @close="handleClose" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'

const { isOpen, openModal, closeModal } = useAllianceModal()

const config = useRuntimeConfig().public
const siteUrl = config.siteUrl as string

const title = 'Join the Holos Earth Alliance | Holos Earth Academy'
const description = 'Become a founding member of the Holos Earth Alliance — a living continuation of the inquiry initiated by Jan Smuts.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: `${siteUrl}/images/opengraph.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'website',
  ogUrl: `${siteUrl}/join`,
  ogSiteName: 'Holos Earth Academy',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${siteUrl}/images/opengraph.png`,
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/join` }],
})

onMounted(() => {
  openModal()
})

function handleClose() {
  closeModal()
  if (typeof window !== 'undefined') {
    window.history.replaceState({}, '', '/alliance')
  }
}

watch(isOpen, (val) => {
  if (typeof window === 'undefined') return
  if (!val) window.history.replaceState({}, '', '/alliance')
})
</script>
