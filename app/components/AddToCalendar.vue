<template>
  <div class="inline-flex flex-wrap items-center gap-x-3 gap-y-1.5" ref="dropdownRef">
    <div class="relative inline-block">
      <button
        type="button"
        :disabled="!isRegisteredForPhase"
        @click="onMainButtonClick"
        :class="[
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-condensed font-bold uppercase tracking-wider transition',
          isRegisteredForPhase
            ? `${buttonClass} hover:opacity-80 cursor-pointer`
            : 'bg-white ring-1 ring-neutral-200 text-neutral-400 cursor-not-allowed shadow-sm',
        ]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Add to Calendar
        <!-- Enabled: dropdown chevron (rotates when open). Disabled: lock icon. -->
        <svg
          v-if="isRegisteredForPhase"
          xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 transition-transform"
          :class="{ 'rotate-180': open }"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 ml-0.5 text-neutral-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      </button>

      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="open && isRegisteredForPhase"
          class="absolute z-50 mt-2 left-0 w-52 bg-white rounded-lg shadow-lg ring-1 ring-black/5 py-1"
        >
          <a
            :href="googleUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 px-4 py-2.5 text-sm font-roboto text-neutral-700 hover:bg-bg-default transition cursor-pointer"
            @click="onPickCalendar($event, 'google')"
          >
            <span class="text-base">📅</span> Google Calendar
          </a>
          <a
            :href="outlookUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 px-4 py-2.5 text-sm font-roboto text-neutral-700 hover:bg-bg-default transition cursor-pointer"
            @click="onPickCalendar($event, 'outlook')"
          >
            <span class="text-base">📬</span> Outlook
          </a>
          <a
            :href="yahooUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 px-4 py-2.5 text-sm font-roboto text-neutral-700 hover:bg-bg-default transition cursor-pointer"
            @click="onPickCalendar($event, 'yahoo')"
          >
            <span class="text-base">📧</span> Yahoo Calendar
          </a>
          <button
            type="button"
            @click="onPickCalendar($event, 'ics')"
            class="flex items-center gap-3 px-4 py-2.5 text-sm font-roboto text-neutral-700 hover:bg-bg-default transition w-full text-left cursor-pointer"
          >
            <span class="text-base">⬇️</span> Download .ics
          </button>
        </div>
      </Transition>
    </div>

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
      <span class="italic">first</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
const { track } = useAnalytics()
const { markCalendarAdded } = useCalendarProgress()
const { attendee } = useAttendee()
const { openModal } = useRegistrationModal()

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
  /** Tailwind classes for the button */
  buttonClass?: string
  /**
   * Which festival phase this event belongs to (1 or 2). Optional override —
   * when omitted, derived from the current route (`/phase-2` → P2, else P1).
   */
  phase?: 1 | 2
}

const props = withDefaults(defineProps<Props>(), {
  location: 'Online (Zoom)',
  durationMinutes: 90,
  buttonClass: 'bg-trim-purple/10 text-trim-purple',
  // phase intentionally undefined by default — derived from route below.
})

type CalType = 'google' | 'outlook' | 'yahoo' | 'ics'

/**
 * The button + dropdown are only enabled when the visitor has registered
 * for this event's phase. If they haven't, the button is disabled and an
 * inline "Register first" hint is shown — see the template.
 *
 * The required phase comes from the `phase` prop if set, otherwise derived
 * from the route — `/phase-2` → P2, anything else → P1. This means
 * <AddToCalendar /> on the Phase 2 page correctly gates on P2 registration
 * without every call site needing to thread the phase through.
 */
const route = useRoute()
const requiredPhase = computed<'P1' | 'P2'>(() => {
  if (props.phase === 2) return 'P2'
  if (props.phase === 1) return 'P1'
  return route.path.startsWith('/phase-2') ? 'P2' : 'P1'
})
const isRegisteredForPhase = computed(() =>
  attendee.value?.phases.includes(requiredPhase.value) ?? false
)

function onMainButtonClick() {
  if (!isRegisteredForPhase.value) return // shouldn't fire — button is disabled
  open.value = !open.value
  if (open.value) {
    track('calendar_dropdown_opened', {
      event_title: props.title,
      speaker: props.speaker,
    })
  }
}

function openRegister() {
  track('registration_modal_open', { source: 'add_to_calendar_gate' })
  openModal()
}

/**
 * Called when a calendar option is picked. Only reachable when the visitor
 * IS registered for this event's phase (the dropdown won't open otherwise),
 * so we can record the signup and let the native action follow.
 */
function onPickCalendar(_e: MouseEvent, type: CalType) {
  open.value = false
  markCalendarAdded()
  track('calendar_option_selected', {
    calendar_type: type,
    event_title: props.title,
    speaker: props.speaker,
  })
  recordSignup(type)
  if (type === 'ics') downloadIcs()
  // For google/outlook/yahoo, the anchor's target="_blank" handles navigation.
}

