<template>
  <Transition
    leave-active-class="transition-all duration-300 ease-in overflow-hidden"
    leave-from-class="opacity-100 max-h-24"
    leave-to-class="opacity-0 max-h-0"
  >
    <div
      v-if="!dismissed"
      class="relative w-full border-b border-book-gold/40 bg-book-ivory bg-[linear-gradient(90deg,#FCEFCB_0%,#FEF7E4_28%,#FEF7E4_72%,#FCEFCB_100%)]"
      role="region"
      aria-label="What Is Looking"
    >
      <NuxtLink
        to="/book"
        class="group flex items-center justify-start sm:justify-center gap-2 sm:gap-3.5 pl-2.5 pr-9 sm:px-14 py-2 min-h-[52px] sm:min-h-[46px] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-book-gold"
        @click="onBannerClick"
      >
        <img
          src="/images/email/what-is-looking/swallow.png"
          alt=""
          width="250"
          height="231"
          class="h-[26px] sm:h-7 w-auto shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
        <span class="flex flex-col sm:flex-row items-start sm:items-baseline gap-x-3 gap-y-0.5 min-w-0">
          <!-- Title and subtitle -->
          <span class="flex items-baseline gap-x-2.5 whitespace-nowrap">
            <span class="font-baskerville italic text-[clamp(10px,2.75vw,11.5px)] sm:text-[13px] text-book-amber">Book Release:</span>
            <span
              v-if="parts[0]"
              class="font-cinzel font-semibold uppercase text-[clamp(11px,3.1vw,12.5px)] sm:text-[13px] tracking-[0.2em] text-book-navy"
            >{{ parts[0] }}</span>
            <span
              v-if="parts[1]"
              class="font-playfair italic font-bold text-[clamp(14px,3.8vw,15.5px)] sm:text-[16px] leading-none text-book-amber"
            >{{ parts[1] }}</span>
          </span>
          <!-- Everything after the subtitle -->
          <span
            v-if="rest.length"
            class="flex flex-wrap items-baseline gap-x-1.5 sm:gap-x-2 font-baskerville text-[clamp(10px,2.75vw,11.5px)] sm:text-[13px] text-book-navy/80"
          >
            <span aria-hidden="true" class="hidden sm:inline text-book-gold">·</span>
            <template v-for="(part, i) in rest" :key="i">
              <span v-if="i > 0" aria-hidden="true" class="text-book-gold">·</span>
              <span
                :class="i === rest.length - 1
                  ? 'text-book-blue underline underline-offset-4 decoration-book-gold/50 group-hover:decoration-book-gold transition'
                  : ''"
              >{{ part }}</span>
            </template>
          </span>
        </span>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
             class="hidden sm:block w-3.5 h-3.5 shrink-0 text-book-gold transition-transform duration-300 group-hover:translate-x-1">
          <path d="M22 12 L14 5 L14 9 L2 9 L2 15 L14 15 L14 19 Z" />
        </svg>
      </NuxtLink>

      <button
        type="button"
        aria-label="Close"
        class="absolute right-0.5 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-book-navy/45 hover:text-book-navy hover:bg-book-parchment transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-book-gold"
        @click="dismiss"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { BOOK_BANNER_PARTS } from '~/data/book-banner'

// Dismissal lives in app memory only (no cookie, no storage): it holds while the
// visitor moves between pages in this tab, and the banner returns on a reload.
const dismissed = useState('bookBannerDismissed', () => false)

const parts = BOOK_BANNER_PARTS
const rest = parts.slice(2)

const route = useRoute()
const { track } = useBookAnalytics()

function onBannerClick() {
  track('book_banner_click', { page_path: route.path })
}

function dismiss() {
  track('book_banner_dismiss', { page_path: route.path })
  dismissed.value = true
}
</script>
