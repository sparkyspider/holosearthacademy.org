<template>
  <div class="min-h-[100dvh] bg-bg-default max-w-[100vw] overflow-x-hidden">
    <!-- ───────────── Hero: the book on Deep Navy ───────────── -->
    <section class="relative overflow-hidden bg-book-navy">
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_58%,rgba(252,170,6,0.20),transparent_52%),radial-gradient(ellipse_at_92%_0%,rgba(8,67,123,0.85),transparent_62%),radial-gradient(ellipse_at_0%_100%,rgba(8,67,123,0.55),transparent_55%)]"
        aria-hidden="true"
      ></div>
      <div
        class="relative w-full max-w-screen-xl mx-auto px-6 min-[860px]:px-12 pt-10 pb-12 min-[860px]:py-16 flex flex-col min-[860px]:flex-row items-center justify-center gap-6 min-[860px]:gap-12 lg:gap-14"
      >
        <picture class="shrink-0">
          <source
            type="image/webp"
            srcset="/images/book/what-is-looking-book-560.webp 559w, /images/book/what-is-looking-book-1000.webp 1000w"
            sizes="(min-width: 1024px) 410px, (min-width: 860px) 350px, 250px"
          />
          <img
            src="/images/book/what-is-looking-book-560.png"
            width="559"
            height="688"
            alt="What Is Looking, Remembrance, by Claudius van Wyk"
            class="w-[250px] min-[860px]:w-[350px] lg:w-[410px] h-auto"
          />
        </picture>

        <div class="flex flex-col items-center min-[860px]:items-start text-center min-[860px]:text-left">
          <h1>
            <span class="block font-cinzel font-semibold uppercase text-book-ivory text-[2rem] sm:text-5xl xl:text-[3.2rem] xl:whitespace-nowrap tracking-[0.14em] leading-[1.15]">
              What Is Looking
            </span>
            <span class="block mt-1 lg:mt-2 font-playfair italic font-bold text-book-gold text-[2rem] sm:text-[2.4rem] lg:text-[2.9rem] leading-tight">
              Remembrance
            </span>
          </h1>
          <img
            src="/images/email/what-is-looking/divider.png"
            alt=""
            width="175"
            height="13"
            class="mt-5 w-[175px] h-auto"
          />
          <p class="mt-4 font-baskerville text-book-ivory/90 text-lg lg:text-xl tracking-wide">
            Claudius van Wyk
          </p>

          <button
            type="button"
            class="mt-8 inline-flex items-center gap-4 pl-7 pr-3 py-2.5 rounded-xl bg-book-ivory text-book-navy font-cinzel font-semibold uppercase text-[15px] lg:text-[17px] tracking-[0.12em] shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:bg-white hover:-translate-y-px transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-book-gold focus-visible:ring-offset-2 focus-visible:ring-offset-book-navy"
            data-testid="book-order-hero"
            @click="openChooser('hero_button', $event)"
          >
            Order now on Amazon
            <img src="/images/email/what-is-looking/chevron.png" alt="" width="32" height="33" class="w-8 h-8" />
          </button>
          <p class="mt-4 font-baskerville text-[15px] text-book-ivory/85">
            Available in Paperback or Kindle
          </p>
          <p class="mt-1.5 font-baskerville text-[13px] text-book-ivory/60 flex flex-wrap justify-center min-[860px]:justify-start gap-x-3">
            <span>Paperback · 158 pages</span>
            <span aria-hidden="true" class="text-book-gold/70">|</span>
            <span>Kindle · 126 pages</span>
          </p>
        </div>
      </div>
    </section>
    <ColorBar />

    <!-- ───────────── Body ───────────── -->
    <div class="flex">
      <div class="flex-1 py-0 min-[860px]:py-16 px-0 min-[860px]:px-8 flex flex-col items-center gap-0 min-[860px]:gap-10">
        <div class="w-full flex flex-col items-center gap-0">
          <PageTabs current="Book" />

          <!-- Headline + description -->
          <div
            class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:!rounded-t-none min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-10 min-[860px]:py-14 flex flex-col lg:flex-row items-center gap-8 lg:gap-14"
          >
            <h2 class="flex-1 min-w-0 text-center lg:text-left font-playfair font-bold text-book-navy text-[1.75rem] sm:text-[2.1rem] lg:text-[2.15rem] xl:text-[2.5rem] leading-[1.3]">
              <span class="lg:block">What if reading a book could</span>{{ ' ' }}
              <span class="lg:block italic text-book-amber">change the way you see the world,</span>{{ ' ' }}
              <span class="lg:block">and your place in it?</span>
            </h2>
            <div class="flex lg:w-[440px] shrink-0">
              <div class="w-1.5 shrink-0 rounded-full bg-[linear-gradient(to_bottom,#FCAA06,#FBA203,#08437B)]"></div>
              <p class="pl-6 min-[860px]:pl-8 font-baskerville text-lg lg:text-xl leading-relaxed text-book-navy">
                WHAT IS LOOKING <i>Remembrance</i> is a personal, philosophical, and spiritual invitation, carried by stories. It is a book to be read slowly, and one that will stay with you.
              </p>
            </div>
          </div>
        </div>

        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>

        <!-- Reader quotes -->
        <div
          class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-10 min-[860px]:py-14"
        >
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            <figure
              v-for="q in quotes"
              :key="q.name"
              class="flex flex-col"
            >
              <blockquote class="flex gap-3 flex-1">
                <img src="/images/email/what-is-looking/quote-open.png" alt="" width="18" height="13" class="w-[22px] h-auto shrink-0 mt-1.5 self-start" />
                <p class="font-baskerville italic text-book-blue text-[17px] lg:text-[18px] leading-[1.7]">
                  {{ q.text }}<img src="/images/email/what-is-looking/quote-close.png" alt="" width="18" height="14" class="inline-block w-[20px] h-auto ml-1.5 -mt-2 align-middle" />
                </p>
              </blockquote>
              <figcaption class="mt-5 pl-[34px] flex flex-col items-center">
                <img src="/images/email/what-is-looking/divider.png" alt="" width="175" height="13" class="w-[120px] h-auto" />
                <span class="mt-2.5 font-baskerville text-[15px] text-book-navy">{{ q.name }}</span>
              </figcaption>
            </figure>
          </div>
        </div>

        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>

        <!-- Order -->
        <div
          class="min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] bg-book-ivory min-[860px]:border min-[860px]:border-book-gold/50 w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-10 min-[860px]:py-12 flex flex-col items-center text-center"
        >
          <img src="/images/email/what-is-looking/swallow.png" alt="" width="250" height="231" class="w-16 h-auto" />
          <p class="mt-3 font-cinzel font-semibold uppercase text-book-navy text-xl lg:text-2xl tracking-[0.14em]">
            What Is Looking
          </p>
          <p class="font-playfair italic font-bold text-book-amber text-xl lg:text-2xl">Remembrance</p>
          <button
            type="button"
            class="mt-7 inline-flex items-center gap-4 pl-7 pr-3 py-2.5 rounded-xl bg-[#031B43] text-book-ivory font-cinzel font-medium uppercase text-[15px] lg:text-[17px] tracking-[0.12em] shadow-[0_10px_30px_rgba(7,26,50,0.22)] hover:bg-book-navy hover:-translate-y-px transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-book-gold focus-visible:ring-offset-2 focus-visible:ring-offset-book-ivory"
            data-testid="book-order-footer"
            @click="openChooser('order_button', $event)"
          >
            Order now on Amazon
            <img src="/images/email/what-is-looking/chevron.png" alt="" width="32" height="33" class="w-8 h-8" />
          </button>
          <p class="mt-4 font-baskerville text-[15px] text-book-navy">
            Available in Paperback or Kindle
          </p>
          <p class="mt-1.5 font-baskerville text-[13px] text-book-navy/65 flex flex-wrap justify-center gap-x-3">
            <span>Paperback · 158 pages</span>
            <span aria-hidden="true" class="text-book-gold">|</span>
            <span>Kindle · 126 pages</span>
          </p>
        </div>

        <div class="w-full h-4 bg-neutral-200/60 min-[860px]:hidden"></div>
        <ClaudiusCard />
        <FooterCard />
        <p class="text-xs font-roboto text-neutral-400 text-center py-4">
          © {{ new Date().getFullYear() }} Claudius van Wyk. All rights reserved.
        </p>
      </div>
    </div>

    <BookStoreChooser :open="chooserOpen" @close="closeChooser" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { bookInfo } from '~/data/book-stores'

