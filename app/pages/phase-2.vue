<template>
  <noscript>
    <p>This page has moved. <a href="/">Continue to Holos Earth Academy</a>.</p>
  </noscript>
</template>

<script setup lang="ts">
// Legacy /phase-2 URL. Phase 2 is now the site root.
// Meta-refresh for the prerendered static file; client-side replace as a faster fallback.
const config = useRuntimeConfig().public
const siteUrl = config.siteUrl as string

useHead({
  meta: [{ 'http-equiv': 'refresh', content: '0; url=/' }],
  link: [{ rel: 'canonical', href: siteUrl }],
})

useSeoMeta({
  robots: 'noindex',
  title: 'Redirecting… | Holos Earth Academy',
})

if (import.meta.client) {
  navigateTo('/', { replace: true })
}
</script>
