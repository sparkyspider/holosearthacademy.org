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
        class="fixed inset-0 z-[100] flex items-start justify-center px-4 py-6 overflow-y-auto"
        @click="$emit('close')"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/40"></div>

        <!-- Modal -->
        <div
          class="relative z-10 drop-shadow-[0_20px_60px_rgba(0,0,0,0.3)] my-auto w-full max-w-4xl"
          @click.stop
        >
          <div class="bg-white rounded-2xl overflow-hidden relative">
            <!-- Close button -->
            <button
              @click="$emit('close')"
              class="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition z-30 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div class="flex flex-col lg:flex-row">

              <!-- Left: Form + Image -->
              <div class="flex-1 flex flex-col">
                <div class="px-6 md:px-10 pt-10 pb-8">
                  <h2 class="text-3xl font-condensed font-bold uppercase tracking-wide text-trim-purple mb-1">
                    Become a Founding Member
                  </h2>
                  <p class="text-base font-roboto font-light text-neutral-500 mb-7 leading-relaxed">
                    Join the <span class="font-bold text-trim-purple">Holos Earth Alliance</span> and help shape its early life.
                    Name and email are all that's required.
                  </p>

                  <form @submit.prevent="handleSubmit" novalidate>

                    <!-- Name -->
                    <div class="mb-4">
                      <label class="block text-sm font-condensed font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                        Your Name <span class="text-trim-purple">*</span>
                      </label>
                      <input
                        v-model="form.name"
                        type="text"
                        placeholder="e.g. Jane Smith"
                        :class="[
                          'w-full px-4 py-2.5 rounded-lg border text-base font-roboto text-neutral-700 placeholder:text-neutral-300 outline-none transition focus:ring-2 focus:ring-trim-purple/30 focus:border-trim-purple',
                          errors.name ? 'border-trim-purple bg-trim-purple/5' : 'border-neutral-200 bg-white',
                        ]"
                        @blur="touchField('name')"
                      />
                      <p v-if="errors.name" class="mt-1 text-sm font-roboto text-trim-purple">{{ errors.name }}</p>
                    </div>

                    <!-- Email -->
                    <div class="mb-4">
                      <label class="block text-sm font-condensed font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                        Your Email <span class="text-trim-purple">*</span>
                      </label>
                      <input
                        v-model="form.email"
                        type="email"
                        placeholder="e.g. jane@example.com"
                        :class="[
                          'w-full px-4 py-2.5 rounded-lg border text-base font-roboto text-neutral-700 placeholder:text-neutral-300 outline-none transition focus:ring-2 focus:ring-trim-purple/30 focus:border-trim-purple',
                          errors.email ? 'border-trim-purple bg-trim-purple/5' : 'border-neutral-200 bg-white',
                        ]"
                        @blur="touchField('email')"
                      />
                      <p v-if="errors.email" class="mt-1 text-sm font-roboto text-trim-purple">{{ errors.email }}</p>
                    </div>

                    <!-- Profession -->
                    <div class="mb-4">
                      <label class="block text-sm font-condensed font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                        Your Profession <span class="text-neutral-400 font-normal normal-case tracking-normal">(optional)</span>
                      </label>
                      <input
                        v-model="form.profession"
                        type="text"
                        placeholder="e.g. educator, scientist, designer, healer…"
                        class="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-white text-base font-roboto text-neutral-700 placeholder:text-neutral-300 outline-none transition focus:ring-2 focus:ring-trim-purple/30 focus:border-trim-purple"
                      />
                    </div>

                    <!-- Interests -->
                    <div class="mb-4">
                      <label class="block text-sm font-condensed font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                        What draws you to holism? <span class="text-neutral-400 font-normal normal-case tracking-normal">(optional)</span>
                      </label>
                      <textarea
                        v-model="form.drawsToHolism"
                        rows="3"
                        placeholder="e.g. science, spirituality, ecology, education, governance, lived practice…"
                        class="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-white text-base font-roboto text-neutral-700 placeholder:text-neutral-300 outline-none transition focus:ring-2 focus:ring-trim-purple/30 focus:border-trim-purple resize-none"
                      ></textarea>
                    </div>

                    <!-- How did you hear -->
                    <div class="mb-7">
                      <label class="block text-sm font-condensed font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                        How did you hear about us? <span class="text-neutral-400 font-normal normal-case tracking-normal">(optional)</span>
                      </label>
                      <input
                        v-model="form.howHeard"
                        type="text"
                        placeholder="e.g. from the festival, a friend, social media…"
                        class="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-white text-base font-roboto text-neutral-700 placeholder:text-neutral-300 outline-none transition focus:ring-2 focus:ring-trim-purple/30 focus:border-trim-purple"
                      />
                    </div>

                    <!-- Submit -->
                    <button
                      type="submit"
                      :disabled="isSubmitting"
                      :class="[
                        'w-full py-3 px-6 rounded-xl font-condensed font-bold uppercase tracking-wider text-lg transition cursor-pointer',
                        isSubmitted  ? 'bg-trim-green text-white'                          :
                        errorState   ? 'bg-red-700 text-white'                             :
                        isSubmitting ? 'bg-trim-purple/50 text-white/70 cursor-not-allowed' :
                                       'bg-trim-purple text-white hover:bg-trim-purple-dark',
                      ]"
                    >
                      {{ isSubmitted ? 'Welcome to the Alliance ✓' : errorState ? 'Something went wrong' : isSubmitting ? 'Joining…' : 'Become a Founding Member' }}
                    </button>

                  </form>
                </div>

                <!-- Color bar + Table Mountain -->
                <div class="mt-auto hidden lg:block">
                  <div
                    class="h-2 w-full"
                    style="background: repeating-linear-gradient(to right, #DDC66E 0 60px, #6EB189 60px 120px, #62BDB1 120px 180px, #7CA5DD 180px 240px, #A27CB8 240px 300px)"
                  />
                  <img src="/images/table-mountain.jpeg" alt="Table Mountain, Cape Town" class="w-full aspect-[1600/449] object-cover object-bottom" />
                </div>
              </div>

              <!-- Right: sidebar schplurb -->
              <div class="lg:w-[380px] bg-bg-default px-6 md:px-10 pt-8 lg:pt-10 pb-10 flex flex-col gap-6">

                <div>
                  <p class="text-xs font-condensed font-bold uppercase tracking-[0.3em] text-neutral-400 mb-1">Why Join</p>
                  <h3 class="text-2xl font-condensed font-bold uppercase tracking-wide text-neutral-700">
                    Continue the Inquiry
                  </h3>
                  <div class="h-0.5 w-12 rounded-full bg-trim-purple/40 mt-3"></div>
                </div>

                <p class="text-base font-roboto font-light text-neutral-600 leading-relaxed">
                  As a Founding Member you join a <span class="font-bold text-trim-teal">growing field</span> of people
                  exploring what holism means in this moment &mdash; for our planet, our institutions, and ourselves.
                </p>

                <div class="flex flex-col gap-1.5">
                  <div class="flex items-center gap-2 mb-0.5">
                    <div class="w-2.5 h-2.5 rounded-full bg-trim-purple shrink-0"></div>
                    <span class="text-sm font-condensed font-bold uppercase tracking-wider text-trim-purple">Future Dialogues &amp; Recordings</span>
                  </div>
                  <p class="text-base font-roboto font-light text-neutral-600 leading-relaxed pl-[18px] border-l-2 border-trim-purple/30">
                    You will be invited to future dialogues and gain access to recordings as they become available.
                  </p>
                </div>

                <div class="flex flex-col gap-1.5">
                  <div class="flex items-center gap-2 mb-0.5">
                    <div class="w-2.5 h-2.5 rounded-full bg-trim-blue shrink-0"></div>
                    <span class="text-sm font-condensed font-bold uppercase tracking-wider text-trim-blue">Working Groups</span>
                  </div>
                  <p class="text-base font-roboto font-light text-neutral-600 leading-relaxed pl-[18px] border-l-2 border-trim-blue/30">
                    Help shape the <span class="font-bold text-trim-blue">working groups</span> that emerge from this gathering &mdash; bringing holistic thinking into your own field.
                  </p>
                </div>

                <div class="flex flex-col gap-1.5">
                  <div class="flex items-center gap-2 mb-0.5">
                    <div class="w-2.5 h-2.5 rounded-full bg-trim-green shrink-0"></div>
                    <span class="text-sm font-condensed font-bold uppercase tracking-wider text-trim-green">An Emerging Community</span>
                  </div>
                  <p class="text-base font-roboto font-light text-neutral-600 leading-relaxed pl-[18px] border-l-2 border-trim-green/30">
                    We launch with curiosity, not with answers.
                    <span class="font-bold text-trim-green">Your perspective matters</span>.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const { track } = useAnalytics()
