import { computed, onMounted, ref } from 'vue'
import type { Phase } from './useAttendee'

/**
 * Per-phase "the visitor has added at least one session to their calendar"
 * progress flag. Phase 1 and Phase 2 are tracked independently so that
 * picking sessions in one phase never lights up the "Choose your sessions"
 * checkmark on the other.
 *
 * Storage: two booleans in localStorage. The pre-split single key
 * (`holos_calendar_added`) is migrated to P1 on first hydration — vast
 * majority of pre-split traffic was P1-only, so this is the safest
 * one-time interpretation.
 */

const STORAGE_KEY_P1 = 'holos_calendar_added_p1'
const STORAGE_KEY_P2 = 'holos_calendar_added_p2'
const LEGACY_KEY = 'holos_calendar_added'

const addedP1 = ref(false)
const addedP2 = ref(false)
let hydrated = false

function hydrate() {
  if (hydrated || typeof window === 'undefined') return
  hydrated = true
  // One-time migration of the old single-flag key. Assume P1 — see file header.
  const legacy = window.localStorage.getItem(LEGACY_KEY)
  if (legacy === 'true' && window.localStorage.getItem(STORAGE_KEY_P1) === null) {
    window.localStorage.setItem(STORAGE_KEY_P1, 'true')
  }
  if (legacy !== null) {
    window.localStorage.removeItem(LEGACY_KEY)
  }
  addedP1.value = window.localStorage.getItem(STORAGE_KEY_P1) === 'true'
  addedP2.value = window.localStorage.getItem(STORAGE_KEY_P2) === 'true'
}

/** Reset both phase flags. Exposed so "Not you?" can wipe in-flight progress. */
export function clearCalendarProgress() {
  addedP1.value = false
  addedP2.value = false
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(STORAGE_KEY_P1)
    window.localStorage.removeItem(STORAGE_KEY_P2)
    window.localStorage.removeItem(LEGACY_KEY)
  }
}

export function useCalendarProgress() {
  onMounted(hydrate)

  function markCalendarAdded(phase: Phase) {
    if (phase === 'P2') {
      addedP2.value = true
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY_P2, 'true')
      }
    } else {
      addedP1.value = true
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY_P1, 'true')
      }
    }
  }

  return {
    hasAddedCalendarP1: computed(() => addedP1.value),
    hasAddedCalendarP2: computed(() => addedP2.value),
    markCalendarAdded,
    clearCalendarProgress,
  }
}
