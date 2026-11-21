<template>
  <BookBanner v-if="showBookBanner" />
  <NuxtPage />
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: { class: 'scroll-smooth overflow-x-hidden bg-bg-default' },
  bodyAttrs: { class: 'bg-bg-default' },
})

// The book banner sits above every page with site chrome. The unsubscribe
// page is a bare card with no chrome, so it stays plain. The book page
// (and its /book/region alias) is the thing the banner points to, so it is
// hidden there; route.path is known at prerender time, so the static HTML agrees.
const route = useRoute()
const showBookBanner = computed(() => {
  const path = route.path.replace(/\/+$/, '') || '/'
  return !path.startsWith('/unsubscribe') && path !== '/book' && path !== '/book/region'
})
</script>