const { markJoined } = useAllianceModal()
const { attendee, setAttendee } = useAttendee()

const form = reactive({
  name: '',
  email: '',
  profession: '',
  drawsToHolism: '',
  howHeard: '',
})

watch([() => props.open, attendee], ([isOpen, who]) => {
  if (isOpen && who) {
    if (!form.name) form.name = who.name
    if (!form.email) form.email = who.email
  }
}, { immediate: true })

const touched = reactive({ name: false, email: false })
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errorState = ref(false)

function touchField(field: 'name' | 'email') {
  touched[field] = true
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const errors = computed(() => {
  const e: Record<string, string> = {}
  if (touched.name && !form.name.trim()) e.name = 'Name is required.'
  if (touched.email) {
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!EMAIL_RE.test(form.email.trim())) e.email = 'Please enter a valid email address.'
  }
  return e
})

async function handleSubmit() {
  touched.name = true
  touched.email = true
  if (errors.value.name || errors.value.email) return

  isSubmitting.value = true
  errorState.value = false

  try {
    const res = await fetch('https://576l7bs7a37yqrkc55h35jx4hu0wlftm.lambda-url.eu-west-1.on.aws/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'alliance_join',
        name: form.name.trim(),
        email: form.email.trim(),
        profession: form.profession.trim(),
        draws_to_holism: form.drawsToHolism.trim(),
        how_heard: form.howHeard.trim(),
        source: 'holosearthacademy.org-alliance',
        attendee_id: attendee.value?.id,
        happiness: generateHappiness(),
      }),
    })

    if (!res.ok) throw new Error(await res.text())
    const body = await res.json() as { attendee_id?: string; name?: string; email?: string }

    if (body.attendee_id && body.email) {
      setAttendee({
        id: body.attendee_id,
        name: body.name || form.name.trim(),
        email: body.email,
        phases: attendee.value?.phases ?? [],
        isAllianceMember: true,
      })
    }

    isSubmitted.value = true
    markJoined()
    setTimeout(() => emit('close'), 3000)
    track('alliance_join_submitted', {
      profession: form.profession.trim(),
      how_heard: form.howHeard.trim(),
    })
    setTimeout(() => { isSubmitted.value = false }, 4000)
  } catch (err) {
    console.error('Alliance join failed:', err)
    errorState.value = true
    setTimeout(() => { errorState.value = false }, 4000)
  } finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.profession = ''
  form.drawsToHolism = ''
  form.howHeard = ''
  touched.name = false
  touched.email = false
  isSubmitted.value = false
  errorState.value = false
}

watch(() => props.open, (isOpen) => {
  if (typeof document === 'undefined') return
  const val = isOpen ? 'hidden' : ''
  document.documentElement.style.overflow = val
  document.body.style.overflow = val
  if (!isOpen) resetForm()
})
</script>