// /book/region is this same page with the store chooser open on arrival (the
// launch email's button lands there). The shared key keeps one page instance
// when the chooser closes and the address returns to /book/.
definePageMeta({
  alias: ['/book/region'],
  key: 'book',
})

// Reader quotes, word for word from the launch email (cohort A).
const quotes = [
  {
    text: 'My wholehearted thanks for sharing your exquisite book – it feels as if it has read me in a wonder-full and profound way.',
    name: 'Dr Jude Currivan',
  },
  {
    text: 'Several times the words stopped me and made me pause: on homesickness at the beginning, and later, the trapped bird in your hands before flying free. I was left wanting more to pursue.',
    name: 'Michael Stock',
  },
  {
    text: 'Never have I found a book that was so easy to read, profoundly enlightening, mind-stretching and magnetic. I see myself reading this one again and again.',
    name: 'Denise Brouder',
  },
]

const route = useRoute()
const router = useRouter()
const isRegion = computed(() => route.path.replace(/\/+$/, '') === '/book/region')

const { track } = useBookAnalytics()
const chooserOpen = ref(false)

function openChooser(trigger: 'landing' | 'hero_button' | 'order_button', _e?: Event) {
  chooserOpen.value = true
  track('book_chooser_open', { trigger })
}

function closeChooser(method: 'button' | 'escape' | 'backdrop') {
  chooserOpen.value = false
  track('book_chooser_close', { method })
  // Closing the chooser leaves the visitor on the book page itself. The router
  // sees /book/region as the same location as /book (it is an alias), so the
  // move needs `force`.
  if (isRegion.value) router.replace({ path: '/book/', force: true })
}

