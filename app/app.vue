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
// page is a bare card with no chrome, so it stays plain.
const route = useRoute()
const showBookBanner = computed(() => !route.path.startsWith('/unsubscribe'))
</script>
