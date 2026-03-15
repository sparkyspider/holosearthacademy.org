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

              <!-- ── Left: Form ── -->
              <div class="flex-1 px-6 md:px-10 pt-10 pb-8">
                <h2 class="text-3xl font-condensed font-bold uppercase tracking-wide text-trim-purple mb-1">
                  Register for the Festival
                </h2>
                <p class="text-base font-roboto font-light text-neutral-500 mb-7 leading-relaxed">
                  Participation is via <span class="font-bold text-trim-teal">Zoom</span>.
                  Once registered, use the programme to add Zoom-linked events to your calendar.
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
                        errors.name ? 'border-red-400 bg-red-50' : 'border-neutral-200 bg-white',
                      ]"
                      @blur="touchField('name')"
                    />
                    <p v-if="errors.name" class="mt-1 text-sm font-roboto text-red-500">{{ errors.name }}</p>
                  </div>

                  <!-- Email -->
                  <div class="mb-7">
                    <label class="block text-sm font-condensed font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                      Your Email <span class="text-trim-purple">*</span>
                    </label>
                    <input
                      v-model="form.email"
                      type="email"
                      placeholder="e.g. jane@example.com"
                      :class="[
                        'w-full px-4 py-2.5 rounded-lg border text-base font-roboto text-neutral-700 placeholder:text-neutral-300 outline-none transition focus:ring-2 focus:ring-trim-purple/30 focus:border-trim-purple',
                        errors.email ? 'border-red-400 bg-red-50' : 'border-neutral-200 bg-white',
                      ]"
                      @blur="touchField('email')"
                    />
                    <p v-if="errors.email" class="mt-1 text-sm font-roboto text-red-500">{{ errors.email }}</p>
                  </div>

                  <!-- Optional checkboxes -->
                  <div class="mb-7">
                    <p class="text-sm font-condensed font-bold uppercase tracking-wider text-neutral-500 mb-4">
                      I'd like to be notified of events surrounding:
                    </p>
                    <div class="flex flex-col gap-4">

                      <!-- Follow-on Seminal Space -->
                      <label class="flex items-start gap-3 cursor-pointer group">
                        <input type="checkbox" v-model="form.seminalSpace" class="sr-only" />
                        <div :class="['w-5 h-5 rounded border-2 shrink-0 mt-0.5 transition flex items-center justify-center', form.seminalSpace ? 'bg-trim-teal border-trim-teal' : 'border-neutral-300 bg-white']">
                          <svg v-if="form.seminalSpace" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span class="text-base font-roboto font-normal text-neutral-600 group-hover:text-trim-teal transition leading-snug">
                          Follow-on Seminal Space
                        </span>
                      </label>

                      <!-- Holistic Systems Practice Course -->
                      <label class="flex items-start gap-3 cursor-pointer group">
                        <input type="checkbox" v-model="form.practiceCourse" class="sr-only" />
                        <div :class="['w-5 h-5 rounded border-2 shrink-0 mt-0.5 transition flex items-center justify-center', form.practiceCourse ? 'bg-trim-blue border-trim-blue' : 'border-neutral-300 bg-white']">
                          <svg v-if="form.practiceCourse" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span class="text-base font-roboto font-normal text-neutral-600 group-hover:text-trim-blue transition leading-snug">
                          Holistic Systems Practice Course
                        </span>
                      </label>

                      <!-- Holism & Ethics Book -->
                      <label class="flex items-start gap-3 cursor-pointer group">
                        <input type="checkbox" v-model="form.holismBook" class="sr-only" />
                        <div :class="['w-5 h-5 rounded border-2 shrink-0 mt-0.5 transition flex items-center justify-center', form.holismBook ? 'bg-trim-green border-trim-green' : 'border-neutral-300 bg-white']">
                          <svg v-if="form.holismBook" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span class="text-base font-roboto font-normal text-neutral-600 group-hover:text-trim-green transition leading-snug">
                          Holism &amp; Ethics Book by Claudius
                        </span>
                      </label>

                    </div>
                  </div>

                  <!-- Submit -->
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    :class="[
                      'w-full py-3 px-6 rounded-xl font-condensed font-bold uppercase tracking-wider text-lg transition cursor-pointer',
                      isSubmitted  ? 'bg-trim-green text-white'          :
                      errorState   ? 'bg-red-700 text-white'             :
                      isSubmitting ? 'bg-trim-purple/50 text-white/70 cursor-not-allowed' :
                                     'bg-trim-purple text-white hover:bg-trim-purple-dark',
                    ]"
                  >
                    {{ isSubmitted ? 'Registered!' : errorState ? 'Something went wrong' : isSubmitting ? 'Registering…' : 'Register Now' }}
                  </button>

                </form>
              </div>

              <!-- ── Right: Upcoming events ── -->
              <div class="lg:w-[380px] bg-bg-default px-6 md:px-10 pt-8 lg:pt-10 pb-10 flex flex-col gap-7">

                <div>
                  <p class="text-xs font-condensed font-bold uppercase tracking-[0.3em] text-neutral-400 mb-1">After the Festival</p>
                  <h3 class="text-2xl font-condensed font-bold uppercase tracking-wide text-neutral-700">
                    What's Coming Next
                  </h3>
                  <div class="h-0.5 w-12 rounded-full bg-trim-purple/40 mt-3"></div>
                </div>

                <!-- Seminal Space -->
                <div class="flex flex-col gap-1.5">
                  <div class="flex items-center gap-2 mb-0.5">
                    <div class="w-2.5 h-2.5 rounded-full bg-trim-teal shrink-0"></div>
                    <span class="text-sm font-condensed font-bold uppercase tracking-wider text-trim-teal">Seminal Space</span>
                  </div>
                  <p class="text-base font-roboto font-light text-neutral-600 leading-relaxed pl-[18px] border-l-2 border-trim-teal/30">
                    The Festival is followed by a Seminal Space — a dedicated session where we explore how to integrate what we've learned into our different life practices.
                  </p>
                </div>

                <!-- Holistic Systems Practice Course -->
                <div class="flex flex-col gap-1.5">
                  <div class="flex items-center gap-2 mb-0.5">
                    <div class="w-2.5 h-2.5 rounded-full bg-trim-blue shrink-0"></div>
                    <span class="text-sm font-condensed font-bold uppercase tracking-wider text-trim-blue">Holistic Systems Practice Course</span>
                  </div>
                  <p class="text-base font-roboto font-light text-neutral-600 leading-relaxed pl-[18px] border-l-2 border-trim-blue/30">
                    Launching thereafter: a 6-month part-time workshop exploring what builds coherence — and how to lead with it and foster it across life and work.
                  </p>
                </div>

                <!-- Holism & Ethics Book -->
                <div class="flex flex-col gap-1.5">
                  <div class="flex items-center gap-2 mb-0.5">
                    <div class="w-2.5 h-2.5 rounded-full bg-trim-green shrink-0"></div>
                    <span class="text-sm font-condensed font-bold uppercase tracking-wider text-trim-green">Holism &amp; Ethics</span>
                  </div>
                  <p class="text-base font-roboto font-light text-neutral-600 leading-relaxed pl-[18px] border-l-2 border-trim-green/30">
                    Claudius will soon release a manuscript version of his upcoming book <span class="italic">Holism and Ethics</span>. Register now to be among the first to read it.
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
defineEmits<{ close: [] }>()

const form = reactive({
  name: '',
  email: '',
  seminalSpace: false,
  practiceCourse: false,
  holismBook: false,
})

const touched = reactive({
  name: false,
  email: false,
})

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
        name: form.name.trim(),
        email: form.email.trim(),
        seminal_space: form.seminalSpace,
        practice_course: form.practiceCourse,
        holism_book: form.holismBook,
        source: 'holosearthacademy.org',
        happiness: generateHappiness(),
      }),
    })

    if (!res.ok) throw new Error(await res.text())

    isSubmitted.value = true
    setTimeout(() => { isSubmitted.value = false }, 4000)
  } catch (err) {
    console.error('Registration failed:', err)
    errorState.value = true
    setTimeout(() => { errorState.value = false }, 4000)
  } finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.seminalSpace = false
  form.practiceCourse = false
  form.holismBook = false
  touched.name = false
  touched.email = false
  isSubmitted.value = false
  errorState.value = false
}

// Scroll lock + reset on close
watch(() => props.open, (isOpen) => {
  if (typeof document === 'undefined') return
  const val = isOpen ? 'hidden' : ''
  document.documentElement.style.overflow = val
  document.body.style.overflow = val
  if (!isOpen) resetForm()
})
</script>
