import { ref } from 'vue'

// Phase 1 recordings and transcripts go live on 29 May 2026 (CEST/Europe-Berlin).
const RELEASE_DATE = '2026-05-29'

type Word = 'tomorrow' | 'later today' | 'now'

function computeWord(): Word {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Berlin' })
  if (today < RELEASE_DATE) return 'tomorrow'
  if (today === RELEASE_DATE) return 'later today'
  return 'now'
}

/**
 * Returns a date-aware word describing when the Phase 1 recordings/transcripts
 * become available, evaluated in Europe/Berlin (CEST).
 *
 * Evaluated at setup, so static prerender bakes in the build-time value; the
 * client re-evaluates on hydration and updates if the day has rolled over.
 */
export function useRecordingsAvailability() {
  return { availabilityWord: ref(computeWord()) }
}