onMounted(() => {
  track('book_page_view', { book_page: isRegion.value ? 'book_region' : 'book' })
  if (isRegion.value) openChooser('landing')
})

// ───────────── SEO ─────────────
const config = useRuntimeConfig().public
const siteUrl = config.siteUrl as string
const pageUrl = `${siteUrl}/book/`

const title = 'What Is Looking: Remembrance | Claudius van Wyk | Holos Earth Academy'
const description = 'WHAT IS LOOKING Remembrance is a personal, philosophical, and spiritual invitation, carried by stories. It is a book to be read slowly, and one that will stay with you.'
const ogImage = `${siteUrl}/images/book/opengraph-book.jpg`

useSeoMeta({
  title,
  description,
  robots: () => (isRegion.value ? 'noindex, follow' : undefined),
  ogTitle: title,
  ogDescription: description,
  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'book',
  ogUrl: pageUrl,
  ogSiteName: 'Holos Earth Academy',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Book',
      '@id': `${pageUrl}#book`,
      name: `${bookInfo.title}: ${bookInfo.subtitle}`,
      alternativeHeadline: bookInfo.subtitle,
      author: { '@type': 'Person', name: bookInfo.author },
      url: pageUrl,
      image: ogImage,
      description,
      workExample: [
        {
          '@type': 'Book',
          bookFormat: 'https://schema.org/Paperback',
          isbn: bookInfo.paperback_isbn13,
          numberOfPages: 158,
          url: `https://www.amazon.com/dp/${bookInfo.paperback_asin}`,
        },
        {
          '@type': 'Book',
          bookFormat: 'https://schema.org/EBook',
          numberOfPages: 126,
          url: `https://www.amazon.com/dp/${bookInfo.kindle_asin}`,
        },
      ],
    }),
  }],
})
</script>
