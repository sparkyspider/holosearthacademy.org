<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-start justify-center px-3 sm:px-4 py-6 overflow-y-auto"
        data-testid="book-chooser"
        @click="close('backdrop')"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-book-navy/55 backdrop-blur-[2px]" aria-hidden="true"></div>

        <!-- Dialog -->
        <div
          ref="panel"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="headingId"
          tabindex="-1"
          class="relative z-10 my-auto w-full max-w-3xl rounded-2xl bg-book-ivory border border-book-gold/60 shadow-[0_24px_80px_rgba(7,26,50,0.35)] focus:outline-none"
          @click.stop
        >
          <!-- Close -->
          <button
            type="button"
            aria-label="Close"
            class="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-book-navy/50 hover:text-book-navy hover:bg-book-parchment transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-book-gold"
            data-testid="book-chooser-close"
            @click="close('button')"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" class="w-4.5 h-4.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="px-4 sm:px-10 pt-7 sm:pt-10 pb-6 sm:pb-9">
            <!-- Heading -->
            <div class="flex flex-col items-center text-center">
              <img
                src="/images/email/what-is-looking/swallow.png"
                alt=""
                width="250"
                height="231"
                class="w-11 sm:w-16 h-auto"
              />
              <p class="mt-2 sm:mt-3 font-cinzel font-semibold uppercase text-[13px] tracking-[0.22em] text-book-navy">
                What Is Looking
                <span class="font-playfair italic font-bold normal-case tracking-normal text-[15px] text-book-amber ml-1">Remembrance</span>
              </p>
              <h2
                :id="headingId"
                class="mt-2 sm:mt-3 font-playfair font-bold text-[22px] sm:text-[30px] leading-tight text-book-navy max-w-[22ch] sm:max-w-none"
              >{{ question }}</h2>
              <img
                src="/images/email/what-is-looking/divider.png"
                alt=""
                width="175"
                height="13"
                class="mt-3 sm:mt-4 w-[130px] sm:w-[150px] h-auto"
              />
            </div>

            <!-- Stores (rendered from app/data/book-marketplaces.json) -->
            <ul class="mt-5 sm:mt-7 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              <li v-for="store in stores" :key="store.key" class="max-sm:[&:last-child:nth-child(odd)]:col-span-2 sm:[&:last-child:nth-child(3n+1)]:col-span-3">
                <a
                  :href="store.url"
                  target="_blank"
                  rel="noopener"
                  :data-store="store.key"
                  :data-format="store.format"
                  class="group h-full flex items-center justify-between gap-2 rounded-xl bg-white/80 border border-book-gold/45 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-white hover:border-book-gold hover:shadow-[0_6px_20px_rgba(251,162,3,0.18)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-book-gold focus-visible:border-book-gold"
                  @click="onStoreClick(store)"
                >
                  <span class="min-w-0">
                    <span class="block font-baskerville text-[14px] sm:text-[15px] leading-snug text-book-navy">{{ store.country }}</span>
                    <span class="block font-baskerville text-[11px] sm:text-[12px] leading-snug text-book-blue/70 mt-0.5">{{ store.domain }}</span>
                  </span>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                       class="hidden sm:block w-3.5 h-3.5 shrink-0 text-book-gold transition-transform duration-200 group-hover:translate-x-0.5">
                    <path d="M22 12 L14 5 L14 9 L2 9 L2 15 L14 15 L14 19 Z" />
                  </svg>
                </a>
              </li>
            </ul>

            <p class="mt-5 sm:mt-6 text-center font-baskerville text-[13px] text-book-navy/80">
              Available in Paperback or Kindle
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { bookStores, type BookStoreLink } from '~/data/book-stores'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [method: 'button' | 'escape' | 'backdrop'] }>()

// Working text, awaiting approval.
const question = 'Where is your Amazon account registered?'

const stores = bookStores
const headingId = 'book-chooser-heading'
const panel = ref<HTMLElement | null>(null)
const { track } = useBookAnalytics()

let returnFocusTo: HTMLElement | null = null

function close(method: 'button' | 'escape' | 'backdrop') {
  emit('close', method)
}

function onStoreClick(store: BookStoreLink) {
  track('book_store_click', {
    store_key: store.key,
    store_country: store.country,
    format: store.format,
    store_domain: store.domain,
  })
}

function focusables(): HTMLElement[] {
  if (!panel.value) return []
  return Array.from(panel.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault()
    close('escape')
    return
  }
  if (e.key !== 'Tab') return
  const items = focusables()
  if (!items.length) return
  const first = items[0]!
  const last = items[items.length - 1]!
  const active = document.activeElement
  if (!panel.value?.contains(active)) {
    e.preventDefault()
    ;(e.shiftKey ? last : first).focus()
  } else if (e.shiftKey && (active === first || active === panel.value)) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && active === last) {
    e.preventDefault()
    first.focus()
  }
}

function lockScroll(lock: boolean) {
  if (typeof document === 'undefined') return
  document.documentElement.style.overflow = lock ? 'hidden' : ''
}

watch(() => props.open, async (isOpen) => {
  if (typeof window === 'undefined') return
  if (isOpen) {
    returnFocusTo = document.activeElement instanceof HTMLElement && document.activeElement !== document.body
      ? document.activeElement
      : null
    lockScroll(true)
    document.addEventListener('keydown', onKeydown)
    await nextTick()
    panel.value?.focus()
  } else {
    lockScroll(false)
    document.removeEventListener('keydown', onKeydown)
    returnFocusTo?.focus?.()
    returnFocusTo = null
  }
}, { immediate: true })

onBeforeUnmount(() => {
  lockScroll(false)
  if (typeof document !== 'undefined') document.removeEventListener('keydown', onKeydown)
})
</script>
