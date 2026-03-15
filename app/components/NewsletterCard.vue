<template>
  <div>
    <h3 class="text-2xl lg:text-3xl font-condensed font-bold uppercase tracking-wide text-trim-purple text-left mb-2">
      Sign Up for Event Alerts
    </h3>
    <p class="text-xl lg:text-2xl font-roboto font-normal text-neutral-500 mb-8 leading-relaxed max-w-2xl">
      Stay informed about the festival, upcoming events and new resources from Holos Earth Academy.
    </p>

    <form @submit.prevent="handleSubmit" novalidate>
      <div class="flex flex-col min-[860px]:flex-row min-[860px]:items-end gap-4">
        <!-- Name -->
        <div class="flex-1">
          <label class="block text-sm font-condensed font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
            Your Name <span class="text-trim-purple">*</span>
          </label>
          <input
            v-model="form.name"
            type="text"
            placeholder="e.g. Jane Smith"
            :class="[
              'w-full px-4 py-2.5 rounded-lg border text-base font-roboto text-neutral-700 placeholder:text-neutral-300 outline-none transition focus:ring-2 focus:ring-trim-purple/30 focus:border-trim-purple',
              submitted && errors.name ? 'border-trim-purple bg-trim-purple/5' : 'border-neutral-200 bg-white',
            ]"
          />
        </div>

        <!-- Email -->
        <div class="flex-1">
          <label class="block text-sm font-condensed font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
            Your Email <span class="text-trim-purple">*</span>
          </label>
          <input
            v-model="form.email"
            type="email"
            placeholder="e.g. jane@example.com"
            :class="[
              'w-full px-4 py-2.5 rounded-lg border text-base font-roboto text-neutral-700 placeholder:text-neutral-300 outline-none transition focus:ring-2 focus:ring-trim-purple/30 focus:border-trim-purple',
              submitted && errors.email ? 'border-trim-purple bg-trim-purple/5' : 'border-neutral-200 bg-white',
            ]"
          />
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="isSubmitting"
          :class="[
            'w-full min-[860px]:w-auto shrink-0 py-2.5 px-8 rounded-xl font-condensed font-bold uppercase tracking-wider text-lg transition cursor-pointer',
            isSubmitted  ? 'bg-trim-green text-white'          :
            errorState   ? 'bg-red-700 text-white'             :
            isSubmitting ? 'bg-trim-purple/50 text-white/70 cursor-not-allowed' :
                           'bg-trim-purple text-white hover:bg-trim-purple-dark',
          ]"
        >
          {{ isSubmitted ? 'Signed Up!' : errorState ? 'Something went wrong' : isSubmitting ? 'Signing Up…' : 'Sign Up' }}
        </button>
      </div>
      <p v-if="submitted && (errors.name || errors.email)" class="mt-2 text-sm font-roboto text-trim-purple">
        {{ errors.name && errors.email ? 'Name and email are required.' : errors.name || errors.email }}
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const { track } = useAnalytics()

const form = reactive({
  name: '',
  email: '',
  phase2: true,
  capeTown: true,
  hspTraining: true,
  bookRelease: true,
})

const submitted = ref(false)
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errorState = ref(false)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const errors = computed(() => {
  const e: Record<string, string> = {}
  if (!form.name.trim()) e.name = 'Name is required.'
  if (!form.email.trim()) e.email = 'Email is required.'
  else if (!EMAIL_RE.test(form.email.trim())) e.email = 'Please enter a valid email address.'
  return e
})

async function handleSubmit() {
  submitted.value = true
  if (errors.value.name || errors.value.email) return

  isSubmitting.value = true
  errorState.value = false

  try {
    const res = await fetch('https://576l7bs7a37yqrkc55h35jx4hu0wlftm.lambda-url.eu-west-1.on.aws/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        phase_2: form.phase2,
        cape_town: form.capeTown,
        hsp_training: form.hspTraining,
        book_release: form.bookRelease,
        source: 'holosearthacademy.org-newsletter',
        happiness: generateHappiness(),
      }),
    })

    if (!res.ok) throw new Error(await res.text())

    isSubmitted.value = true
    track('newsletter_submitted', {
      phase_2: form.phase2,
      cape_town: form.capeTown,
      hsp_training: form.hspTraining,
      book_release: form.bookRelease,
    })
    setTimeout(() => { isSubmitted.value = false }, 4000)
  } catch (err) {
    console.error('Newsletter signup failed:', err)
    errorState.value = true
    setTimeout(() => { errorState.value = false }, 4000)
  } finally {
    isSubmitting.value = false
  }
}
</script>
