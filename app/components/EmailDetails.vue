<template>
  <div class="inline-flex flex-wrap items-center gap-x-3 gap-y-1.5">
    <button
      type="button"
      :disabled="!isRegisteredForPhase || sending || sent"
      @click="onClick"
      :class="[
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-condensed font-bold uppercase tracking-wider transition',
        isRegisteredForPhase
          ? sent
            ? 'bg-emerald-100 text-emerald-700 cursor-default'
            : `${buttonClass} hover:opacity-80 cursor-pointer`
          : 'bg-white ring-1 ring-neutral-200 text-neutral-400 cursor-not-allowed shadow-sm',
      ]"
    >
      <!-- Envelope icon (or check when sent) -->
      <svg
        v-if="!sent"
        xmlns="http://www.w3.org/2000/svg" class="w-4 h-4"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg" class="w-4 h-4"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      <span>{{ sent ? 'Sent — check your inbox' : sending ? 'Sending…' : 'Email Details' }}</span>
      <!-- Lock icon when disabled because unregistered -->
      <svg
        v-if="!isRegisteredForPhase"
        xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 ml-0.5 text-neutral-400"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    </button>

    <!-- Gentle hint when the visitor hasn't registered for this event's phase -->
    <div
      v-if="!isRegisteredForPhase"
      class="inline-flex items-center gap-1.5 text-xs font-roboto text-neutral-400 leading-tight"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-neutral-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
      <button
        type="button"
        @click="openRegister"
        class="font-condensed font-bold uppercase tracking-wider text-trim-purple underline underline-offset-2 decoration-trim-purple/40 hover:decoration-trim-purple transition cursor-pointer"
      >Register</button>
      <span>first</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const { track } = useAnalytics()
const { markCalendarAdded } = useCalendarProgress()
const { attendee } = useAttendee()
const { openModal } = useRegistrationModal()
const config = useRuntimeConfig().public

interface Props {
  title: string
  speaker: string
  description: string
  theme: string
  /** ISO date string, e.g. '2026-05-20' */
  date: string
  /** Time string like '19h00 CEST' or '10h00 CEST' */
  time: string
  location?: string
  /** Duration in minutes (default 90) */
  durationMinutes?: number
  /** Tailwind classes for the button — should match the AddToCalendar sibling */
  buttonClass?: string
  /**
   * Which festival phase this event belongs to (1 or 2). Optional override —
   * when omitted, derived from the current route (`/phase-1` → P1, else P2).
   */
  phase?: 1 | 2
}

const props = withDefaults(defineProps<Props>(), {
  location: 'Online (Zoom)',
  durationMinutes: 90,
  buttonClass: 'bg-trim-purple/10 text-trim-purple',
})

const route = useRoute()
const requiredPhase = computed<'P1' | 'P2'>(() => {
  if (props.phase === 2) return 'P2'
  if (props.phase === 1) return 'P1'
  return route.path.startsWith('/phase-1') ? 'P1' : 'P2'
})
const isRegisteredForPhase = computed(() =>
  attendee.value?.phases.includes(requiredPhase.value) ?? false
)

const sending = ref(false)
const sent = ref(false)

function openRegister() {
  track('registration_modal_open', { source: 'email_details_gate' })
  openModal()
}

async function onClick() {
  if (!isRegisteredForPhase.value || sending.value || sent.value) return
  if (!attendee.value) return

  sending.value = true
  track('email_details_requested', {
    event_title: props.title,
    speaker: props.speaker,
  })

  try {
    await fetch('https://576l7bs7a37yqrkc55h35jx4hu0wlftm.lambda-url.eu-west-1.on.aws/', {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'event_signup',
        attendee_id: attendee.value.id,
        calendar_type: 'email',
        source: 'holosearthacademy.org',
        happiness: generateHappiness(),
        event: {
          title: props.title,
          speaker: props.speaker,
          description: props.description,
          theme: props.theme,
          date: props.date,
          time: props.time,
          zoom_url: (config as { zoomWebinarUrl?: string }).zoomWebinarUrl,
          location: props.location,
          duration_minutes: props.durationMinutes,
          phase: requiredPhase.value,
        },
      }),
    })
    markCalendarAdded(requiredPhase.value)
    sent.value = true
    // Reset back to the default button after a moment so users who want to
    // re-send (e.g. they lost the email) aren't blocked. The backend dedups
    // by (attendee, event) so no duplicate email is sent anyway.
    setTimeout(() => { sent.value = false }, 6000)
  } catch (err) {
    console.warn('email_details event_signup failed (non-fatal):', err)
  } finally {
    sending.value = false
  }
}
</script>
