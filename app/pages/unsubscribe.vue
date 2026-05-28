<template>
  <div class="min-h-[100dvh] bg-neutral-100 flex items-center justify-center px-4">
    <div class="bg-white rounded-2xl shadow-lg max-w-md w-full p-10 text-center">
      <h1 class="text-2xl font-condensed font-bold uppercase tracking-wide text-trim-purple mb-2">
        Unsubscribe
      </h1>

      <template v-if="!done">
        <p class="text-base font-roboto font-light text-neutral-600 mb-6 leading-relaxed">
          Unsubscribe <span class="font-bold text-neutral-800">{{ email }}</span> from Holos Earth Academy emails?
        </p>
        <p v-if="!email" class="text-sm text-red-600 mb-6">
          No email address provided. Please use the unsubscribe link from your email.
        </p>
        <button
          v-if="email"
          @click="handleUnsubscribe"
          :disabled="submitting"
          class="w-full py-3 px-6 rounded-lg text-white font-roboto font-bold text-base transition cursor-pointer"
          :class="submitting ? 'bg-trim-purple/50 cursor-not-allowed' : 'bg-trim-purple hover:bg-trim-purple-dark'"
        >
          {{ submitting ? 'Unsubscribing...' : 'Unsubscribe' }}
        </button>
      </template>

      <template v-else-if="success">
        <p class="text-base font-roboto text-neutral-600 mb-4 leading-relaxed">
          <span class="font-bold text-neutral-800">{{ email }}</span> has been unsubscribed.
        </p>
        <p class="text-sm font-roboto text-neutral-400">
          You will no longer receive emails from Holos Earth Academy.
        </p>
      </template>

      <template v-else>
        <p class="text-base font-roboto text-red-700 mb-4">
          Something went wrong. Please try again or contact
          <a href="mailto:claudiusvanwyk@gmail.com" class="underline">claudiusvanwyk@gmail.com</a>.
        </p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute()
const email = (route.query.email as string || '').trim()

const submitting = ref(false)
const done = ref(false)
const success = ref(false)

const LAMBDA_URL = 'https://576l7bs7a37yqrkc55h35jx4hu0wlftm.lambda-url.eu-west-1.on.aws/'

async function handleUnsubscribe() {
  submitting.value = true
  try {
    const res = await fetch(LAMBDA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'unsubscribe', email }),
    })
    success.value = res.ok
  } catch {
    success.value = false
  }
  done.value = true
  submitting.value = false
}

const config = useRuntimeConfig().public
const siteUrl = config.siteUrl as string

useSeoMeta({
  title: 'Unsubscribe | Holos Earth Academy',
  robots: 'noindex, nofollow',
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/unsubscribe` }],
})
</script>