async function recordSignup(type: CalType) {
  if (!attendee.value) return
  try {
    await fetch('https://576l7bs7a37yqrkc55h35jx4hu0wlftm.lambda-url.eu-west-1.on.aws/', {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'event_signup',
        attendee_id: attendee.value.id,
        calendar_type: type,
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
  } catch (err) {
    console.warn('event_signup failed (non-fatal):', err)
  }
}

const config = useRuntimeConfig().public

/** Calendar event title: "Talk Title — Speaker Name" */
const calendarTitle = computed(() => `${props.title} — ${props.speaker}`)

/** Build a rich description: talk details, day theme, festival reminder, Zoom link */
const fullDescription = computed(() => {
  const zoomUrl = config.zoomWebinarUrl
  const lines = [
    props.description,
    '',
    `Today's theme: ${props.theme}`,
    '',
    '---',
    'The Centenary Festival of Holism & Evolution is a free online global dialogue on the meaning and application of holism, presented by Holos Earth Academy.',
    'holosearthacademy.org',
  ]
  if (zoomUrl) {
    lines.push('', 'Join the session via Zoom:', zoomUrl, '', 'Please register before joining if you have not already.')
  }
  return lines.join('\n')
})

const open = ref(false)
const dropdownRef = ref<HTMLElement>()

function handleClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

/** IANA timezone for CET/CEST — calendar apps handle DST automatically */
const TIMEZONE = 'Europe/Berlin'

/**
 * Parse the time prop (e.g. '19h00 CET') into local hours & minutes.
 * We pass these as-is with the IANA timezone — no manual UTC conversion.
 */
function parseLocalTime() {
  const match = props.time.match(/(\d{1,2})h(\d{2})/)
  const hours = match ? parseInt(match[1], 10) : 19
  const minutes = match ? parseInt(match[2], 10) : 0

  const endTotalMinutes = hours * 60 + minutes + props.durationMinutes
  const endHours = Math.floor(endTotalMinutes / 60)
  const endMinutes = endTotalMinutes % 60

  return {
    startH: hours, startM: minutes,
    endH: endHours, endM: endMinutes,
  }
}

/** Format as 'YYYYMMDDTHHMMSS' (no Z — local time in the given timezone) */
function formatLocal(date: string, h: number, m: number): string {
  const d = date.replace(/-/g, '')
  const hh = String(h).padStart(2, '0')
  const mm = String(m).padStart(2, '0')
  return `${d}T${hh}${mm}00`
}

/**
 * Convert a Berlin-local time to a UTC Date object.
 * Uses the Intl API to determine the correct CET/CEST offset automatically.
 */
function berlinToUTC(date: string, h: number, m: number): Date {
  const [year, mon, day] = date.split('-').map(Number)
  // Start with a UTC guess equal to the local time values
  const guess = new Date(Date.UTC(year, mon - 1, day, h, m, 0))
  // Determine what Berlin-local time that UTC instant corresponds to
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(guess)
  const bH = parseInt(parts.find(p => p.type === 'hour')!.value)
  const bM = parseInt(parts.find(p => p.type === 'minute')!.value)
  // Offset in minutes (Berlin is ahead of UTC)
  let offsetMin = (bH * 60 + bM) - (h * 60 + m)
  if (offsetMin > 720) offsetMin -= 1440
  if (offsetMin < -720) offsetMin += 1440
  // Correct UTC = guess − offset
  return new Date(guess.getTime() - offsetMin * 60000)
}

const googleUrl = computed(() => {
  const { startH, startM, endH, endM } = parseLocalTime()
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: calendarTitle.value,
    dates: `${formatLocal(props.date, startH, startM)}/${formatLocal(props.date, endH, endM)}`,
    details: fullDescription.value,
    location: props.location,
    ctz: TIMEZONE,
  })
  return `https://calendar.google.com/calendar/render?${params}`
})

const outlookUrl = computed(() => {
  const { startH, startM, endH, endM } = parseLocalTime()
  const startUTC = berlinToUTC(props.date, startH, startM)
  const endUTC = berlinToUTC(props.date, endH, endM)
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: calendarTitle.value,
    startdt: startUTC.toISOString(),
    enddt: endUTC.toISOString(),
    body: fullDescription.value,
    location: props.location,
  })
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params}`
})

const yahooUrl = computed(() => {
  const { startH, startM, endH, endM } = parseLocalTime()
  const params = new URLSearchParams({
    v: '60',
    title: calendarTitle.value,
    st: formatLocal(props.date, startH, startM),
    et: formatLocal(props.date, endH, endM),
    desc: fullDescription.value,
    in_loc: props.location,
    tz: TIMEZONE,
  })
  return `https://calendar.yahoo.com/?${params}`
})

function generateIcs(): string {
  const { startH, startM, endH, endM } = parseLocalTime()
  const uid = `${props.date}-${props.time.replace(/\s/g, '')}-holosearthacademy`
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Holos Earth Academy//Event//EN',
    'BEGIN:VTIMEZONE',
    `TZID:${TIMEZONE}`,
    'BEGIN:DAYLIGHT',
    'DTSTART:19700329T020000',
    'RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3',
    'TZOFFSETFROM:+0100',
    'TZOFFSETTO:+0200',
    'TZNAME:CEST',
    'END:DAYLIGHT',
    'BEGIN:STANDARD',
    'DTSTART:19701025T030000',
    'RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10',
    'TZOFFSETFROM:+0200',
    'TZOFFSETTO:+0100',
    'TZNAME:CET',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTART;TZID=${TIMEZONE}:${formatLocal(props.date, startH, startM)}`,
    `DTEND;TZID=${TIMEZONE}:${formatLocal(props.date, endH, endM)}`,
    `SUMMARY:${calendarTitle.value}`,
    `DESCRIPTION:${fullDescription.value.replace(/\n/g, '\\n')}`,
    `LOCATION:${props.location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

function downloadIcs() {
  const blob = new Blob([generateIcs()], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${props.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.ics`
  a.click()
  URL.revokeObjectURL(url)
}
</script>
